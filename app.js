const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

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

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // extract json from body

//Routes which should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

//Handle request that gets here or routes that don't exist
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = (404)
  next(error);
})

//handles general error in the application
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;