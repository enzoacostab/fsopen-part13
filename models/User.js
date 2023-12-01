import { sequelize } from '../util/db.cjs'
import { DataTypes, Sequelize } from 'sequelize'
import Blog from './Blog.js'
import ReadingList from './ReadingList.js'

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
})

User.hasMany(Blog, {
  foreignKey: 'userId',
  sourceKey: 'id'
})
Blog.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
})

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readings' })

export default User
