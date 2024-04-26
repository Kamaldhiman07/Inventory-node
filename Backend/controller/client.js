const User = require("../models/Users");

// Get All Products
const getAllUser = async (req, res) => {
  const findAllUsers = await User.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllUsers);
};

// // Delete Selected Product
// const deleteSelectedProduct = async (req, res) => {
//   const deleteProduct = await User.deleteOne(
//     { _id: req.params.id }
//   );
//   const deletePurchaseProduct = await Purchase.deleteOne(
//     { ProductID: req.params.id }
//   );

//   const deleteSaleProduct = await Sales.deleteOne(
//     { ProductID: req.params.id }
//   );
//   res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
// };

// // Update Selected Product
// const updateSelectedProduct = async (req, res) => {
//   try {
//     const updatedResult = await User.findByIdAndUpdate(
//       { _id: req.body.productID },
//       {
//         name: req.body.name,
//         manufacturer: req.body.manufacturer,
//         description: req.body.description,
//       },
//       { new: true }
//     );
//     console.log(updatedResult);
//     res.json(updatedResult);
//   } catch (error) {
//     console.log(error);
//     res.status(402).send("Error");
//   }
// };

// // Search Products
// const searchProduct = async (req, res) => {
//   const searchTerm = req.query.searchTerm;
//   const products = await Product.find({
//     name: { $regex: searchTerm, $options: "i" },
//   });
//   res.json(products);
// };

module.exports = {
  getAllUser,
  // deleteSelectedProduct,
  // updateSelectedProduct,
  // searchProduct,
};
