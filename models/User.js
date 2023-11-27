import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'
import Blog from './Blog.js'

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

export default User
