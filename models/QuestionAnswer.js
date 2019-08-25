/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('QuestionAnswer', {
		ID_QuestionAnswer: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		Answer: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		ID_Questions_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Question',
				key: 'id_questions'
			}
		},
		ID_User_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'User',
				key: 'id_user'
			}
		}
	}, {
		tableName: 'QuestionAnswer'
	});
};
