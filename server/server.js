const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotev = require('dotenv');

dotev.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

app.get('/user', (req, res) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, results) => {
        if(err) return res.json(err);
        else return res.json(results);
    })
})

app.post('/login', (req, res) => {

    const {username, password} = req.body;

    const query = "SELECT * FROM user WHERE name = ? AND password = ?";
    db.query(query, [username.trim(), password.trim()], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
    
        if (results.length > 0) {
            return res.json({ success: true, message: "Login successful", user: results[0] });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    })
})

app.listen(8001, () => {
    console.log("Server is running on port 8001");
})