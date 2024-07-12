import express from "express";
import connection from "./src/db_connection";
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';




const app = express();

// Use cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.post('/register', (req, res) => {
    const { name, email, password, type } = req.body;
  
    // const query = 'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)';
    // const values = [name, email, password, type];
  
    // connection.query(query, values, (err, results) => {
    //   if (err) {
    //     console.error('Error inserting data:', err.stack);
    //     res.status(500).send('Error inserting data');
    //     return;
    //   }
    //   res.status(200).send('User registered successfully');
    // });

    console.log(name,email,password,type);
  });

app.listen(3000, () => {
    console.log("Server is running...")
})