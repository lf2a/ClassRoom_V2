/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Room', {
		ID_Room: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: true
		}
	}, {
		tableName: 'Room'
	});
};
