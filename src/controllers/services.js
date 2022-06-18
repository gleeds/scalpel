const { sdb } = require('../database/scalpel-db')

class ServicesController {
    async getAllServices(req, res, next) {
        sdb.all('SELECT * FROM services', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    }

    async getServiceById(req, res, next) {
        sdb.get('SELECT * FROM services WHERE name = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: `Service not found` });
            }
            sdb.all('SELECT * FROM tables WHERE service_name = ?', [req.params.id], (err, table_rows) => {
                if (!err){
                    row.tables = table_rows;
                }
                else {
                    console.log(err);
                }
                res.json(row);
            });
        });
    }

    async createService(req, res, next) {
        sdb.run('INSERT INTO services (name, color) VALUES (?,?)',
            [req.body.name, req.body.color],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ name: req.body.name, color: req.body.color });
            });
    }

    async deleteService(req, res, next) {
        sdb.run('DELETE FROM services WHERE name = ?', [req.params.id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success:true });
        });
    }

    async getServiceBoundaries(req, res, next) {
        sdb.all('SELECT r.* FROM relationships r INNER JOIN tables st ON r.source_table = st.name INNER JOIN tables tt ON r.target_table = tt.name WHERE st.service_name = ? and tt <> ?',
        [req.params.id,req.prams.id],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    }
}

const controller = new ServicesController();
module.exports = controller;