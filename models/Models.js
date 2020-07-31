const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {define: {freezeTableName: true}});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const {User} = require('User')


try {
    await sequelize.sync({force: true});
    console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to syncronize models', error);
}

module.exports = {User, sequelize}