const {Sequelize} = require('sequelize');

module.exports = async function TestConnection(cb) {
    try {
        let seq = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
            define: {
                freezeTableName: true,
                schema: process.env.DATABASE_CONNECTION_SCHEMA
            }
        });
        await seq.authenticate();
        console.log('Connection has been established successfully.');
        cb(seq);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}