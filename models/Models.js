module.exports = require('./Repository')(async function(sequelize){

    const User = require('./User')(sequelize);

    await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await sequelize.sync();

    return {User}
});






