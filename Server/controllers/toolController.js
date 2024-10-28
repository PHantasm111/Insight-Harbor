import db from "../src/db_connection.js";
import _ from 'lodash';
const { random } = _;

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

export const getInitialData = async (req, res) => {

    console.log("111")
    try {
        const [toolsByCategory] = await db.promise().query(`
          SELECT category_t, Id_t
          FROM tools
          ORDER BY category_t
        `);
    
        const categoryToolIds = toolsByCategory.reduce((acc, tool) => {
          if (!acc[tool.category_t]) acc[tool.category_t] = [];
          acc[tool.category_t].push(tool.Id_t);
          return acc;
        }, {});
    
        const selectedToolIds = Object.entries(categoryToolIds).reduce((acc, [category, ids]) => {
       
          const randomIds = random(ids, 5);
          acc[category] = randomIds;
          return acc;
        }, {});
    
        const toolDetailsPromises = Object.values(selectedToolIds).flat().map(id =>
          db.promise().query(`SELECT * FROM tools WHERE Id_t = ?`, [id])
        );
        const toolDetails = await Promise.all(toolDetailsPromises);
    
        const result = Object.keys(selectedToolIds).reduce((acc, category, index) => {
          acc[category] = toolDetails[index];
          return acc;
        }, {});
    
        console.log("res", result.Ingestion);
        res.json(result);
    
      } catch (error) {
        console.error("Error fetching initial data:", error);
        res.status(500).json({ message: "Failed to fetch initial data" });
      }
}