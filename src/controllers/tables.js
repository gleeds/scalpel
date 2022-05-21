// const { pool } = require('../database/target-db')
const { sdb } = require('../database/scalpel-db')

class TableController {

    static toJson(data) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a);
    }

    async getAllTables(req, res, next) {
        sdb.all('SELECT * FROM tables', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    }

    async getTable(req, res, next) {
        sdb.get('SELECT * FROM tables WHERE name = ?', [req.params.table], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: `Table not found` });
            }
            sdb.all('SELECT * FROM table_columns WHERE table_name = ?', [req.params.table], (err, column_rows) => {
                if (!err){
                    row.columns = column_rows;
                }
                else {
                    console.log(err);
                }
                sdb.all('SELECT * FROM relationships WHERE source_table = ?', [req.params.table], (err, relationship_rows) => {
                    if (!err){
                        row.relationships = relationship_rows;
                    }
                    else {
                        console.log(err);
                    }
                    res.json(row);
                });
            });       
        });
    }


    async getTableRelationships(req, res, next) {
        sdb.all('SELECT * FROM relationships WHERE source_table = ?', [req.params.table], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    }
}

const controller = new TableController();

module.exports = controller;