/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment', {
		ID_Comment: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		content: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		ID_Post_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Post',
				key: 'id_post'
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
		tableName: 'Comment'
	});
};
