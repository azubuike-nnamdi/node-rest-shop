const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
//req: request
//res: response
//next: moving the response to the next request
// app.use((req, res, next) => {
// res.status(200).json({
//   message: "First request successful",
// })
// })

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

module.exports = app;