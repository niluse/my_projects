const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Initialize Sequelize with the existing database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
});

// Define the Product model
const Product = sequelize.define('products', 
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,  // Fiyatın ondalıklı kısmı da olabilir
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM,
      values: ["electronics", "jewelery", "men's clothing", "women's clothing"],
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

// Define the Rating model
const Rating = sequelize.define('ratings', {
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
});

// Define the relationship
Product.hasOne(Rating, {
  foreignKey: 'productId',
  onDelete: 'CASCADE'
});
Rating.belongsTo(Product, {
  foreignKey: 'productId'
});


async function importData() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Ensure the schema is updated

    // Read the JSON data file
    const dataPath = path.join(__dirname, 'productData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Insert data into the database
    for (const item of data) {
      await Product.create({
        photographer: item.photographer,
        src: item.src,
      });
    }

    console.log('Data imported successfully!');
    await sequelize.close();
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
