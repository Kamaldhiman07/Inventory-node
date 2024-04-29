const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
// const clientRoute = require("./router/client");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/Product");
const deviceRoute = require("./router/device");

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);
app.use("/api/device", deviceRoute);
// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// app.use("/api/client", clientRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", async (req, res) => {
  try {
    let registerUser = new User({
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      code: req.body.code,
      logo: req.body.logo,
      phone: req.body.phone,
      password: req.body.password
    });

    await registerUser.save();
    res.status(200).send('Signup Successfull');
  } catch (error) {
    console.log("Signup Error: ", error);
    res.status(500).send('Signup failed');
  }
});

// Get All Products
app.get("/api/getAll", async (req, res) => {
  try {
    const allUsers = await User.find({}).sort({ _id: -1 }); // Retrieve all users sorted by _id in descending order
    res.json(allUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Search User API
app.get("/api/searchUser", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const users = await User.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(users);
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).json({ error: "Failed to search for users" });
  }
});

// Testing Endpoint
app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
