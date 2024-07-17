import db from "../src/db_connection.js";

export const getTools = (req, res) => {
    // query to get tools
    const qI = "select id_t,name_t from tools where category_t LIKE '%Ingestion%';"
    const qP = "select id_t,name_t from tools where category_t LIKE '%Preparation%';"
    const qA = "select id_t,name_t from tools where category_t LIKE '%Analysis%';"
    const qS = "select id_sto,name_sto from storage"

    // Create a promise for each query
    const queryPromise = (query) => {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Execute all queries
    Promise.all([
        queryPromise(qI),
        queryPromise(qP),
        queryPromise(qA),
        queryPromise(qS)
    ])
    .then(results => {
        const [listI, listP, listA, listS] = results;
        res.json({
            ingestionTools: listI,
            preparationTools: listP,
            analysisTools: listA,
            storageTools: listS
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });

}