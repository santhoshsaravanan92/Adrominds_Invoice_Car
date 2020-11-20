require("dotenv").config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE
                                , "root"
                                , process.env.PASSWORD, {
                            host: process.env.HOST,
                            dialect: 'mysql',
                            define: {
                                    freezeTableName: true,
                                    timestamps: false
                                }
                        });

// to access this object across
exports.sequelize = sequelize;

exports.connection = () => {
    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error(`Unable to connect to the database:  ${err}`);
    });
}
