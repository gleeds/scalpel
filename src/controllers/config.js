const { pool } = require('../database/target-db')
const { sdb } = require('../database/scalpel-db')

class ConfigController {
    async sync(req, res, next) {
        try {
            // Create Schema in Scalpel DB
            sdb.run('CREATE TABLE IF NOT EXISTS tables (name TEXT PRIMARY KEY,service_name TEXT)',async ()=>{
                sdb.run('CREATE TABLE IF NOT EXISTS table_columns (table_name TEXT, column_name TEXT, data_type TEXT)',async ()=>{
                    sdb.run('CREATE TABLE IF NOT EXISTS relationships (source_table TEXT, source_column TEXT, target_table TEXT, target_column TEXT)',async ()=>{
                        sdb.run('CREATE TABLE IF NOT EXISTS services (name TEXT PRIMARY KEY, color TEXT)',async ()=>{
                            const targetSchema = 'northwind';

                            // Get all tables from Target DB
                            const conn = await pool.getConnection();
                            try {
                                const result = await conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = ?", [targetSchema]);
                                for (var i=0; i< result.length; i++){
                                    const tableName = result[i].TABLE_NAME;
                                    console.log(`Adding table ${tableName} to Scalpel DB`);
                                    // Insert table into Scalpel DB
                                    sdb.run('INSERT INTO tables (name) VALUES (?)', [tableName]);
                                    // Get all columns from Target DB
                                    const table = await conn.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = ? AND table_name = ?", [targetSchema, tableName]);
                    
                                    // Insert columns into Scalpel DB
                                    for (var j=0; j< table.length; j++){
                                        const columnName = table[j].COLUMN_NAME;
                                        const dataType = table[j].DATA_TYPE;
                                        console.log(`Adding column ${columnName} to Scalpel DB`);
                                        sdb.run('INSERT INTO table_columns (table_name, column_name, data_type) VALUES (?, ?, ?)', [tableName, columnName, dataType]);
                                    }
                                    // Insert relationships into Scalpel DB
                                    const relationships = await conn.query("SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE table_schema = ? AND table_name = ? AND referenced_table_name IS NOT NULL", [targetSchema, tableName]);
                                    for (var k=0; k< relationships.length; k++){
                                        const sourceTable = tableName;
                                        const sourceColumn = relationships[k].COLUMN_NAME;
                                        const targetTable = relationships[k].REFERENCED_TABLE_NAME;
                                        const targetColumn = relationships[k].REFERENCED_COLUMN_NAME;
                                        console.log(`Adding relationship ${sourceTable}.${sourceColumn} -> ${targetTable}.${targetColumn} to Scalpel DB`);
                                        sdb.run('INSERT INTO relationships (source_table, source_column, target_table, target_column) VALUES (?, ?, ?, ?)', [sourceTable, sourceColumn, targetTable, targetColumn]);
                                    }
                                }
                            } catch(err) {
                                console.log(err);
                            } finally {
                                conn.end();
                            }
                            res.json({status:'done'})
                        });
                    });
                });
            });
        } catch(err) {
        console.log(err);
        }
    }

    async ready(req, res, next) {
        res.json({ ready: true });
    }
}

const controller = new ConfigController();
module.exports = controller;