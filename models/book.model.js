module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isbn: {
        type: Sequelize.STRING,
        unique: true
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      publication_date: {
        type: Sequelize.DATE
      }
    });
  
    return Book;
  };