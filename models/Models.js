const sequelize = require('./Repository');

const User = require('./User')(sequelize);

sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

sequelize.sync();

module.exports = {User}