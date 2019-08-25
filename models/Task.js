/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Task', {
		ID_Task: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		ID_User_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'User',
				key: 'id_user'
			}
		},
		ID_Room_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Room',
				key: 'id_room'
			}
		}
	}, {
		tableName: 'Task'
	});
};
