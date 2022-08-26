import sequelizeAuto from 'sequelize-auto'
import database from './config/database'
import dovenv from 'dovenv'

dovenv.config()
const auto = new sequelizeAuto(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
    lang: 'esm',
    host: process.env.HOST,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    caseModel: 'c',
    caseFile: 'c',
    singularize: true,
    additional: {
        timestamps: false
    },
    tables: ['quiz', 'quiz_incorrectanswer'],

});
auto.run();