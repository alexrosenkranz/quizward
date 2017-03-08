module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question',
  // columns
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    choice: {
      type: DataTypes.TEXT,
    },
    correct_answer: {
      type: DataTypes.STRING,
    },
    explanation: {
      type: DataTypes.TEXT,
    }
  },
  // options
  {
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Question.belongsTo(models.Quiz, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
          }
        });
      }
    }
  }) // end define
  return Question;
}