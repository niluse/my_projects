const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Initialize Sequelize with the existing database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
});

// Define the Gallery model
const Gallery = sequelize.define('galleries', {
  photographer: {
    type: DataTypes.STRING
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

async function importData() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Ensure the schema is updated

    // Read the JSON data file
    const dataPath = path.join(__dirname, 'galleryData.JSON');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Insert data into the database
    for (const item of data) {
      await Gallery.create({
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
