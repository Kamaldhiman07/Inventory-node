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
<<<<<<< HEAD
const deviceRoute = require("./router/device");
const makeRoute = require("./router/make");
// const recoveredmaterialRoute = require("./router/recoveredmaterial");
=======

>>>>>>> 8ae17877cc96bb9bff9acc15d1993ae8ed174fce

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);
app.use("/api/make", makeRoute);
// app.use("/api/recoveredmaterial", recoveredmaterialRoute);

// app.use("/api/client", clientRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
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
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    code: req.body.code,
    logo: req.body.logo,
    phone: req.body.phone,
    password: req.body.password
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send('test');
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request send: ", req.body);
});

// Get All Products
app.post("/api/getAll", async (req, res) => {
  try {
    // console.log('yes');
    const allUsers = await User.find({}).sort({ _id: -1 }); // Retrieve all users sorted by _id in descending order
    res.json(allUsers);
  } catch (error) {
    // Handle any errors that might occur during the database operation
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.get("/api/searchUser", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const users = await User.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(users);
  } catch (error) {
<<<<<<< HEAD
    console.error("Error searching for users:", error);
    res.status(500).json({ error: "Failed to search for users" });
  }
});

app.post("/api/updateUser/", (req, res) => {
  const userId = req.body.userId; // Correctly obtain the user ID from the request body
  console.log(userId);
  // Update the existing user with the provided user ID
  User.findByIdAndUpdate(userId, {
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    code: req.body.code,
    logo: req.body.logo,
    phone: req.body.phone,
    password: req.body.password
  })
  .then(() => {
    res.status(200).send('test');
    console.log("Update Successful");
  })
  .catch((err) => {
    console.log("Update Error: ", err);
    res.status(500).send("Error updating user");
  });
});

app.delete("/api/deleteClient/:id", async (req, res) => { // Change to app.delete
  console.log(req.params.id);
  try {
    const deleteClient = await User.deleteOne({ _id: req.params.id });
    // Assuming the User model is used here. Replace User with the appropriate model name if different.
    // Additional deletion operations for related data can be added here if needed.
    res.json({ deleteClient });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Error deleting client" });
  }
});

// Testing Endpoint
=======
    // Handle any errors that might occur during the database operation
    console.error("Error searching for products:", error);
    res.status(500).json({ error: "Failed to search for products" });
  }
});



>>>>>>> 8ae17877cc96bb9bff9acc15d1993ae8ed174fce
app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result)

})

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});