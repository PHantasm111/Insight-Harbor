import db from "../src/db_connection.js";

function getNextQuestionId(currentQuestionId, selections, currentStep, ingestType, analysisType, deployType, targetListHasValue, hasQ33, hasQ27, hasQ35) {

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
        if (currentQuestionId === 5 && currentStep === 1 && deployType != "On cloud") {
            if (questionAnswer === "Batch") {
                return 6
            } else if (questionAnswer === "Streaming") {
                return 16
            } else if (questionAnswer === "Hybrid") {
                return 16
            }
        } else if (currentQuestionId === 5 && currentStep === 1 && deployType === "On cloud") {
            if (questionAnswer === "Hybrid") {
                return 26
            } else {
                return 6
            }
        }

        // ID = 6
        if (currentQuestionId === 6 && currentStep === 1 && deployType != "On cloud") {
            return 7
        } else if (currentQuestionId === 6 && currentStep === 1 && deployType === "On cloud") {
            return 34
        }

        // ID = 7
        if (currentQuestionId === 7 && currentStep === 1 && deployType === "On-premises") {
            return 9
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === false && deployType != "On cloud") {
            return 11
        } else if (currentQuestionId === 7 && currentStep === 3 && deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
            return 9
        } else if (currentQuestionId === 7 && currentStep === 3 && targetListHasValue === false) {
            return 13
        } else if (currentQuestionId === 7 && currentStep === 3 && targetListHasValue === true) {
            return 12
        } else if (currentQuestionId === 7 && currentStep === 2 && targetListHasValue === true) {
            return 10
        }

        // ID = 8
        if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Batch") {
            return 18
        } else if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Offline analysis") {
            return 18

        } else if (currentQuestionId === 8 && currentStep === 1 && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
            return 10
        }

        // ID = 9
        if (currentQuestionId === 9 && currentStep === 1 && ingestType === "Batch" && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 6
            } else {
                return 8
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && (ingestType === "Streaming" && analysisType === "Offline analysis") && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 6
            } else {
                return 8
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Real-time analysis" && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 6
            } else {
                return 18
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && ingestType === "Hybrid" && !hasQ33 && deployType === "On-premises") {
            if (analysisType === "Real-time analysis") {
                if (questionAnswer === "Yes") {
                    return 32
                } else {
                    return 18
                }
            } else if (analysisType === "Offline analysis") {
                if (questionAnswer === "Yes") {
                    return 32
                } else {
                    return 33
                }
            }

        } else if (currentQuestionId === 9 && currentStep === 1 && ingestType === "Hybrid" && hasQ33 && deployType === "On-premises") {
            if (analysisType === "Real-time analysis") {
                if (questionAnswer === "Yes") {
                    return 33
                } else {
                    return 18
                }
            } else if (analysisType === "Offline analysis") {
                if (questionAnswer === "Yes") {
                    return 33
                } else {
                    return 18
                }
            }
        } else if (currentQuestionId === 9 && currentStep === 3 && ingestType === "Hybrid" && hasQ33 && deployType === "On-premises") {
            if (analysisType === "Real-time analysis") {
                if (questionAnswer === "Yes") {
                    return 33
                } else {
                    return 18
                }
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && deployType === "On cloud" && ingestType != "Hybrid") {
            if (questionAnswer === "Yes") {
                return 6
            } else {
                return 28
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && deployType === "On cloud" && ingestType === "Hybrid" && !hasQ27) {
            if (questionAnswer === "Yes") {
                return 26
            } else {
                return 27
            }
        } else if (currentQuestionId === 9 && currentStep === 1 && deployType === "On cloud" && ingestType === "Hybrid" && hasQ27) {
            if (questionAnswer === "Yes") {
                return 27
            } else {
                return 19
            }
        }

        // ID = 10

        if (currentQuestionId === 10 && (ingestType === "Streaming" && analysisType === "Real-time analysis")) {
            return 20
        } else if (currentQuestionId === 10 && ingestType === "Hybrid" && deployType === "On cloud") {
            return 34
        } else if (currentQuestionId === 10) {
            return 7
        }

    } else if ((currentQuestionId > 10) && (currentQuestionId < 20)) {

        // ID = 11
        if (currentQuestionId === 11 && currentStep === 2) {
            return 12
        }

        // ID = 12
        if (currentQuestionId === 12) {
            return 7
        }

        // ID = 13
        if (currentQuestionId === 13) {
            if (questionAnswer === "Yes") {
                return 14
            } else if (questionAnswer === "No") {
                return 15
            }
        }

        // ID = 14
        if (currentQuestionId === 14) {
            return 15
        }

        // ID = 15 (Last question except real-time hybrid)
        if (currentQuestionId === 15 && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
            return 33
        } else if (currentQuestionId === 15) {
            return "BYE"
        }

        // ID = 16
        if (currentQuestionId === 16 && ingestType === "Streaming") {
            return 6
        } else if (currentQuestionId === 16 && ingestType === "Hybrid") {
            return 32
        }

        // No 17 in db 

        // ID = 18
        if (currentQuestionId === 18 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Offline analysis") {
            if (questionAnswer === "Yes") {
                return 19
            } else if (questionAnswer === "No") {
                return 10
            }
        } else if (currentQuestionId === 18 && currentStep === 1 && ingestType === "Batch" && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 19
            } else if (questionAnswer === "No") {
                return 10
            }
        } else if (currentQuestionId === 18 && currentStep === 1 && ingestType === "Streaming" && analysisType === "Real-time analysis" && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 19
            } else if (questionAnswer === "No") {
                return 20
            }
        } else if (currentQuestionId === 18 && currentStep === 1 && ingestType === "Hybrid" && analysisType === "Offline analysis" && deployType === "On-premises") {
            if (questionAnswer === "Yes") {
                return 19
            } else if (questionAnswer === "No") {
                return 10
            }
        }

        // ID = 19
        if (currentQuestionId === 19 && ingestType === "Batch") {
            return 10
        } else if (currentQuestionId === 19 && ingestType === "Streaming" && analysisType === "Real-time analysis") {
            return 20
        } else if (currentQuestionId === 19 && ingestType === "Streaming" && analysisType === "Offline analysis") {
            return 10
        } else if (currentQuestionId === 19 && ingestType === "Hybrid" && analysisType === "Offline analysis") {
            return 10
        } else if (currentQuestionId === 19 && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
            return 8
        } else if (currentQuestionId === 19 && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
            return 20
        } else if (currentQuestionId === 19 && currentStep === 1 && deployType === "On cloud" && ingestType === "Hybrid" && hasQ27) {
            return 35
        }

    } else {
        // ID = 20
        if (currentQuestionId === 20) {
            if (questionAnswer === "Yes") {
                return 21
            } else if (questionAnswer === "No") {
                return "BYE"
            }
        }

        // ID = 21
        if (currentQuestionId === 21) {
            if (questionAnswer === "Yes") {
                return "BYE"
            } else if (questionAnswer === "No") {
                return 22
            }
        }

        // ID = 22
        if (currentQuestionId === 22) {
            if (questionAnswer === "Yes") {
                return "BYE"
            } else if (questionAnswer === "No") {
                return 23
            }
        }

        // ID = 23
        if (currentQuestionId === 23) {
            return "BYE"
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
        if (currentQuestionId === 26 && currentStep === 1 && deployType === "On cloud") {
            return 34
        }

        // ID = 27
        if (currentQuestionId === 27 && currentStep === 1 && deployType === "On cloud") {
            return 34
        }

        // ID = 28
        if (currentQuestionId === 28 && currentStep === 2 && deployType === "On cloud") {
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
            return 5
        }

        // ID = 31
        if (currentQuestionId === 31) {
            if (questionAnswer === "Yes") {
                return 10
            } else {
                return 12
            }
        }

        // ID = 32
        if (currentQuestionId === 32) {
            return 7
        }

        // ID = 33
        if (currentQuestionId === 33) {
            return 7
        }

        // ID = 34
        if (currentQuestionId === 34 && hasQ35) {
            if (targetListHasValue === false) {
                return 28
            } else {
                return 10
            }
        } else if (currentQuestionId === 34 && !hasQ35) {
            return 9
        }

        // ID = 35
        if (currentQuestionId === 35) {
            return 10
        }
    }
}


const getProtentialRank = (currentQuestionId, selections) => {

    const questionAnswer = Object.values(selections[0])[0]

    // ID = 13
    if (currentQuestionId === 13) {
        if (questionAnswer === "Yes") {
            return ["Apache Trino", "Apache Hive", "Apache Drill"]
        } else if (questionAnswer === "No") {
            return ["Apache Pig"]
        }
    }

    if (currentQuestionId === 14) {
        if (questionAnswer === "Yes") {
            return ["Apache Trino", "Apache Drill", "Apache Hive"]
        } else if (questionAnswer === "No") {
            return ["Apache Trino", "Apache Hive", "Apache Drill"]
        }
    }

    if (currentQuestionId === 20) {
        if (questionAnswer === "Yes") {
            return ["Apache Flink", "Apache Storm", "Apache Samza", "Apache Spark"]
        } else if (questionAnswer === "No") {
            return ["Apache Spark"]
        }
    }

    if (currentQuestionId === 21) {
        if (questionAnswer === "Yes") {
            return ["Apache Flink"]
        } else if (questionAnswer === "No") {
            return ["Apache Storm", "Apache Samza", "Apache Spark", "Apache Flink"]
        }
    }

    if (currentQuestionId === 22) {
        if (questionAnswer === "Yes") {
            return ["Apache Flink", "Apache Spark"]
        } else if (questionAnswer === "No") {
            return ["Apache Storm", "Apache Samza", "Apache Spark", "Apache Flink"]
        }
    }

    if (currentQuestionId === 23) {
        if (questionAnswer === "Yes") {
            return ["Apache Spark", "Apache Flink"]
        } else if (questionAnswer === "No") {
            return ["Apache Storm", "Apache Samza", "Apache Spark", "Apache Flink"]
        }
    }

    return []
}


const getNextSkipQuestion = (currentQuestionId) => {
    switch (currentQuestionId) {
        case 2:
            return 4
        case 11:
            return 12
        case 13:
            return 14
        case 14:
            return 15
        case 20:
            return 21
        case 21:
            return 22
        case 22:
            return 23
        case 30:
            return 5
        default:
            return null
    }
}

// Function that verify if the target it can be integrated
const handleIntegrateTarget = (nextQuestionId, sourceAndTargetStep1, deployType, ingestType, analysisType, hasQ33) => {
    let obj;

    // IF deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Real-time analysis" && hasQ33
    // This situation, we need to choose another way to calculate -> we calculate just streaming source
    if (deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Real-time analysis" && hasQ33) {
        obj = sourceAndTargetStep1.reduce((acc, curr) => {

            // current object
            const { source, target, ingestType } = curr;

            if (ingestType === "Streaming") {

                if (!acc[target]) {
                    acc[target] = new Set();
                }

                if (Array.isArray(source)) {
                    source.forEach(src => acc[target].add(src));
                } else {
                    acc[target].add(source);
                }
            }

            return acc;
        }, {})
    } else {
        obj = sourceAndTargetStep1.reduce((acc, curr) => {
            // current attributes of this object
            const { source, target } = curr;

            // put the target into a accumlate set (if there not have then create one)
            if (!acc[target]) {
                acc[target] = new Set();
            }

            // if source is a array then forEach put into acc
            if (Array.isArray(source)) {
                source.forEach(src => acc[target].add(src));
            } else {
                acc[target].add(source);
            }
            return acc;
        }, {})
    }

    // if this array have a key that it has a value which set size > 1, means this two can be integrated
    const haveTargetCanBeIntegrated = Object.keys(obj).some(t => obj[t].size > 1);

    // We consider the situation that there is no target can be integrated
    if (!haveTargetCanBeIntegrated) {
        if (deployType === "On-premises" && ingestType === "Batch") {
            return 10
        } else if (deployType === "On-premises" && ingestType === "Streaming" && analysisType === "Offline analysis") {
            return 10
        } else if (deployType === "On-premises" && ingestType === "Streaming" && analysisType === "Real-time analysis") {
            return 20
        } else if (deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Offline analysis") {
            return 10
        } else if (deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Real-time analysis" && !hasQ33) {
            return 10
        } else if (deployType === "On-premises" && ingestType === "Hybrid" && analysisType === "Real-time analysis" && hasQ33) {
            return 20
        }
    } else {
        return nextQuestionId
    }
}

export const getNextQuestion = (req, res) => {

    // Get the questionId from URL
    const currentQuestionId = parseInt(req.params.id, 10) // Decimal numbers
    //console.log("currentQuestionId : " + currentQuestionId)

    // Get the data from req.body
    const currentStep = req.body.step + 1;
    const allQuestionsData = req.body.allQuestionsData;
    const sourceAndTargetStep1 = req.body.sourceAndTargetStep1;

    // Calculate the data that we need
    const userSelections = allQuestionsData[allQuestionsData.length - 1].userSelections;
    const targetListHasValue = allQuestionsData[allQuestionsData.length - 1].targetListHasValue

    const hasQ33 = allQuestionsData.some(q => q.questionId === 33)
    const hasQ27 = allQuestionsData.some(q => q.questionId === 27)
    const hasQ35 = allQuestionsData.some(q => q.questionId === 35)

    // A flag to show which branch are we
    let deployType;
    let ingestType;
    let analysisType = "";

    allQuestionsData.forEach(questionData => {
        const { questionId, userSelections } = questionData;

        if (questionId === 1) {
            deployType = Object.values(userSelections[0])[0]
        }

        if (questionId === 5) {
            ingestType = Object.values(userSelections[0])[0]
        }

        if (questionId === 16) {
            analysisType = Object.values(userSelections[0])[0]
        }
    })

    //console.log("boolean get" + req.body.targetListHasValue)
    //console.log(deployType, ingestType, analysisType)

    let nextQuestionId = getNextQuestionId(currentQuestionId, userSelections[0], currentStep, ingestType, analysisType, deployType, targetListHasValue, hasQ33, hasQ27, hasQ35)

    // if the last question, return
    if (nextQuestionId === "BYE") {
        return res.status(200).json("Finished");
    }

    // Before Q18 : Needed to make sure that it have the target which can be integrated, if not => pass Q18 & Q19
    if (nextQuestionId === 18) {
        // Verify if the target can be integrated
        nextQuestionId = handleIntegrateTarget(nextQuestionId, sourceAndTargetStep1, deployType, ingestType, analysisType, hasQ33)
    }

    // if (currentQuestionId === 9 && nextQuestionId === 19) {

    //     let obj;

    //     if (hasQ33 && ingestType === "Hybrid" && analysisType === "Real-time analysis") {
    //         obj = req.body.sourceAndTargetStep1.reduce((acc, curr) => {

    //             // current object
    //             const { source, target, ingestType } = curr;

    //             if (ingestType === "Streaming") {

    //                 if (!acc[target]) {
    //                     acc[target] = new Set();
    //                 }

    //                 if (Array.isArray(source)) {
    //                     source.forEach(src => acc[target].add(src));
    //                 } else {
    //                     acc[target].add(source);
    //                 }
    //             }

    //             return acc;
    //         }, {})

    //     } else {
    //         obj = req.body.sourceAndTargetStep1.reduce((acc, curr) => {
    //             // current object
    //             const { source, target } = curr;

    //             if (!acc[target]) {
    //                 acc[target] = new Set();
    //             }

    //             if (Array.isArray(source)) {
    //                 source.forEach(src => acc[target].add(src));
    //             } else {
    //                 acc[target].add(source);
    //             }
    //             return acc;
    //         }, {})

    //     }

    //     const result = Object.keys(obj).some(t => obj[t].size > 1);

    //     if (!result && ingestType === "Streaming") {
    //         nextQuestionId = 20
    //     } else if (!result && ingestType === "Hybrid" && analysisType === "" && deployType === "On-premises") {
    //         nextQuestionId = 16
    //     } else if (!result && ingestType === "Hybrid" && analysisType === "Offline analysis" && deployType === "On-premises") {
    //         nextQuestionId = 10
    //     } else if (!result && ingestType === "Hybrid" && analysisType === "Real-time analysis" && !hasQ33 && deployType === "On-premises") {
    //         nextQuestionId = 8
    //     } else if (!result && ingestType === "Hybrid" && analysisType === "Real-time analysis" && hasQ33 && deployType === "On-premises") {
    //         nextQuestionId = 20
    //     } else if (!result && ingestType === "Hybrid" && deployType === "On cloud") {
    //         nextQuestionId = 35
    //     }
    // }

    // Function that calculate the protetial rank
    const protentialRank = getProtentialRank(currentQuestionId, userSelections)

    // Query next question data from db
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
            questionData.protentialRank = protentialRank
            //console.log(questionData)

            res.json(questionData);

        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });
}


// The function that handle the skip question
export const getSkipQuestion = (req, res) => {
    // get current question ID from params
    const currentQuestionId = parseInt(req.params.id, 10);

    // Get the next question Through function
    const nextQuestionId = getNextSkipQuestion(currentQuestionId)

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

            res.json(questionData);

        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });
}


export const getQuestionById = (req, res) => {

    const questionIdToGet = parseInt(req.params.id, 10) // Decimal numbers
    const query = `select id, content, type, choices, is_required, help_text
    from questions_table
    where id = ?`

    db.query(query, [questionIdToGet], (error, results) => {
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


export const calculResultEachStep = (req, res) => {

    // get the current step from the URL
    const currentStep = parseInt(req.params.step, 10)
    //console.log(currentStep)

    const { allQuestionsData, sourceAndTargetStep1 } = req.body;

    const getAnswerById = (qId) => {
        const question = allQuestionsData.find(q => q.questionId === qId);
        return question ? Object.values(question.userSelections[0])[0] : null;
    }

    // Attention : maybe a tuple
    const answer1 = getAnswerById(1); // deploy mode： On-p/cloud
    const answer4 = getAnswerById(4); // pay? yes/no/a little
    const answer5 = getAnswerById(5); // ingestType batch/streaming/hybrid
    const answer16 = getAnswerById(16); // real-time / offline

    const hasQ33 = allQuestionsData.some(q => q.questionId === 33)

    // Change format for query
    // Deploy mode ?
    let deploy_mode;

    if (answer1 === "On-premises") {
        deploy_mode = "On-p"
    } else if (answer1 === "On cloud") {
        deploy_mode = "Cloud"
    } else {
        console.log("Error answer 1")
    }

    // isPay ?
    let isPay = 0;

    if (answer4 === "Yes" || answer4 === "A little bit (medium budget)") {
        isPay = 1;
    } else {
        isPay = 0;
    }

    // ingest type ?
    let procs_mode;

    if (answer5 === "Batch") {
        procs_mode = "B"
    } else if (answer5 === "Streaming") {
        procs_mode = "S"
    } else {
        procs_mode = "B/S"
    }

    // pre processed ?
    let pre_processed;

    const answersFor8 = getAnswerById(8);
    if (Array.isArray(answersFor8)) {
        pre_processed = answersFor8.includes("Yes") ? 1 : 0; // pre_processed? yes/no
    } else if (answersFor8 === "Yes") {
        pre_processed = 1;
    } else if (answersFor8 === "No") {
        pre_processed = 0;
    }

    const sourceTargetPairs =
        sourceAndTargetStep1
            .filter(pair => pair.step === currentStep)
            .map(pair => ({
                source: pair.source,
                target: pair.target
            }));

    //console.log("sourceTargetPairs for this step", sourceTargetPairs)

    const answer30 = getAnswerById(30);

    // Cloud Zone
    if (currentStep === 1 && deploy_mode === "Cloud") {

        if (procs_mode === "B") {
            const q = `select Id_t, name_t
                        from tools
                        where category_t like '%Ingestion%'
                        and procs_mode = 'B'
                        and dplymt_mode_t = 'Cloud'
                        order by name_t`

            db.query(q, (err, data) => {
                if (err) return res.status(500).json("query error !")

                console.log(data)
                return res.status(200).json(data)
            })

        } else if (procs_mode === "S") {
            const q = `select Id_t, name_t
                        from tools
                        where category_t like '%Ingestion%'
                        and procs_mode = 'S'
                        and dplymt_mode_t = 'Cloud'
                        order by name_t`

            db.query(q, (err, data) => {
                if (err) return res.status(500).json("query error !")

                console.log(data)
                return res.status(200).json(data)
            })


        } else if (procs_mode === "B/S") {

            const toolList = [
                { Id_t: '16 + 21', name_t: 'AWS Glue + Amazon Kinesis' },
                { Id_t: '18 + 22', name_t: 'Microsoft Azure Data Factory + Microsoft Azure Event Hubs' },
                { Id_t: '23', name_t: 'Google Cloud Dataflow' },
            ]

            return res.status(200).json(toolList)
        }
    } else if (currentStep === 2 && deploy_mode === "Cloud") {
        if (allQuestionsData[allQuestionsData.length - 1].questionId === 35) {
            const q = `select Id_t, name_t
                        from tools
                        where category_t like '%Preparation%'
                        and dplymt_mode_t = 'Cloud'
                        order by name_t`

            db.query(q, (err, data) => {
                if (err) return res.status(500).json("query error !")

                return res.status(200).json(data)
            })
        } else if (allQuestionsData[allQuestionsData.length - 1].questionId === 28) {
            const q = `select Id_t, name_t
                        from tools
                        where category_t like '%Preparation%'
                        and dplymt_mode_t = 'Cloud'
                        and complex_data_processing = 1
                        order by name_t`

            db.query(q, (err, data) => {
                if (err) return res.status(500).json("query error !")

                console.log(data)
                return res.status(200).json(data)
            })

        }
    } else if (currentStep === 3 && deploy_mode === "Cloud") {

    }


    // On-p Zone
    if (currentStep === 1 && deploy_mode === "On-p") {
        if (answer5 === "Batch") {
            // a Object to store the rank of tools
            let toolScores = {};

            // Use Promise.all to process multiple queries in parallel
            const queries = sourceTargetPairs.map(pair => {
                return new Promise((resolve, reject) => {
                    // query for each pair (source & target)
                    const query = `
                        SELECT t.Id_t, t.name_t
                        FROM tools t, output o, storage s, ingestfrom inf, datasource ds
                        WHERE t.Id_t = o.Id_t
                        AND o.Id_sto = s.Id_sto
                        AND t.Id_t = inf.Id_t
                        AND inf.id_datasource = ds.id_datasource
                        AND t.category_t LIKE 'Ingestion%'
                        AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                        AND t.dplymt_mode_t = '${deploy_mode}'
                        AND (t.procs_mode = '${procs_mode}' OR t.procs_mode = 'B/S')
                        AND ds.name_datasource = '${pair.source}'  -- pair.source
                        AND s.name_sto = '${pair.target}'          -- pair.target
                        AND t.pre_processed IN (${pre_processed === 0 ? '0, 1' : '1'})
                        ORDER BY t.popularity_t DESC;`;

                    // run query
                    db.query(query, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);  // if wrong，reject this Promise
                        } else {
                            // calculate rank for each result
                            results.forEach((result, rank) => {
                                if (!toolScores[result.Id_t]) {
                                    toolScores[result.Id_t] = {
                                        name: result.name_t,
                                        totalScore: 0,
                                        appearances: 0
                                    };
                                }
                                // calculate the score，rank is index, so rank + 1 is the real rank
                                toolScores[result.Id_t].totalScore += (rank + 1);
                                toolScores[result.Id_t].appearances += 1;
                            });

                            resolve(results);  // when success, resolve this Promise，and return res
                        }
                    });
                });
            });

            // Deal with all query results
            Promise.all(queries)
                .then(results => {
                    // calculate final rank，according to the toolScore, the tools has high score with a low rank
                    const rankedTools = Object.entries(toolScores)
                        .sort(([, a], [, b]) => a.totalScore - b.totalScore)
                        .map(([id, tool]) => ({
                            Id_t: id,
                            name_t: tool.name,
                            averageRank: tool.totalScore / tool.appearances, // calculate average rank
                            totalScore: tool.totalScore,
                            appearances: tool.appearances
                        }))
                        .sort((a, b) => a.averageRank - b.averageRank);

                    if (rankedTools.length > 0) {
                        console.log(rankedTools);
                        res.json(rankedTools);
                    } else {
                        res.status(404).json({ message: 'No results found for any pair' });
                    }
                })
                .catch(error => {
                    console.error('Error executing queries:', error);
                    res.status(500).json({ message: 'Database query failed' });
                });

        } else if (answer5 === "Streaming") {
            if (answer16 === "Real-time analysis") {
                // this time there are only step 2 in the list
                const sourceTargetPairs_RealTime =
                    sourceAndTargetStep1
                        .filter(pair => pair.step === currentStep + 1)
                        .map(pair => ({
                            source: pair.source,
                            target: pair.target
                        }));

                console.log("real time pairs", sourceTargetPairs_RealTime)


                const queries = sourceTargetPairs_RealTime.map(pair => {
                    // Handling source conditions 
                    const sourceConditions = Array.isArray(pair.source[0])
                        ? pair.source[0].map(sourceItem => {
                            return `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${sourceItem}'
                                        )`
                        }).join(' AND ')
                        : `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${pair.source}'
                                        )`


                    console.log("sourceConditions", sourceConditions)

                    const targetConditions = (pair.target.startsWith("Dis_")
                        ? `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target.substring(4)}'
                                            AND o.dplymt_archi_output = 'Dis'
                                    )`
                        : `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target}'
                                    )`
                    );

                    console.log("targetConditions", targetConditions);

                    const query = `
                                SELECT distinct t.Id_t, t.name_t, t.popularity_t
                                FROM tools t
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t LIKE 'Preparation%'
                                  AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                                  AND t.procs_mode IN ('B/S', 'S')
                                  AND (${sourceConditions})
                                  AND (${targetConditions})
                                ORDER BY t.popularity_t DESC;
                            `;

                    return new Promise((resolve, reject) => {
                        db.query(query, (error, results) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                reject(error);
                            } else {
                                console.log("result", results)
                                resolve(results);
                            }
                        });
                    });
                });

                Promise.all(queries)
                    .then(resultsArray => {
                        const toolCounts = {};

                        resultsArray.forEach(results => {
                            results.forEach(result => {
                                if (toolCounts[result.Id_t]) {
                                    toolCounts[result.Id_t].count += 1;
                                } else {
                                    toolCounts[result.Id_t] = {
                                        name: result.name_t,
                                        count: 1
                                    };
                                }
                            });
                        });

                        console.log(toolCounts)

                        // count ===  sourceTargetPairs.length
                        const filteredTools = Object.entries(toolCounts)
                            .filter(([id, tool]) => tool.count === sourceTargetPairs_RealTime.length)
                            .map(([id, tool]) => ({
                                Id_t: id,
                                name_t: tool.name,
                                count: tool.count
                            }));

                        if (filteredTools.length > 0) {
                            console.log(filteredTools);
                            return res.json(filteredTools);
                        } else {
                            return res.status(404).json({ message: 'No tools found that meet all criteria.' });
                        }
                    })
                    .catch(error => {
                        console.error('Error executing queries:', error);
                        return res.status(500).json({ message: 'Database query failed' });
                    });

            } else if (answer16 === "Offline analysis") {

                let toolScores = [];

                const queries = sourceTargetPairs.map(pair => {

                    // Handling source conditions 
                    const sourceConditions = Array.isArray(pair.source[0])
                        ? pair.source[0].map(sourceItem => {
                            return `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${sourceItem}'
                                        )`
                        }).join(' AND ')
                        : `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${pair.source}'
                                        )`


                    console.log("sourceConditions", sourceConditions)

                    const targetConditions = (pair.target.startsWith("Dis_")
                        ? `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target.substring(4)}'
                                            AND o.dplymt_archi_output = 'Dis'
                                    )`
                        : `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target}'
                                    )`
                    );

                    console.log("targetConditions", targetConditions);

                    const query = `
                                SELECT distinct t.Id_t, t.name_t, t.popularity_t
                                FROM tools t
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t LIKE 'Ingestion%'
                                  AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                                  AND t.procs_mode IN ('B/S', 'S')
                                  AND (${sourceConditions})
                                  AND (${targetConditions})
                                ORDER BY t.popularity_t DESC;
                            `;

                    return new Promise((resolve, reject) => {
                        db.query(query, (error, results) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                reject(error);
                            } else {
                                // calculate rank for each result
                                results.forEach((result, rank) => {
                                    if (!toolScores[result.Id_t]) {
                                        toolScores[result.Id_t] = {
                                            name: result.name_t,
                                            totalScore: 0,
                                            appearances: 0
                                        };
                                    }
                                    // calculate the score，rank is index, so rank + 1 is the real rank
                                    toolScores[result.Id_t].totalScore += (rank + 1);
                                    toolScores[result.Id_t].appearances += 1;
                                });

                                resolve(results);  // when success, resolve this Promise，and return res
                            }
                        });
                    });
                });

                // Deal with all query results
                Promise.all(queries)
                    .then(results => {
                        // calculate final rank，according to the toolScore, the tools has high score with a low rank
                        const rankedTools = Object.entries(toolScores)
                            .sort(([, a], [, b]) => a.totalScore - b.totalScore)
                            .map(([id, tool]) => ({
                                Id_t: id,
                                name_t: tool.name,
                                averageRank: tool.totalScore / tool.appearances, // calculate average rank
                                totalScore: tool.totalScore,
                                appearances: tool.appearances
                            }))
                            .sort((a, b) => a.averageRank - b.averageRank);

                        if (rankedTools.length > 0) {
                            console.log(rankedTools);
                            return res.json(rankedTools);
                        } else {
                            return res.status(404).json({ message: 'No results found for any pair' });
                        }
                    })
                    .catch(error => {
                        console.error('Error executing queries:', error);
                        return res.status(500).json({ message: 'Database query failed' });
                    });


            }
        } else if (answer5 === "Hybrid") { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Hybrid>>>>>>>>>>>>>>>>>>>>>>>>>>>Offline>>>>>>>>>>>>>>>>

            // a Object to store the rank of tools
            let toolScores = {};

            const queries = sourceTargetPairs.map(pair => {
                // Handling source conditions 
                const sourceConditions = Array.isArray(pair.source[0])
                    ? pair.source[0].map(sourceItem => {
                        return `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${sourceItem}'
                                        )`
                    }).join(' AND ')
                    : `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM ingestfrom i
                                        JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                        WHERE ds.name_datasource = '${pair.source}'
                                        )`


                console.log("sourceConditions", sourceConditions)

                const targetConditions = (pair.target.startsWith("Dis_")
                    ? `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target.substring(4)}'
                                            AND o.dplymt_archi_output = 'Dis'
                                    )`
                    : `t.Id_t IN (
                                        SELECT o.Id_t
                                        FROM output o
                                        JOIN storage so ON o.Id_sto = so.Id_sto
                                        WHERE so.name_sto = '${pair.target}'
                                    )`
                );

                console.log("targetConditions", targetConditions);

                const query = `
                                SELECT distinct t.Id_t, t.name_t, t.popularity_t
                                FROM tools t
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t LIKE 'Ingestion%'
                                  AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                                  AND t.procs_mode IN ('B/S')
                                  AND (${sourceConditions})
                                  AND (${targetConditions})
                                ORDER BY t.popularity_t DESC;
                            `;

                return new Promise((resolve, reject) => {
                    // run query
                    db.query(query, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);  // if wrong，reject this Promise
                        } else {
                            // calculate rank for each result
                            results.forEach((result, rank) => {
                                if (!toolScores[result.Id_t]) {
                                    toolScores[result.Id_t] = {
                                        name: result.name_t,
                                        totalScore: 0,
                                        appearances: 0
                                    };
                                }
                                // calculate the score，rank is index, so rank + 1 is the real rank
                                toolScores[result.Id_t].totalScore += (rank + 1);
                                toolScores[result.Id_t].appearances += 1;
                            });

                            resolve(results);  // when success, resolve this Promise，and return res
                        }
                    });
                });
            });

            // Deal with all query results
            Promise.all(queries)
                .then(results => {
                    // calculate final rank，according to the toolScore, the tools has high score with a low rank
                    const rankedTools = Object.entries(toolScores)
                        .sort(([, a], [, b]) => a.totalScore - b.totalScore)
                        .map(([id, tool]) => ({
                            Id_t: id,
                            name_t: tool.name,
                            averageRank: tool.totalScore / tool.appearances, // calculate average rank
                            totalScore: tool.totalScore,
                            appearances: tool.appearances
                        }))
                        .sort((a, b) => a.averageRank - b.averageRank);

                    if (rankedTools.length > 0) {
                        console.log(rankedTools);
                        return res.json(rankedTools);
                    } else {
                        return res.status(404).json({ message: 'No results found for any pair' });
                    }
                })
                .catch(error => {
                    console.error('Error executing queries:', error);
                    return res.status(500).json({ message: 'Database query failed' });
                });
        }

    } else if (currentStep === 2 && deploy_mode === "On-p") {

        if (answer5 === "Hybrid" && answer16 === "Real-time analysis" && hasQ33) {

            // this time need to choice ingestType:Streaming elements
            const sourceTargetPairs_Hybrid_RealTime =
                sourceAndTargetStep1
                    .filter(pair => pair.step === 1 && pair.ingestType === "Streaming")
                    .map(pair => ({
                        source: pair.source,
                        target: pair.target
                    }));

            console.log("real time pairs", sourceTargetPairs_Hybrid_RealTime)

            const queries = sourceTargetPairs_Hybrid_RealTime.map(pair => {
                // Handling source conditions 
                const sourceConditions = Array.isArray(pair.source[0])
                    ? pair.source[0].map(sourceItem => {
                        return `t.Id_t IN (
                                    SELECT i.Id_t
                                    FROM ingestfrom i
                                    JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                    WHERE ds.name_datasource = '${sourceItem}'
                                    )`
                    }).join(' AND ')
                    : `t.Id_t IN (
                                    SELECT i.Id_t
                                    FROM ingestfrom i
                                    JOIN datasource ds ON i.id_datasource = ds.id_datasource
                                    WHERE ds.name_datasource = '${pair.source}'
                                    )`


                console.log("sourceConditions", sourceConditions)

                const targetConditions = (pair.target.startsWith("Dis_")
                    ? `t.Id_t IN (
                                    SELECT o.Id_t
                                    FROM output o
                                    JOIN storage so ON o.Id_sto = so.Id_sto
                                    WHERE so.name_sto = '${pair.target.substring(4)}'
                                        AND o.dplymt_archi_output = 'Dis'
                                )`
                    : `t.Id_t IN (
                                    SELECT o.Id_t
                                    FROM output o
                                    JOIN storage so ON o.Id_sto = so.Id_sto
                                    WHERE so.name_sto = '${pair.target}'
                                )`
                );

                console.log("targetConditions", targetConditions);

                const query = `
                            SELECT distinct t.Id_t, t.name_t, t.popularity_t
                            FROM tools t
                            WHERE t.dplymt_mode_t = '${deploy_mode}'
                              AND t.category_t LIKE 'Preparation%'
                              AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                              AND t.procs_mode IN ('B/S', 'S')
                              AND (${sourceConditions})
                              AND (${targetConditions})
                            ORDER BY t.popularity_t DESC;
                        `;

                return new Promise((resolve, reject) => {
                    db.query(query, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            console.log("result", results)
                            resolve(results);
                        }
                    });
                });
            });

            Promise.all(queries)
                .then(resultsArray => {
                    const toolCounts = {};

                    resultsArray.forEach(results => {
                        results.forEach(result => {
                            if (toolCounts[result.Id_t]) {
                                toolCounts[result.Id_t].count += 1;
                            } else {
                                toolCounts[result.Id_t] = {
                                    name: result.name_t,
                                    count: 1
                                };
                            }
                        });
                    });

                    console.log(toolCounts)

                    // count ===  sourceTargetPairs.length
                    const filteredTools = Object.entries(toolCounts)
                        .filter(([id, tool]) => tool.count === sourceTargetPairs_Hybrid_RealTime.length)
                        .map(([id, tool]) => ({
                            Id_t: id,
                            name_t: tool.name,
                            count: tool.count
                        }));

                    if (filteredTools.length > 0) {
                        console.log(filteredTools);
                        return res.json(filteredTools);
                    } else {
                        return res.status(404).json({ message: 'No tools found that meet all criteria.' });
                    }
                })
                .catch(error => {
                    console.error('Error executing queries:', error);
                    return res.status(500).json({ message: 'Database query failed' });
                });



        } else {
            // Get user answer : if yes => 1 else 0
            const streamFutur = getAnswerById(11) === "Yes" ? 1 : 0;
            console.log("answer11: " + streamFutur + " " + getAnswerById(11))


            const queries = sourceTargetPairs.map(pair => {

                // Handling source conditions 
                //[{ source: [ 'HDFS' ], target: 'NTFS' },{ source: [ 'PostgreSQL with Citus', 'HDFS' ], target: 'HDFS' }]
                const sourceConditions = Array.isArray(pair.source)
                    ? pair.source.map(sourceItem => {
                        if (sourceItem.length >= 4 && sourceItem.substring(0, 4) === "Dis_") {
                            return `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM input i
                                        JOIN storage si ON i.Id_sto = si.Id_sto
                                        WHERE si.name_sto = '${sourceItem.substring(4)}'
                                            AND i.dplymt_archi_input = 'Dis'
                                        )`
                        } else {
                            return `t.Id_t IN (
                                        SELECT i.Id_t
                                        FROM input i
                                        JOIN storage si ON i.Id_sto = si.Id_sto
                                        WHERE si.name_sto = '${sourceItem}'
                                        )`
                        }
                    }).join(' AND ') // Join multiple conditions with OR if there are multiple sources
                    : (pair.source.startsWith("Dis_")
                        ? `t.Id_t IN ( 
                                    SELECT i.Id_t
                                    FROM input i
                                    JOIN storage si ON i.Id_sto = si.Id_sto
                                    WHERE si.name_sto = '${pair.source.substring(4)}'
                                        AND i.dplymt_archi_input = 'Dis'
                                    )`
                        : `t.Id_t IN (
                                    SELECT i.Id_t
                                    FROM input i
                                    JOIN storage si ON i.Id_sto = si.Id_sto
                                    WHERE si.name_sto = '${pair.source}'
                                    )`
                    );


                // Handling target conditions

                const targetConditions = (pair.target.startsWith("Dis_")
                    ? `t.Id_t IN (
                                    SELECT o.Id_t
                                    FROM output o
                                    JOIN storage so ON o.Id_sto = so.Id_sto
                                    WHERE so.name_sto = '${pair.target.substring(4)}'
                                        AND o.dplymt_archi_output = 'Dis'
                                )`
                    : `t.Id_t IN (
                                    SELECT o.Id_t
                                    FROM output o
                                    JOIN storage so ON o.Id_sto = so.Id_sto
                                    WHERE so.name_sto = '${pair.target}'
                                )`
                );

                console.log("sourceConditions", sourceConditions)
                console.log("targetConditions", targetConditions)

                const query = `
                                SELECT distinct t.Id_t, t.name_t, t.popularity_t
                                FROM tools t
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t LIKE 'Preparation%'
                                  AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                                  AND t.procs_mode IN (${streamFutur === 1 ? "'B/S'" : "'B/S', 'B'"})
                                  AND (${sourceConditions})
                                  AND (${targetConditions})
                                ORDER BY t.popularity_t DESC;
                            `;

                return new Promise((resolve, reject) => {
                    db.query(query, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            console.log("result", results)
                            resolve(results);
                        }
                    });
                });
            });

            Promise.all(queries)
                .then(resultsArray => {
                    const toolCounts = {};

                    resultsArray.forEach(results => {
                        results.forEach(result => {
                            if (toolCounts[result.Id_t]) {
                                toolCounts[result.Id_t].count += 1;
                            } else {
                                toolCounts[result.Id_t] = {
                                    name: result.name_t,
                                    count: 1
                                };
                            }
                        });
                    });

                    console.log(toolCounts)

                    // count ===  sourceTargetPairs.length
                    const filteredTools = Object.entries(toolCounts)
                        .filter(([id, tool]) => tool.count === sourceTargetPairs.length)
                        .map(([id, tool]) => ({
                            Id_t: id,
                            name_t: tool.name,
                            count: tool.count
                        }));

                    if (filteredTools.length > 0) {
                        console.log(filteredTools);
                        return res.json(filteredTools);
                    } else {
                        return res.status(404).json({ message: 'No tools found that meet all criteria.' });
                    }
                })
                .catch(error => {
                    console.error('Error executing queries:', error);
                    return res.status(500).json({ message: 'Database query failed' });
                });
        }
    } else if (currentStep === 3 && deploy_mode === "On-p") {
        const queries = sourceTargetPairs.map(pair => {

            const sourceConditions = Array.isArray(pair.source)
                ? pair.source.map(sourceItem => {
                    if (sourceItem[0].length >= 4 && sourceItem[0].substring(0, 4) === "Dis_") {
                        return `t.Id_t IN (
                                    SELECT i.Id_t
                                    FROM input i
                                    JOIN storage si ON i.Id_sto = si.Id_sto
                                    WHERE si.name_sto = '${sourceItem[0].substring(4)}'
                                        AND i.dplymt_archi_input = 'Dis'
                                    )`
                    } else {
                        return `t.Id_t IN (
                                    SELECT i.Id_t
                                    FROM input i
                                    JOIN storage si ON i.Id_sto = si.Id_sto
                                    WHERE si.name_sto = '${sourceItem[0]}'
                                    )`
                    }
                }).join(' AND ')
                : (console.log("sourceConditions error"))

            const targetConditions = (pair.target.startsWith("Dis_")
                ? `t.Id_t IN (
                                SELECT o.Id_t
                                FROM output o
                                JOIN storage so ON o.Id_sto = so.Id_sto
                                WHERE so.name_sto = '${pair.target.substring(4)}'
                                    AND o.dplymt_archi_output = 'Dis'
                            )`
                : `t.Id_t IN (
                                SELECT o.Id_t
                                FROM output o
                                JOIN storage so ON o.Id_sto = so.Id_sto
                                WHERE so.name_sto = '${pair.target}'
                            )`
            );


            console.log("sourceConditions", sourceConditions)
            console.log("targetConditions", targetConditions)

            const query = `
                                SELECT distinct t.Id_t, t.name_t, t.popularity_t
                                FROM tools t
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t LIKE 'Analysis%'
                                  AND t.isPay IN (${isPay === 0 ? '0' : "'0','1'"})
                                  AND (${sourceConditions})
                                  AND (${targetConditions})
                                ORDER BY t.popularity_t DESC;
                            `;

            return new Promise((resolve, reject) => {
                db.query(query, (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        console.log("result", results)
                        resolve(results);
                    }
                });
            });
        });


        Promise.all(queries)
            .then(resultsArray => {
                const toolCounts = {};

                resultsArray.forEach(results => {
                    results.forEach(result => {
                        if (toolCounts[result.Id_t]) {
                            toolCounts[result.Id_t].count += 1;
                        } else {
                            toolCounts[result.Id_t] = {
                                name: result.name_t,
                                count: 1
                            };
                        }
                    });
                });

                console.log(toolCounts)

                // count ===  sourceTargetPairs.length
                const filteredTools = Object.entries(toolCounts)
                    .filter(([id, tool]) => tool.count === sourceTargetPairs.length)
                    .map(([id, tool]) => ({
                        Id_t: id,
                        name_t: tool.name,
                        count: tool.count
                    }));

                if (filteredTools.length > 0) {
                    console.log(filteredTools);
                    return res.json(filteredTools);
                } else {
                    return res.status(404).json({ message: 'No tools found that meet all criteria.' });
                }
            })
            .catch(error => {
                console.error('Error executing queries:', error);
                return res.status(500).json({ message: 'Database query failed' });
            });

    }

}


export const saveQuestionData = async (req, res) => {
    try {
        const { allQuestionsData, currentQuestionId, sourceAndTargetStep1, resultStore, UserID } = req.body;

        if (allQuestionsData.length === 0) {
            return res.status(500).json("You need to answer at least 1 question !");
        }

        // Step 1: Check if user exists
        const userCheckQuery = "SELECT * FROM users WHERE UserID = ?";
        const [userData] = await db.promise().query(userCheckQuery, [UserID]);

        if (userData.length === 0) {
            return res.status(404).json("User not found !");
        }

        // Step 2: Check if there's already a saved build for this user
        const buildCheckQuery = "SELECT * FROM build WHERE UserID = ? AND Status = 'saved'";
        const [buildData] = await db.promise().query(buildCheckQuery, [UserID]);

        // Ensure calendar entry exists
        const insertCalendarQuery = `INSERT IGNORE INTO calendar (Date_created) VALUES (CURRENT_TIMESTAMP())`;
        await db.promise().query(insertCalendarQuery);

        const buildUpdateData = [
            allQuestionsData && allQuestionsData.length > 0 ? JSON.stringify(allQuestionsData) : JSON.stringify([]),
            currentQuestionId,
            resultStore && Object.keys(resultStore).length > 0 ? JSON.stringify(resultStore) : JSON.stringify([]),
            sourceAndTargetStep1 && sourceAndTargetStep1.length > 0 ? JSON.stringify(sourceAndTargetStep1) : JSON.stringify([]),
            UserID
        ];

        if (buildData.length > 0) {
            // Step 3: Update existing build
            const updateBuildQuery = `UPDATE build 
                                      SET AllQuestionData = ?, CurrentId = ?, ResultStore = ?, SourceAndTargetList = ?, Date_created = CURRENT_TIMESTAMP() 
                                      WHERE UserID = ? AND Status = 'saved'`;
            await db.promise().query(updateBuildQuery, buildUpdateData);
            return res.status(200).json("Build data updated successfully");
        } else {
            // Step 4: Insert new data into datalake
            const datalakeInsertQuery = `INSERT INTO datalake (name_dl, Id_R) VALUES (?, ?)`;
            const [datalakeResult] = await db.promise().query(datalakeInsertQuery, ['Your Data Lake', null]);
            const datalakeId = datalakeResult.insertId;

            // Step 5: Insert new build data
            const insertBuildQuery = `INSERT INTO build (AllQuestionData, CurrentId, ResultStore, SourceAndTargetList, UserID, Id_R, Date_created, Status)
                                      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), 'saved')`;
            buildUpdateData.push(datalakeId);
            await db.promise().query(insertBuildQuery, buildUpdateData);
            return res.status(200).json("Build data saved successfully");
        }
    } catch (err) {
        console.error("Error during build process:", err);
        return res.status(500).json({ message: "Failed to save build data", error: err });
    }
};

export const getOverwriteData = async (req, res) => {

    const UserID = req.query.userId;

    // Step 1: Check if user exists
    const userCheckQuery = "SELECT * FROM users WHERE UserID = ?";
    const [userData] = await db.promise().query(userCheckQuery, [UserID]);

    if (userData.length === 0) {
        return res.status(404).json("User not found !");
    }

    // Step 2 : Get the data back to front-end
    const query = `SELECT AllQuestionData, CurrentId, ResultStore, SourceAndTargetList 
                 FROM build 
                 WHERE UserID = ? AND Status = 'saved'`;

    db.query(query, [UserID], (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ message: "Failed to fetch data", error: err });
        }

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).json({ message: "No saved data found" });
        }
    });

}