/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
		ID_User: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		IsProfessor: {
			type: DataTypes.STRING(2),
			allowNull: true
		},
		IsAdmin: {
			type: DataTypes.STRING(2),
			allowNull: true
		}
	}, {
		tableName: 'User'
	});
};