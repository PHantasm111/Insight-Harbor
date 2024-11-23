import db from "../src/db_connection.js";
import bcrypt from "bcryptjs";

export const getUserStatisticData = async (req, res) => {
    try {
        const userId = req.params.id

        // Step 1: Check if user exists
        const userCheckQuery = "SELECT * FROM users WHERE UserID = ?;";
        const [userData] = await db.promise().query(userCheckQuery, [userId]);

        if (userData.length === 0) {
            return res.status(404).json("User not found !");
        }

        // Step 2 : Get the data back to front-end
        const query = 
        `
            with finished_valid_cte as (
                select count(*) as count_total
                from build
                where UserID = ?
                and Status in ('finished', 'valid')
            ),
            valid_cte as (
                select count(*) as count_valid
                from build
                where UserID = ?
                and Status = 'valid'
            )
            select
                f.count_total,
                v.count_valid
            from
                finished_valid_cte f,
                valid_cte v;  
        `

        const [results] = await db.promise().query(query, [userId, userId])

        if (results.length > 0) {
            const totalBuilds = results[0].count_total;
            const validBuilds = results[0].count_valid;
            return res.status(200).json({ totalBuilds, validBuilds });
        } else {
            return res.status(404).json({ message: "No saved data found" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Failed to fetch data", error });
    }
}

export const UpdateUserData = async (req, res) => {
    const userId = req.params.id;

    console.log(req.body);
    // Step 1: Check if user exists
    const userCheckQuery = "SELECT * FROM users WHERE UserID = ?;";
    const [userData] = await db.promise().query(userCheckQuery, [userId]);
    if (userData.length === 0) { return res.status(404).json("User not found !"); }

    // Step 2: Update user data
    const keys = Object.keys(req.body)[0];
    let values = Object.values(req.body)[0];

    console.log("pwd", values);

    if (keys === "Pwd_U") {
        const salt = bcrypt.genSaltSync(10);
        const hash_pwd = bcrypt.hashSync(values, salt);
        values = hash_pwd;
    }

    console.log(keys, values);

    const q = `UPDATE users SET ${keys} = ? WHERE UserID = ?`

    try {
        const result = await db.promise().query(q, [values, userId]);
        console.log(result);
        if (keys === "Pwd_U") {
            return res.status(200).json({ message: "success", [keys]: values });
        }
        return res.status(200).json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "Error updating record" });
    }
}
