/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Question', {
		ID_Questions: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		Question: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		ID_Task_FK: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Task',
				key: 'id_task'
			}
		}
	}, {
		tableName: 'Question'
	});
};
