require('dotenv').config();//importing the dotenv package

const mongoose = require('mongoose');//importing the mongoose package
const config = require('./config.json');//importing the config.json file
const bcrypt = require('bcrypt');//importing the bcrypt package
const express = require('express');//importing the express package
const cors = require('cors');//importing the cors package

const jwt = require('jsonwebtoken');//importing the jsonwebtoken package

const User = require('./models/user.model');//importing the user model from the models folder

mangoose.connect(config.connectionString); //connect to databass config.json file is used to store the connection string



const app = express();
app.use(express.json()); 
app.use(cors());
app.use(cors({origin: 'w'}));

//Test api
/*
app.get('/hello', async (req, res) => {
    return res.status(200).json({ message: "Hello" });
});
*/

//create account 
app.get('/create-account', async (req, res) => {
   const { fullName, email, password } = req.body;

   if (!fullName || !email || !password) {
       return res.status(400)//bad request
       .json({error: true, message: "All fields are required" });
   }    
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400)
        .json({ error: true, message: "User already exists" });
    }
});//end of create account


app.listen(8000);
module.exports = app;