import db from "../src/db_connection.js";

function getNextQuestionId(currentQuestionId, selections, currentStep) {

    const lastQuesionAnswer = Object.values(selections)[0]
    //console.log(Object.values(lastQuesionAnswer))

    if (currentQuestionId < 10) { // optimise speed 
        if (currentQuestionId === 1 && currentStep === 1) {
            switch (lastQuesionAnswer) {
                case 'On-premises':
                    return 2
                case 'On cloud':
                    return 30
            }
        }

        if (currentQuestionId === 2 && currentStep === 1) {
            if (lastQuesionAnswer === "Not familiar with any of the above ecosystems") {
                return 4
            }

            return 3
        }

        if (currentQuestionId === 3 && currentStep === 1) {
            return 4
        }

        if (currentQuestionId === 4 && currentStep === 1) {
            if (lastQuesionAnswer === "No" || lastQuesionAnswer === "A little bit (medium budget)") {
                return 5
            } else if (lastQuesionAnswer === "Yes") {
                return 31
            }
        }

        if (currentQuestionId === 5 && currentStep === 1) {
            if (lastQuesionAnswer === "Batch") {
                return 6
            } else if (lastQuesionAnswer === "Streaming") {
                return 16
            } else if (lastQuesionAnswer === "Streaming") {
                return 6
            }
        }

        if (currentQuestionId === 6 && currentStep === 1) {
            return 7
        }

        if (currentQuestionId === 7 && currentStep === 1) {
            return 8
        } else if (currentQuestionId === 7 && currentStep === 2){
            return 9
        }

        if (currentQuestionId === 8 && currentStep === 1) {
            return 9
        }

        if (currentQuestionId === 9 && currentStep === 1) {
            if (lastQuesionAnswer === "Yes") {
                return 6
            } else {
                return 10
            }
        }

        if (currentQuestionId === 10 && currentStep === 2){
            return 7
        }







    } else if ((currentQuestionId > 10) && (currentQuestionId < 20)) {

        if (currentQuestionId === 11 && currentStep === 2) {
            return 12
        }

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

    const currentStep = req.body.step + 1;

    const nextQuestionId = getNextQuestionId(currentQuestionId, req.body.selections, currentStep)

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

export const getSkipQuestion = (req, res) => {

}