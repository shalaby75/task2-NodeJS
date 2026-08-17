const {
    getAllProducts,
    getProductById: findProductById,
    createProduct: createProductInModel,
    updateProduct: updateProductInModel,
    deleteProduct: deleteProductInModel
} = require("../models/productModel")
const getProducts = (req, res) => {
    const products = getAllProducts()
    res.json(products)
}
const getProductById = (req, res) => {
    const id = Number(req.params.id)
    const product = findProductById(id)
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    res.json(product)
}
const createProduct = (req, res) => {
    const newProduct = createProductInModel(req.body)
    res.status(201).json(newProduct)
}
const updateProduct = (req, res) => {
    const id = Number(req.params.id)
    const updatedProduct = updateProductInModel(id, req.body)
    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    res.json(updatedProduct)
}
const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = deleteProductInModel(id)
    if (!deletedProduct) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    res.json({
        message: "Product deleted successfully",
        product: deletedProduct
    })
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}