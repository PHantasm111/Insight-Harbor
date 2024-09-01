import db from "../src/db_connection.js";

function getNextQuestionId(currentQuestionId, selections, currentStep, ingestType, analysisType, deployType, targetListHasValue) {

    const questionAnswer = Object.values(selections)[0]
    //console.log(Object.values(lastQuesionAnswer))

    if (currentQuestionId <= 10) { // optimise speed 

        // ID = 1
        if (currentQuestionId === 1 && currentStep === 1) {
            switch (questionAnswer) {
                case 'On-premises':
                    return 2
                case 'On cloud':
                    return 30
            }
        }

        // ID = 2
        if (currentQuestionId === 2 && currentStep === 1) {
            if (questionAnswer === "Not familiar with any of the above ecosystems") {
                return 4
            } else {
                return 3
            }
        }

        // ID = 3
        if (currentQuestionId === 3 && currentStep === 1) {
            return 4
        }

        // ID = 4
        if (currentQuestionId === 4 && currentStep === 1) {
            if (questionAnswer === "No" || questionAnswer === "A little bit (medium budget)") {
                return 5
            } else if (questionAnswer === "Yes") {
                return 31
            }
        }

        // ID = 5
        if (currentQuestionId === 5 && currentStep === 1) {
            if (questionAnswer === "Batch") {
                return 6
            } else if (questionAnswer === "Streaming") {
                return 16
            } else if (questionAnswer === "Hybrid") {
                return 6
            }
        } else if (currentQuestionId === 5 && currentStep === 1 && deployType === "On cloud") {
            if (questionAnswer === "Hybrid") {
                return 26
            } else {
                return 6
            }
        }

        // ID = 6
        if (currentQuestionId === 6 && currentStep === 1 && analysisType != "Real-time analysis") {
            return 7
        } else if (currentQuestionId === 6 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Real-time analysis") {
            return 10
        }

        // ID = 7
        if (currentQuestionId === 7 && currentStep === 1 && ingestType === "Batch") {
            return 8
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === false && (ingestType === "Batch" || ingestType === "Streaming") && analysisType != "Real-time analysis") {
            return 11
        } else if (currentQuestionId === 7 && currentStep === 3) {
            return 13
        } else if (currentQuestionId === 7 && currentStep === 1 && ((ingestType === "Streaming" && analysisType === "Offline analysis") || ingestType === "Hybrid")) {
            return 9
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === false && ingestType === "Streaming" && analysisType === "Real-time analysis") {
            return 20
        } else if (currentQuestionId === 7 && currentStep === 1 && deployType === "On cloud") {
            return 28
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === false) {
            return 24
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === true) {
            return 10
        }

        // ID = 8
        if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Batch") {
            return 9
        } else if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Offline analysis") {
            return 18
        } else if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Hybrid") {
            if (questionAnswer === "Yes") {
                return 19
            } else {
                return 10
            }
        }

        // ID = 9
        if (currentQuestionId === 9 && currentStep === 1 && (ingestType === "Batch" || ingestType === "Streaming")) {
            if (questionAnswer === "Yes") {
                return 6
            } else {
                return 10
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && ((ingestType === "Streaming" && analysisType === "Offline analysis") || ingestType === "Hybrid")) {
            return 8
        }

        // ID = 10
        if (currentQuestionId === 10) {
            return 7
        }

    } else if ((currentQuestionId > 10) && (currentQuestionId < 20)) {

        // ID = 11
        if (currentQuestionId === 11 && currentStep === 2 && (ingestType === "Batch" || ingestType === "Streaming")) {
            return 12
        }

        // ID = 12
        if (currentQuestionId === 12) {
            return 7
        }

        // ID = 13
        if (currentQuestionId === 13) {
            return 14
        }

        // ID = 14
        if (currentQuestionId === 14) {
            return 15
        }

        // ID = 15

        // ID = 16
        if (currentQuestionId === 16) {
            return 6
        }

        // No 17 in db 

        // ID = 18
        if (currentQuestionId === 18 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Offline analysis") {
            if (questionAnswer === "Yes") {
                return 19
            } else if (questionAnswer === "No") {
                return 10
            }
        }

        // ID = 19
        if (currentQuestionId === 19) {
            return 16
        }

    } else {
        // ID = 20
        if (currentQuestionId === 20) {
            if (questionAnswer === "Yes") {
                return 21
            } else if (questionAnswer === "No") {
                return 12
            }
        }

        // ID = 21
        if (currentQuestionId === 21) {
            if (questionAnswer === "Yes") {
                return 12
            } else if (questionAnswer === "No") {
                return 22
            }
        }

        // ID = 22
        if (currentQuestionId === 22) {
            if (questionAnswer === "Yes") {
                return 12
            } else if (questionAnswer === "No") {
                return 23
            }
        }

        // ID = 23
        if (currentQuestionId === 23) {
            return 12
        }

        // ID = 24
        if (currentQuestionId === 24 && ingestType === "Hybrid") {
            return 20
        } else if (currentQuestionId === 24) {
            return 12
        }

        // ID = 25
        if (currentQuestionId === 25) {
            return 5
        }

        // ID = 26
        if (currentQuestionId === 26 && currentStep === 1 && deployType === "Cloud") {
            return 27
        }

        // ID = 27
        if (currentQuestionId === 27 && currentStep === 1 && deployType === "Cloud") {
            return 7
        }

        // ID = 28
        if (currentQuestionId === 28 && currentStep === 2 && deployType === "Cloud") {
            if (questionAnswer === "Yes") {
                return 12
            } else {
                return 29
            }
        }

        // ID = 29
        if (currentQuestionId === 29 && currentStep === 2 && deployType === "Cloud") {
            return 12
        }


        // ID = 30
        if (currentQuestionId === 30) {
            if (questionAnswer === "Not familiar with any service above.") {
                return 25
            } else {
                return 5
            }
        }

        // ID = 31
        if (currentQuestionId === 31) {
            if (questionAnswer === "Yes") {
                return 10
            } else {
                return 12
            }
        }
    }
}

// A flag to show which branch we are
let deployType;
let ingestType;
let analysisType;

export const getNextQuestion = (req, res) => {

    // Get the questionId from URL
    //console.log(req.body)

    const currentQuestionId = parseInt(req.params.id, 10) // Decimal numbers
    //console.log("currentQuestionId : " + currentQuestionId)

    const currentStep = req.body.step + 1;

    if (currentQuestionId === 1) {
        deployType = Object.values(req.body.selections)[0]
    }

    if (currentQuestionId === 5) {
        ingestType = Object.values(req.body.selections)[0]
    }

    if (currentQuestionId === 16) {
        analysisType = Object.values(req.body.selections)[0]
    }

    //console.log("boolean get" + req.body.targetListHasValue)

    const nextQuestionId = getNextQuestionId(currentQuestionId, req.body.selections, currentStep, ingestType, analysisType, deployType, req.body.targetListHasValue)

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

export const getQuestionById = (req, res) => {
    const questionIdToGet = parseInt(req.params.id, 10) // Decimal numbers
    const query = `select id, content, type, choices, is_required, help_text
    from questions_table
    where id = ?`

    db.query(query,[questionIdToGet], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: 'Database query failed' });
            return;
        }

        if (results.length > 0) {
            // Create a variable to store the questionData
            const questionData = results[0];

            res.json(questionData);

        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });
}