module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      }
    });
  
    return Review;
  };