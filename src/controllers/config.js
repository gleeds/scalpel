const { pool } = require('../database/target-db')
const { sdb } = require('../database/scalpel-db')

class ConfigController {
    async sync(req, res, next) {
        // Create Schema in Scalpel DB
        sdb.run('CREATE TABLE IF NOT EXISTS tables (name TEXT PRIMARY KEY)');
        sdb.run('CREATE TABLE IF NOT EXISTS relationships (source_table TEXT, source_column TEXT, target_table TEXT, target_column TEXT, PRIMARY KEY (source_table, source_column, target_table, target_column))');
        sdb.run('CREATE TABLE IF NOT EXISTS columns (table_name TEXT, column_name TEXT, data_type TEXT, PRIMARY KEY (table_name, column_name))');
        sdb.run('CREATE TABLE IF NOT EXISTS services (name TEXT PRIMARY KEY, color TEXT)');

        const targetSchema = 'northwind';

        // Get all tables from Target DB
        const conn = await pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = ?", [targetSchema]);
            for (var i=0; i< result.length; i++){
                const tableName = result[i].TABLE_NAME;
                console.log(`Adding table ${tableName} to Scalpel DB`);
                const table = await conn.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = ? AND table_name = ?", [targetSchema, tableName]);
                // Insert table into Scalpel DB
                sdb.run('INSERT INTO tables (name) VALUES (?)', [tableName]);
                // Insert columns into Scalpel DB
                for (var j=0; j< table.length; j++){
                    const columnName = table[j].COLUMN_NAME;
                    const dataType = table[j].DATA_TYPE;
                    console.log(`Adding column ${columnName} to Scalpel DB`);
                    sdb.run('INSERT INTO columns (table_name, column_name, data_type) VALUES (?, ?, ?)', [tableName, columnName, dataType]);
                }
            }
        } catch(err) {
            console.log(err);
        } finally {
            conn.end();
        }
        res.json({status:'done'})
    }

    async ready(req, res, next) {
        res.json({ ready: true });
    }
}

const controller = new ConfigController();
module.exports = controller;