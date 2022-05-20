const sqlite3 = require('sqlite3').verbose();
const sdb = new sqlite3.Database('./scalpel.db');


module.exports = { sdb }
