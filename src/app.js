const express = require('express');
const app = express();
const tableRoutes = require('./routers/tables');
const configRoutes = require('./routers/config');
const servicesRoutes = require('./routers/services');


app.use(express.json());

app.use('/tables',tableRoutes);
app.use('/config',configRoutes);
app.use('/services',servicesRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});