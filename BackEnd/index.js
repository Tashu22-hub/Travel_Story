// Import necessary packages and modules
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose"); // MongoDB ODM (Object Data Modeling) library
const config = require("./config.json"); // Configuration file containing database connection string
const bcrypt = require("bcrypt"); // Library for hashing passwords
const express = require("express"); // Web framework for Node.js
const cors = require("cors"); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const jwt = require("jsonwebtoken"); // Library for creating and verifying JSON Web Tokens (JWT)

const upload = require("./multer"); // Import the multer instance
const fs = require("fs"); // File system module to interact with the file system
const path = require("path"); // Module to work with file paths

const User = require("./models/user.model"); // Import the User model
const TravelStory = require("./models/travelStory.model"); // Import the TravelStory model
const { authenticateToken } = require("./utilities"); // Import the authentication middleware

// Connect to the MongoDB database using the connection string from config.json
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize the Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors({ origin: "*" })); // Enable CORS for all origins

// Route to create a new user account
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body; // Extract user details from the request body

    // Validate that all required fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    // Check if a user with the same email already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash the password using bcrypt with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the provided details
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    // Generate a JWT access token for the new user
    const accessToken = jwt.sign(
      { userId: user._id }, // Payload containing the user's ID
      process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
      { expiresIn: "72h" } // Token expiration time
    );

    // Return a success response with the user details and access token
    return res.status(201).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Account created successfully",
    });
  } catch (err) {
    // Handle any errors that occur during account creation
    console.error("Error during account creation:", err.message);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "User does not exist" });
    }

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }

    // Generate a JWT access token for the authenticated user
    const accessToken = jwt.sign(
      { userId: user._id }, // Payload containing the user's ID
      process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
      { expiresIn: "72h" } // Token expiration time
    );

    // Return a success response with the user details and access token
    return res.status(200).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Login successful",
    });
  } catch (err) {
    // Handle any errors that occur during login
    console.error("Error during login:", err.message);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Route to get user details (requires authentication)
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user; // Extract userId from the authenticated user's token payload

  // Find the user by userId in the database
  const isUser = await User.findOne({ _id: userId });

  // If the user is not found, return a 401 Unauthorized status
  if (!isUser) {
    return res.sendStatus(401);
  }

  // Return the user details in the response
  return res.json({
    user: isUser,
    message: "",
  });
});

//add  Travel Story
app.post("/add-travel-story", authenticateToken, async (req, res) => {
  const { title,story,visitedLocations,ImageUrl,visitedDate } = req.body; // Extract user details from the request body

  const { userId } = req.user; // Extract userId from the authenticated user's token payload
  
  // Validate that all required fields are provided
  if (!title || !story || !visitedLocations || !ImageUrl || !visitedDate) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }
  //convert visitedDate from milliseconds to Date object
  const parsedVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocations,
      userId,
      ImageUrl,
      visitedDate: parsedVisitedDate,
    });
    await travelStory.save();
    res.status(201).json({ story: travelStory, message: "Travel story added successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message:error.message });
  }
  // Create a new travel story instance with the provided details
});

//Get all travel stories

app.get("/get-all-travel-stories", authenticateToken, async (req, res) => {
  const { userId } = req.user; // Extract userId from the authenticated user's token payload
  try {
    const travelStories = await TravelStory.find({ userId: userId }).sort({ isFavourite: -1 });
    res.status(200).json({ travelStories, message: "Travel stories fetched successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

//Router to handle image upload you must instral multer command in terminal

app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No file uploaded" });
    } 
    const image = req.file;
    const imageUrl = `http://localhost:3000/uploads/${image.filename}`;

    res.status(201).json({ imageUrl, message: "Image uploaded successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});



// Start the server and listen on the specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Express app for use in other modules (e.g., testing)
module.exports = app;