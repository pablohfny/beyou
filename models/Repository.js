const {Sequelize} = require('sequelize');

try {
    let sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
        define: {
            freezeTableName: true,
            schema: process.env.DATABASE_CONNECTION_SCHEMA
        }
    });

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });

    module.exports = sequelize;

} catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
}
