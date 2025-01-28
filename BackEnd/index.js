require("dotenv").config(); // Importing the dotenv package

const mongoose = require("mongoose"); // Importing the mongoose package
const config = require("./config.json"); // Importing the config.json file
const bcrypt = require("bcrypt"); // Importing the bcrypt package
const express = require("express"); // Importing the express package
const cors = require("cors"); // Importing the cors package
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken package

const User = require("./models/user.model"); // Importing the user model from the models folder

// Connect to the database using the connection string from config.json
mongoose.connect(config.connectionString);

// Create an Express app
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(cors({origin: "w"})); // Enable CORS for all origins

//Test api
/*
app.get('/hello', async (req, res) => {
    return res.status(200).json({ message: "Hello" });
});
*/

// Create Account Route
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res
        .status(400) // Bad Request
        .json({ error: true, message: "All fields are required" });
    }

    // Check if the user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a JWT access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    // Respond with success
    return res.status(200).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error("Error during account creation:", err.message);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
  

module.exports = app;
