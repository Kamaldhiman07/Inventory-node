const Product = require("../models/Product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

// Add Post
const addProduct = async (req, res) => {
  console.log("req: ", req.body);
 
  // Extract image URL or URLs from the request body
  const image = req.body.image;
  const images = req.body.images || [];

  const newProduct = new Product({
    userID: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    client: req.body.client,
    collected_by: req.body.collected_by,
    image: image, // Assign the single image URL to the 'image' field
    images: images, // Assign the array of image URLs to the 'images' field
    stock: 0,
    description: req.body.description,
  });

  try {
    // Save the new product to the database
    const result = await newProduct.save();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(402).json({ error: 'Error adding product' });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { ProductID: req.params.id }
  );

  const deleteSaleProduct = await Sales.deleteOne(
    { ProductID: req.params.id }
  );
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  console.log(req.body+"     sdsadsadsasad");
  try {

    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        client: req.body.client,
        image:req.body.image,
        images:req.body.images,
        collected_by: req.body.collected_by,
      },
      { new: true }
    );
    //console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
