import db from "../src/db_connection.js";

export const getQuestion = (req, res) => {

    const currentQuestionId = parseInt(req.params.id, 10) // Decimal numbers
    // console.log("current id :" + currentQuestionId)

    const query = `select id, content, type, choices, is_required, help_text
                   from questions_table
                   where id = ?`

    db.query(query, [currentQuestionId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: 'Database query failed' });
            return;
        }

        if (results.length > 0) {
            //console.log(results[0])
            res.json(results[0]);

        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });






}