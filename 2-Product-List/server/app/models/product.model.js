"use strict"

const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('sqlite:./productdb.sqlite3')

const Product = sequelize.define('products', {
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    price: {
        type: DataTypes.FLOAT,  
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

// Rating modeli
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

// İlişki tanımlaması
Product.hasOne(Rating, {
    foreignKey: 'productId',
    onDelete: 'CASCADE'
});
Rating.belongsTo(Product, {
    foreignKey: 'productId'
});

// Syncronization:
// Model bilgilerini db'ye uygula:
// sequelize.sync() // CREATE TABLE
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP


sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB NOT Connected *'));

// sequelize.sync({ force: true })  // force: true, varolan tabloları silip yeniden oluşturur
//     .then(() => console.log('*DB Synced'))
//     .catch(() => console.log('*DB Sync Error'));

module.exports = { Product, Rating };