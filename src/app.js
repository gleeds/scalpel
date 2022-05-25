const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const tableRoutes = require('./routers/tables');
const configRoutes = require('./routers/config');
const servicesRoutes = require('./routers/services');


app.use(express.json());

app.use('/tables',tableRoutes);
app.use('/config',configRoutes);
app.use('/services',servicesRoutes);


app.use('/',proxy('http://scalpel-ui:3001'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});