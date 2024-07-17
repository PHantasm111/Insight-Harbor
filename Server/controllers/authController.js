import db from "../src/db_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // Check existing user

    const q = "SELECT * FROM users WHERE email_U = ? OR name_U = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {

        // If Error, return message error
        if (err) return res.json(err);
        // Else -> User existed
        if (data.length) return res.status(400).json("User already exists !");

        // New user -> first need to crypt pwd
        // Hash the pwd
        const salt = bcrypt.genSaltSync(10);
        const hash_pwd = bcrypt.hashSync(req.body.password, salt);

        // Get the date
        const registrationTime = new Date();

        // Insert New User to db
        const q = "INSERT INTO users(`email_U`, `name_U`, `Pwd_U`, `identity_U`, `Registration_time`) VALUES (?)"
        const values = [
            req.body.email,
            req.body.username,
            hash_pwd,
            req.body.identity,
            registrationTime
        ]

        // Excute query
        db.query(q, [values], (err, data) => {
            // If Error, return message error
            if (err) return res.json(err);
            // Else 
            return res.status(200).json("User has been created !")

        })
    })

}

export const login = (req, res) => {

    // Check user
    const q = "SELECT * FROM users WHERE email_U = ?";

    db.query(q, [req.body.email], (err, data) => {
        // error
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //console.log("User found:", data[0]);

        // normal -> check pwd
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].Pwd_U);

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password");


        const token = jwt.sign({ id: data[0].id }, "jwtkeys");
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);

        //console.log("Cookie sent:", token);


    });

};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.")
}
