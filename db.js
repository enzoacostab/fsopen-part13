import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST
})
