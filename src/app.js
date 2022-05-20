const app = require('express')();
const tableRoutes = require('./routers/tables');
const configRoutes = require('./routers/config');




app.use('/tables',tableRoutes);
app.use('/config',configRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});