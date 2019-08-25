/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Attachment', {
		ID_Attachment: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		link: {
			type: DataTypes.STRING(300),
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
		}
	}, {
		tableName: 'Attachment'
	});
};