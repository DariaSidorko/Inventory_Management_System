
//const Products = require('../models/Product')

const getAllProducts = async (req, res) => {
    res.send("All Products")
  }

const getProduct = async (req, res) => {
    res.send("Product")
  }

  const createProduct = async (req, res) => {
    res.send("Product Created")
  }

  const updateProduct = async (req, res) => {
    res.send("Product Updated")
  }
  
  const deleteProduct = async (req, res) => {
    res.send("Product Deleted")
    }

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
}
