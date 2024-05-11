const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched successfully'
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Orders created successfully'
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