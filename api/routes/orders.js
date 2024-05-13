const express = require('express');
const router = express.Router();

//Handle order get request
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched successfully'
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: 'Orders created successfully',
    order: order
  })
})

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Orders details retrieved successfully',
    orderId: req.params.orderId
  })
})
router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Orders deleted successfully',
    orderId: req.params.orderId
  })
})

module.exports = router