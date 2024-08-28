import db from "../src/db_connection.js";

function getNextQuestionId(currentQuestionId, selections) {

    const lastQuesionAnswer = Object.values(selections)[0]
    //console.log(Object.values(lastQuesionAnswer))

    if (currentQuestionId < 10) { // optimise speed 
        if (currentQuestionId === 1) {
            switch (lastQuesionAnswer) {
                case 'On-premises':
                    return 2
                case 'On cloud':
                    return 30
            }
        }

        if (currentQuestionId === 2) {
            if (lastQuesionAnswer === "Not familiar with any of the above ecosystems") {
                return 3
            }

            return 4
        }

        if (currentQuestionId === 3) {
            return 4
        }

        if (currentQuestionId === 4) {
            if (lastQuesionAnswer === "No" || lastQuesionAnswer === "A little bit (medium budget)") {
                return 5
            } else if (lastQuesionAnswer === "Yes") {
                return 31
            }
        }

        if (currentQuestionId === 5) {
            if (lastQuesionAnswer === "Batch") {
                return 6
            } else if (lastQuesionAnswer === "Streaming") {
                return 16
            } else if (lastQuesionAnswer === "Streaming") {
                return 6
            }
        }





    } else if ((currentQuestionId > 10) && (currentQuestionId < 20)) {

        if (currentQuestionId === 16) {
            if (lastQuesionAnswer === "Offline analysis") {
                return 6
            } else if (lastQuesionAnswer === "Real-time analysis") {
                return 6
            }
        }


    } else {

    }

}


export const getQuestion = (req, res) => {

    // Get the questionId from URL
    //console.log(req.body)

    const currentQuestionId = parseInt(req.params.id, 10) // Decimal numbers
    //console.log("currentQuestionId : " + currentQuestionId)

    const nextQuestionId = getNextQuestionId(currentQuestionId, req.body.selections)

    //console.log("nextQuestionId : " + nextQuestionId)

    const query = `select id, content, type, choices, is_required, help_text
                   from questions_table
                   where id = ?`

    db.query(query, [nextQuestionId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: 'Database query failed' });
            return;
        }

        if (results.length > 0) {
            // Create a variable to store the questionData
            const questionData = results[0];

            //console.log(questionData)
            // {
            //     id: 2,
            //     content: 'Are you familiar with or have you used any of the following ecosystems or tools ? (Select all that apply)',
            //     type: 'multiple_choice',
            //     choices: {
            //       c1: 'Hadoop ecosystem (e.g. HDFS, Hive, HBase)',
            //       c2: 'Spark ecosystem',
            //       c3: 'ELK',
            //       c4: 'Not familiar with any of the above ecosystems'
            //     },
            //     is_required: 0,
            //     help_text: 'If you are familiar with some tools, please tell us so that we can optimize our results.'
            //   }
            res.json(questionData);

        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });






}