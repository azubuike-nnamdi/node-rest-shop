const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')
//Handle order get request
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched successfully'
  })
})

router.post('/', (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  })
  order.save()
    .exec()
    .then((result) => {
      res.status(201).json({
        message: 'Orders created successfully',
        order: result
      })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: error.message
      })
    });
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