const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then((result) => {
      const response = {
        count: result.length,
        products: result
      }
      res.status(200).json({
        message: 'Products fetched successfully',
        response
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save()
    .then((result) => {
      const createdProduct = {
        name: result.name,
        price: result.price,
        _id: result._id
      }
      res.status(201).json({
        message: 'Products created successfully',
        createdProduct
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        error: error
      })
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price id')
    .exec()
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({
          message: 'Product with id ' + id + 'fetched successfully',
          result: result
        });
      } else {
        res.status(404).json({
          message: 'No valid data found for this product with id'
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, {
    $set: updateOps
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product deleted successfully',
        result
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: err });
    });
})
module.exports = router;