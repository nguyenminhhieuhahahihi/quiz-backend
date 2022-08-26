import {Sequelize} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

export default new Sequelize (process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
    host: process.env.HOST,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    port: 5432,

    });