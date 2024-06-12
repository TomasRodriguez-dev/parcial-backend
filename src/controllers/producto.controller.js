const Producto = require('../models/producto.model');

const getProducto = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

const getProductoporId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findOne({ where: { id } });

        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

const createProducto = async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Producto.update(req.body, {
            where: { id }
        });

        if (updated) {
            const updatedProducto = await Producto.findOne({ where: { id } });
            res.status(200).json(updatedProducto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Producto.destroy({
            where: { id }
        });

        if (deleted) {
            res.status(204).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

module.exports = { getProducto,  getProductoporId, createProducto, updateProducto, deleteProducto };