const {Sequelize} = require('sequelize');

 const sequelize = async function TestConnection(cb) {
    try {
        let seq = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {define: {freezeTableName: true}});
        await seq.authenticate();
        console.log('Connection has been established successfully.');
        cb(seq);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

module.exports = {sequelize}