const express = require('express');
const { getProducto, createProducto, updateProducto, deleteProducto } = require('../controllers/producto.controller');
const router = express.Router();

router.get('/', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;