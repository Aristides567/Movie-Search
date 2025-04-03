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
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
})

app.get('/user', (req, res) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, results) => {
        if(err) return res.json(err);
        else return res.json(results);
    })
})

app.listen(8001, () => {
    console.log("Server is running on port 8001");
})