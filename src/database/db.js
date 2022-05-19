const mariadb = require('mariadb');

const config = {
     host: 'demo-mysql', 
     user:'root', 
     password: 'T3stuser',
     database: 'northwind',
     connectionLimit: 5
};

const pool = mariadb.createPool(config);

module.exports = {
  pool
}