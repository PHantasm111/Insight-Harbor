import db from "../src/db_connection.js";

export const getTools = (req, res) => {
    // query to get tools
    const qI = "select id_t,name_t from tools where category_t LIKE '%Ingestion%';"
    const qP = "select id_t,name_t from tools where category_t LIKE '%Preparation%';"
    const qA = "select id_t,name_t from tools where category_t LIKE '%Analysis%';"
    const query_index_based_system = "select id_sto,name_sto from storage where Id_sto_class = 1;"
    const query_RDB = `
        select id_sto,name_sto,id_sto_class
        from storage
        where Id_sto_class = 10 or Id_sto_class = 12
    `;
    const query_NoSql = `
        select id_sto,name_sto,id_sto_class
        from storage
        where Id_sto_class = 11 or Id_sto_class = 13 
    `;
    const query_FS = "select id_sto,name_sto,id_sto_class from storage where Id_sto_class = 6 or Id_sto_class = 7; "

    const query_OS = "select id_sto,name_sto,id_sto_class from storage where Id_sto_class = 8;"



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
        queryPromise(query_index_based_system),
        queryPromise(query_RDB),
        queryPromise(query_NoSql),
        queryPromise(query_FS),
        queryPromise(query_OS),
    ])
        .then(results => {
            const [listI, listP, listA, listIBS, listRDB, listNosql, listFS, listOS] = results;
            res.json({
                ingestionTools: listI,
                preparationTools: listP,
                analysisTools: listA,
                storage_IBS: listIBS,
                storage_RDB: listRDB,
                storageNosql: listNosql,
                storageFS : listFS,
                storageOS: listOS,
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });

}

export const searchTool = (req, res) => {
    const id = req.params.id;
    const test = "123"
    res.json({id : id, test: test})
}