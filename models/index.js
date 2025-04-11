const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);

// Define relationships
db.books.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.books, {
  foreignKey: "bookId",
  as: "book",
});

db.users.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;