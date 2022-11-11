const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'the_furniture',
    'postgres',
    'root',
    {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432
    }
)