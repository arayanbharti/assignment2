const { readData, writeData } = require("../models/productModel");

// Get all resources
exports.getAllProducts = (req, res) => {
  try {
    const data = readData();
    res.json(data.Products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get resource by ID
exports.getProductById = (req, res) => {
  try {
    const data = readData();
    const product = data.Products.find((p) => p.id == req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new resource
exports.createProduct = (req, res) => {
  try {
    const data = readData();
    const newProduct = req.body;
    newProduct.id = data.Products.length + 1; // Auto-increment ID
    data.Products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a resource
exports.updateProduct = (req, res) => {
  try {
    const data = readData();
    const index = data.Products.findIndex((p) => p.id == req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Product not found" });
    data.Products[index] = { ...data.Products[index], ...req.body };
    writeData(data);
    res.json(data.Products[index]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a resource
exports.deleteProduct = (req, res) => {
  try {
    const data = readData();
    const index = data.Products.findIndex((p) => p.id == req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Product not found" });
    data.Products.splice(index, 1);
    writeData(data);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
