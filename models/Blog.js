import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

export const Blog = sequelize.define('blogs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  }
}, {
  timestamps: false
})
