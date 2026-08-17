const fs = require("fs")
const getAllProducts = () => {
    const data = fs.readFileSync("data/data.json", "utf-8")
    const products = JSON.parse(data)
    return products
}
const getProductById = (id) => {
    const data = fs.readFileSync("data/data.json", "utf-8")
    const products = JSON.parse(data)
    return products.find(product => product.id === id)
}
const createProduct = (product) => {
    const products = getAllProducts()
    const newProduct = {
        id: products.length + 1,
        name: product.name,
        price: product.price,
        category: product.category
    }
    products.push(newProduct)
    fs.writeFileSync(
        "data/data.json",
        JSON.stringify(products, null, 2)
    )
    return newProduct
}
const updateProduct = (id, productData) => {
    const products = getAllProducts()
    const productIndex = products.findIndex(
        product => product.id === id
    )
    if (productIndex === -1) {
        return null
    }
    products[productIndex] = {
        id: id,
        name: productData.name,
        price: productData.price,
        category: productData.category
    }
    fs.writeFileSync(
        "data/data.json",
        JSON.stringify(products, null, 2)
    )
    return products[productIndex]
}
const deleteProduct = (id) => {
    const products = getAllProducts()
    const productIndex = products.findIndex(
        product => product.id === id
    )
    if (productIndex === -1) {
        return null
    }
    const deletedProduct = products.splice(productIndex, 1)
    fs.writeFileSync(
        "data/data.json",
        JSON.stringify(products, null, 2)
    )
    return deletedProduct[0]
}
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}