const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Products fetched successfully'
  });
});

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(201).json({
    message: 'Products posted successfully',
    createdProduct: product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: 'Product with special ID already successfully fetched',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'Product ID specified'
    })
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product updated'
  })
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product deleted successfully'
  })
})
module.exports = router;