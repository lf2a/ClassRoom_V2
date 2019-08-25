/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Reminder', {
		ID_Reminder: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		ID_Room_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Room',
				key: 'id_room'
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
		tableName: 'Reminder'
	});
};
