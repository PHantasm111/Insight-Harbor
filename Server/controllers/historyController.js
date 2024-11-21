import db from "../src/db_connection.js";

// Create a function to find id of storage and source
const findIdSource = async (source) => {
    const connection = db.promise();
    try {
        const [res] = await connection.query("SELECT id_datasource FROM datasource WHERE name_datasource = ?", [source])
        const sourceId = res.length > 0 ? res[0].id_datasource : null;
        return sourceId;

    } catch (error) {
        console.log("Find id source error", error)
        return null;
    }
}

const findIdStorage = async (storage) => {
    const connection = db.promise();
    try {
        const [res] = await connection.query("SELECT Id_sto FROM storage WHERE name_sto = ?", [storage])
        const storageId = res.length > 0 ? res[0].Id_sto : null;
        return storageId;

    } catch (error) {
        console.log("Find id storage error", error)
        return null;
    }
}

const processSourceAndTarget = async (sourceAndTargetZoneIngestion) => {
    const resultArray = await Promise.all(
        sourceAndTargetZoneIngestion.map(async ([source, target]) => {
            let sourceIds;
            if (Array.isArray(source)) {
                sourceIds = await Promise.all(source.map(async (src) => {
                    const sourceId = await findIdSource(src);
                    return sourceId;
                }));
            } else {
                sourceIds = [await findIdSource(source)];
            }

            let targetIds;
            if (Array.isArray(target)) {
                targetIds = await Promise.all(target.map(async (tgt) => {
                    const targetId = await findIdStorage(tgt);
                    return targetId;
                }));
            } else {
                targetIds = [await findIdStorage(target)];
            }

            return [sourceIds, targetIds];
        })
    );

    return resultArray;
};

const getUserHistoryFromId = async (uid) => {
    const connection = db.promise();

    const queryUserHistory = `SELECT UserID, build.Id_R, name_dl,Date_created, Status, COUNT(c.Id_zone) AS total_zones
                                FROM build
                                JOIN datalake d ON d.Id_R = build.Id_R
                                JOIN contain c ON d.Id_R = c.Id_R
                                WHERE UserID = ?
                                AND Status in ('finished','valid')
                                GROUP BY UserID, build.Id_R, Date_created, Status;`;

    const [res] = await connection.query(queryUserHistory, [uid]);
    return res;
}

export const initialHistory = async (req, res) => {

    const userID = req.params.uid;
    console.log(userID);

    // Step 1: Check if user exists
    const userCheckQuery = "SELECT * FROM users WHERE UserID = ?";
    const [userData] = await db.promise().query(userCheckQuery, [userID]);

    if (userData.length === 0) {
        return res.status(404).json("User not found !");
    }

    // Step 2: search history data
    const historydata = await getUserHistoryFromId(userID);
    console.log(historydata)

    return res.status(200).json(historydata);
}

export const saveFinalResult = async (req, res) => {

    // Step 0 : Get the data from req
    if (!req.body) {
        return res.status(404).json("No data send !");
    }

    const {
        timer,
        currentUser,
        title,
        model,
        sourceZoneModel,
        resultStore,
        allQuestionsData,
        sourceAndTargetStep1,
        deployMode,
        architectureCloud,
    } = req.body;

    const userID = currentUser.UserID;
    const emailU = currentUser.email_U;
    const userName = currentUser.name_U;


    // Step 1: Check if user exists
    const userCheckQuery = "SELECT * FROM users WHERE UserID = ? AND email_U = ?";
    const [userData] = await db.promise().query(userCheckQuery, [userID, emailU]);

    if (userData.length === 0) {
        return res.status(404).json("User not found !");
    }

    // Step 2: Create a datalake in db
    let datalakeName;

    if (title === "Data Lake") {
        datalakeName = userName + "'s " + "Data Lake"
    }

    let datalakeId;
    const insertDatalakeAndBuild = async (userID, datalakeName, allQuestionsData, currentId, resultStore, sourceAndTargetList) => {
        const connection = db.promise();

        try {
            // Step 2.1: Insert new datalake data
            const insertDatalakeQuery = "INSERT INTO datalake (name_dl) VALUES (?)";
            const [datalakeResult] = await connection.query(insertDatalakeQuery, [datalakeName]);

            // Get the newly inserted Id_R
            datalakeId = datalakeResult.insertId;

            // Step 2.2: Insert new build data
            const insertCalendarQuery = `INSERT IGNORE INTO calendar (Date_created) VALUES (CURRENT_TIMESTAMP())`;
            await connection.query(insertCalendarQuery);

            const insertBuildQuery = `
                INSERT INTO build (UserID, Id_R, Date_created, Status, AllQuestionsData, CurrentId, ResultStore, SourceAndTargetList,timer, architectureCloud, deployMode)
                VALUES (?, ?, CURRENT_TIMESTAMP(), 'finished', ?, ?, ?, ?,?,?,?)
            `;

            const [buildResult] = await connection.query(insertBuildQuery, [
                userID,
                datalakeId,
                JSON.stringify(allQuestionsData),
                null,
                JSON.stringify(resultStore),
                JSON.stringify(sourceAndTargetList),
                timer,
                JSON.stringify(architectureCloud),
                deployMode
            ]);

            console.log("Data successfully inserted into build table", buildResult);
        } catch (error) {
            console.error("Error inserting data:", error);
            throw error;
        }
    };

    await insertDatalakeAndBuild(userID, title ? title : datalakeName, allQuestionsData, null, resultStore, sourceAndTargetStep1)

    // Step 3: Determinate the nember of the zone in the datalake and insert into db
    let nbZone;

    if (model === 3 && sourceZoneModel === "Streaming") {
        nbZone = [2, 3]
    } else {
        nbZone = [1, 2, 3]
    }

    const insertZoneOfDatalake = async (nbZone, datalakeId) => {
        const connection = db.promise();

        try {
            const insertQuery = `Insert into contain (Id_R, Id_zone) VALUES (?, ?)`

            await Promise.all(nbZone.map(async (zone) => {
                await connection.query(insertQuery, [datalakeId, zone]);
            }));

        } catch (error) {
            console.error("Error inserting data:", error);
            throw error;
        }
    }

    await insertZoneOfDatalake(nbZone, datalakeId)

    // Step 4 : insert the data into the table implementation
    // 4.1 : prepare the data to insert
    // SourceStreaming is step2 but it store in step1 with sourceStreaming:1, so we need to identify these type of source
 
    return res.status(200).json("Report saved !")
}


export const deleteHistoryById = async (req, res) => {

    // Step 1: get the idR
    const idR = req.params.idR;

    // Step 2 : clean all relative data in the db
    const [res1] = await db.promise().query("DELETE FROM build WHERE Id_R = ?", [idR])

    if (res1.affectedRows === 0) {
        return res.status(404).json({ message: "Record not found or already deleted" });
    }

    const [res2] = await db.promise().query("DELETE FROM contain WHERE Id_R = ?", [idR])

    if (res2.affectedRows === 0) {
        return res.status(404).json({ message: "Record not found or already deleted" });
    }

    const [res3] = await db.promise().query("DELETE FROM datalake WHERE Id_R = ?", [idR])

    if (res3.affectedRows === 0) {
        return res.status(404).json({ message: "Record not found or already deleted" });
    }

    return res.status(200).json({ message: "Record deleted successfully" });

}


export const getRecordById = async (req, res) => {
    const idDL = req.params.id;

    try {
        const q = `SELECT AllQuestionsData as allQuestionsData, ResultStore as resultStore, SourceAndTargetList as sourceAndTargetStep1, timer, architectureCloud, deployMode FROM build WHERE Id_R = ? AND Status IN ('finished','valid')`
        const r = await db.promise().query(q, [idDL])

        console.log("record",r[0][0]);
        return res.status(200).json(r[0][0])
        
    } catch (error) {
        return res.status(404).json("Record not found !")
    }

}

export const updateStatuts = async (req, res) => {
    const {id} = req.params;

    const {status} = req.body;

    try {
        await db.promise().query(`UPDATE build SET Status = ? WHERE Id_R = ?`, [status, id])

        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating record" });
    }
}