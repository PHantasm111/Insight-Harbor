import db from "../src/db_connection.js";

export const initialHistory = (req, res) => {

}

export const saveFinalResult = async (req, res) => {

    // Step 0 : Get the data from req
    if (!req.body) {
        return res.status(404).json("No data send !");
    }

    const {
        sourceBatch,
        sourceStreaming,
        sourceRealtimeStreaming,
        storageZone1,
        rankZone1,
        storageZone2,
        rankZone2,
        storageZone3,
        rankZone3,
        totalQ,
        timer,
        currentUser,
        title,
        model,
        sourceZoneModel,
        resultStore, 
        allQuestionsData, 
        sourceAndTargetStep1,
    } = req.body;

    const UserID = currentUser.UserID;
    const emailU = currentUser.email_U;


    // Step 1: Check if user exists
    const userCheckQuery = "SELECT * FROM users WHERE UserID = ? AND email_U = ?";
    const [userData] = await db.promise().query(userCheckQuery, [UserID, emailU]);

    if (userData.length === 0) {
        return res.status(404).json("User not found !");
    }

    // Step 2: Create a datalake in db
    const insertDatalakeAndBuild = async (userID, datalakeName, allQuestionData, currentId, resultStore, sourceAndTargetList) => {
        const connection = db.promise();
    
        try {
            // Step 2.1: Insert new datalake data
            const insertDatalakeQuery = "INSERT INTO datalake (name_dl) VALUES (?)";
            const [datalakeResult] = await connection.query(insertDatalakeQuery, [datalakeName]);
    
            // Get the newly inserted Id_R
            const datalakeId = datalakeResult.insertId;
    
            // Step 2.2: Insert new build data
            const insertBuildQuery = `
                INSERT INTO build (UserID, Id_R, Date_created, Status, AllQuestionData, CurrentId, ResultStore, SourceAndTargetList)
                VALUES (?, ?, NOW(), 'saved', ?, ?, ?, ?)
            `;
    
            const [buildResult] = await connection.query(insertBuildQuery, [
                userID,
                datalakeId,
                JSON.stringify(allQuestionData),   
                currentId,
                JSON.stringify(resultStore),       
                JSON.stringify(sourceAndTargetList) 
            ]);
    
            console.log("Data successfully inserted into build table", buildResult);
        } catch (error) {
            console.error("Error inserting data:", error);
            throw error;
        }
    };
    

    return res.status(200).json("get it")
}