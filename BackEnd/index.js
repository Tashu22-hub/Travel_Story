const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); 
app.use(cors());
app.use(cors({origin: 'w'}));

//Test api

app.post('/hello', async (req, res) => {
    return res.json({ message: "Hello" });
});