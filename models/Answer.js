/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Answer', {
		ID_Answer: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		content: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		ID_Comment_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Comment',
				key: 'id_comment'
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
		tableName: 'Answer'
	});
};