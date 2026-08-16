const express = require("express");
const fs = require("fs")
const app = express()
app.use(express.json())
const PORT = 3000
app.get("/products", (req, res) => {
    const data = fs.readFileSync("data.json", "utf-8");
    const products = JSON.parse(data);
    res.json(products);
})
app.get("/products/:id", (req, res) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const products = JSON.parse(data)
    const id = Number(req.params.id)
    const product = products.find(product => product.id === id)
    if (!product) {
    return res.status(404).json({
        message: "Product not found"
    })
}
res.json(product)
})
app.post("/products", (req, res) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const products = JSON.parse(data)
    const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
}
products.push(newProduct)
fs.writeFileSync("data.json", JSON.stringify(products, null, 2))
res.status(201).json(newProduct)
})
app.put("/products/:id", (req, res) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const products = JSON.parse(data)
    const id = Number(req.params.id)
    const productIndex = products.findIndex(product => product.id === id)
    if (productIndex === -1) {
    return res.status(404).json({
        message: "Product not found"
    });
}
products[productIndex] = {
    id: id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
}
fs.writeFileSync("data.json", JSON.stringify(products, null, 2))
res.json(products[productIndex])
})
app.delete("/products/:id", (req, res) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const products = JSON.parse(data)
    const id = Number(req.params.id)
    const productIndex = products.findIndex(
        product => product.id === id
    )
    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    const deletedProduct = products.splice(productIndex, 1)
    fs.writeFileSync(
        "data.json",
        JSON.stringify(products, null, 2)
    )
    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    })
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})