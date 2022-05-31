const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const tableRoutes = require('./routers/tables');
const configRoutes = require('./routers/config');
const servicesRoutes = require('./routers/services');


app.use(express.json());

app.use('/tables',tableRoutes);
app.use('/config',configRoutes);
app.use('/services',servicesRoutes);


app.use('/',createProxyMiddleware({target:'http://scalpel-ui:3001',changeOrigin:true}));
app.use('/ws',createProxyMiddleware({target:'http://scalpel-ui:3001/ws',changeOrigin:true,ws:true}));


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});