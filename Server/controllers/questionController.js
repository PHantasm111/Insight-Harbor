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
        deployType = Object.values(req.body.selections[0])[0]
    }

    if (currentQuestionId === 5) {
        ingestType = Object.values(req.body.selections[0])[0]
    }

    if (currentQuestionId === 16) {
        analysisType = Object.values(req.body.selections[0])[0]
    }

    //console.log("boolean get" + req.body.targetListHasValue)
    console.log(deployType, ingestType, analysisType)

    const nextQuestionId = getNextQuestionId(currentQuestionId, req.body.selections[0], currentStep, ingestType, analysisType, deployType, req.body.targetListHasValue)

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

    const { allQuestionsData, sourceAndTargetStep1 } = req.body;

    const getAnswerById = (qId) => {
        const question = allQuestionsData.find(q => q.questionId === qId);
        return question ? Object.values(question.userSelections[0])[0] : null;
    }

    // Attention : maybe a tuple
    const answer1 = getAnswerById(1); // deploy mode： On-p/cloud
    const answer4 = getAnswerById(4); // pay? yes/no/a little
    const answer5 = getAnswerById(5); // ingestType batch/streaming/hybrid


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
    } else {
        console.log("Error answer8")
    }

    const sourceTargetPairs =
        sourceAndTargetStep1
            .filter(pair => pair.step === currentStep)
            .map(pair => ({
                source: pair.source,
                target: pair.target
            }));

    console.log(sourceTargetPairs)

    if (currentStep === 1) {

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
                    AND t.category_t LIKE'Ingestion%'
                    AND t.isPay = '${isPay}'
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

    } else if (currentStep === 2) {

        // Get user answer : if yes => 1 else 0
        const streamFutur = getAnswerById(11) === "Yes" ? 1 : 0;
        console.log("answer11: " + streamFutur + " " + getAnswerById(11))


        const queries = sourceTargetPairs.map(pair => {
            // Handling source conditions -> [{ source: ["HDFS", "Dis_MongoDB"], target: ["Dis_PSQL"] } ]
            const sourceConditions = pair.source.map(sourceItem => {
                if (sourceItem.length >= 4 && sourceItem.substring(0, 4) === "Dis_") {
                    return `(si.name_sto = '${sourceItem.substring(4)}' AND i.dplymt_archi_input = 'Dis')`;
                } else {
                    return `si.name_sto = '${sourceItem}'`;
                }
            }).join(' AND '); // Join multiple conditions with OR if there are multiple sources


            // Handling target conditions
            const targetConditions = Array.isArray(pair.target)
                ? pair.target.map(targetItem => {
                    if (targetItem.startsWith("Dis_")) {
                        return `(so.name_sto = '${targetItem.substring(4)}' AND o.dplymt_archi_output = 'Dis')`;
                    } else {
                        return `so.name_sto = '${targetItem}'`;
                    }
                }).join(' OR ')
                : (pair.target.startsWith("Dis_")
                    ? `(so.name_sto = '${pair.target.substring(4)}' AND o.dplymt_archi_output = 'Dis')`
                    : `so.name_sto = '${pair.target}'`);

            console.log("sourceConditions",sourceConditions)
            console.log("targetConditions",targetConditions)

            const query = `
                                SELECT t.Id_t, t.name_t
                                FROM tools t
                                JOIN input i ON t.Id_t = i.Id_t
                                JOIN output o ON t.Id_t = o.Id_t
                                JOIN storage si ON i.Id_sto = si.Id_sto
                                JOIN storage so ON o.Id_sto = so.Id_sto
                                WHERE t.dplymt_mode_t = '${deploy_mode}'
                                  AND t.category_t = 'Preparation'
                                  AND t.isPay = '${isPay}'
                                  AND t.procs_mode IN ('${streamFutur === 1 ? 'B/S' : 'B/S, B'}')
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
                        console.log("result",results)
                        resolve(results);
                    }
                });
            });
        });

        // 处理所有查询结果
        Promise.all(queries)
            .then(resultsArray => {
                // 计算工具在所有查询结果中的出现次数
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

                // 筛选出出现次数等于 sourceTargetPairs 长度的工具
                const filteredTools = Object.entries(toolCounts)
                    .filter(([id, tool]) => tool.count === sourceTargetPairs.length)
                    .map(([id, tool]) => ({
                        Id_t: id,
                        name_t: tool.name,
                        count: tool.count
                    }));

                console.log("filtered",filteredTools)

                if (filteredTools.length > 0) {
                    console.log(filteredTools);
                    //res.json(filteredTools);
                } else {
                    res.status(404).json({ message: 'No tools found that meet all criteria.' });
                }
            })
            .catch(error => {
                console.error('Error executing queries:', error);
                res.status(500).json({ message: 'Database query failed' });
            });

    } else {

    }

}