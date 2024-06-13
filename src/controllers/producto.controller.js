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

const getProductosOrdenados = async (req, res) => {
    try {
        const { orden } = req.query; 
        const criteriosOrdenacion = ['nombre', 'precio', 'cantidad'];

        if (!criteriosOrdenacion.includes(orden)) {
            return res.status(400).json({ error: 'Ordenacion no válida' });
        }

        const productos = await Producto.findAll();
        
        productos.sort((a, b) => {
            if (a[orden] < b[orden]) return -1;
            if (a[orden] > b[orden]) return 1;
            return 0;
        });
        
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos ordenados' });
    }
};

const getProductosFiltrados = async (req, res) => {
    try {
        const { precio, categoria } = req.query;
        const productos = await Producto.findAll();
        
        const productosFiltrados = productos.filter(producto => {
            let cumple = true;
            if (precio) {
                cumple = cumple && producto.precio > parseFloat(precio);
            }
            if (categoria) {
                cumple = cumple && producto.categoria === categoria;
            }
            return cumple;
        });
        
        res.json(productosFiltrados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos filtrados' });
    }
};

module.exports = { getProducto, getProductoporId, createProducto, updateProducto, deleteProducto, getProductosOrdenados, getProductosFiltrados };