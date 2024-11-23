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
                storageFS: listFS,
                storageOS: listOS,
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });

}

export const searchTool = async (req, res) => {
    const id = req.params.id;

    const [toolData] = await db.promise().query(`SELECT * FROM tools WHERE Id_t = ?`, [id])
    console.log(toolData)
    return res.status(200).json(toolData);
}

export const searchStorage = async (req, res) => {
    const id = req.params.id;

    const [toolData] = await db.promise().query(`SELECT * FROM storage WHERE Id_sto = ?`, [id])

    console.log(toolData)

    const data = [
        {
            Id_t : toolData[0].Id_sto,
            name_t : toolData[0].name_sto,
            category_t : "storage",
            description_t : toolData[0].description_sto,
            url : toolData[0].url_sto,
            logo : toolData[0].logo_sto
        }
    ]

    return res.status(200).json(data);
}


function randomSample(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export const getInitialData = async (req, res) => {
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

        //console.log("111", categoryToolIds)

        // 从每个类别中随机挑选 5 个 ID
        const selectedToolIds = Object.entries(categoryToolIds).reduce((acc, [category, ids]) => {
            // 使用自定义函数 `randomSample` 选择 5 个随机 ID
            const randomIds = randomSample(ids, 5);
            acc[category] = randomIds;
            return acc;
        }, {});

        //console.log("ddd", selectedToolIds)

        // 查询每个工具 ID 的详细信息
        const toolDetailsPromises = Object.values(selectedToolIds)
            .flat()
            .map(id => db.promise().query(`SELECT * FROM tools WHERE Id_t = ?`, [id]));
        const toolDetailsRaw = await Promise.all(toolDetailsPromises);

        // 过滤掉表结构信息
        const toolDetails = toolDetailsRaw.map(([data]) => data[0]);

        // 组织最终结果
        const result = Object.keys(selectedToolIds).reduce((acc, category, index) => {
            acc[category] = toolDetails.slice(index * 5, index * 5 + 5);
            return acc;
        }, {});

        //console.log("res", result.Ingestion);
        res.json(result);

    } catch (error) {
        console.error("Error fetching initial data:", error);
        res.status(500).json({ message: "Failed to fetch initial data" });
    }
}