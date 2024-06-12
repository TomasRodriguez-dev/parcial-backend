const express = require('express');
const { getProducto, getProductoporId, createProducto, updateProducto, deleteProducto } = require('../controllers/producto.controller');
const router = express.Router();

router.get('/', getProducto);
router.get('/:id', getProductoporId);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;