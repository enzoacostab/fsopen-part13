const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
    await queryInterface.addColumn('reading_lists', 'userId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    })
    await queryInterface.addColumn('reading_lists', 'blogId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_lists')
  }
}
