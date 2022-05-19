const { pool } = require('../database/db')

class TableController {

    static toJson(data) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a);
    }

    async getAllTables(req, res, next) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query('SHOW TABLES');
            res.json(result);
        } finally {
            conn.end();
        }
    }

    async getTable(req, res, next) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = 'northwind' AND table_name = ?", [req.params.table]);
            res.send(TableController.toJson(result));
        } finally {
            conn.end();
        }
    }

    async getTableRelationships(req, res, next) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE table_schema = 'northwind' AND table_name = ?", [req.params.table]);
            res.send(TableController.toJson(result));
        } finally {
            conn.end();
        }
    }
}

const controller = new TableController();

module.exports = controller;