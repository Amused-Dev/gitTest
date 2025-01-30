const Sequelize = modules.sequelize;
const DataTypes = modules.sequelize;
let connDetails;
let sequelize;

complete({ connectToMSSQL });

async function connectToMSSQL(conn) {
    const connectionDetails = getConnectionDetails(conn);
    if (!connectionDetails) {
        return fail("Invalid connection parameter");
    }

    try {
        await initializeSequelize(connectionDetails);
        return sequelize;
    } catch (error) {
        log.error(error);
        throw error; 
    }
}

function getConnectionDetails(conn) {
    switch (conn) {
        case "FUSION-InstronTest":
            return {
                HOST: "10.1.50.181",
                USER: "NeptuneUser",
                PASSWORD: "Neptune02",
                DATABASE: "Instron_Test",
                DIALECT: "mssql",
            };
        case "FUSION-Instron":
            return {
                HOST: "10.1.50.181",
                USER: "NeptuneUser",
                PASSWORD: "Neptune02",
                DATABASE: "Instron",
                DIALECT: "mssql",
            };
        case "SAP_TABLES":
            return {
                HOST: "10.160.62.15",
                USER: "NeptuneUser",
                PASSWORD: "Neptune02",
                DATABASE: "???", 
                DIALECT: "mssql",
            };
        case "AMP_Production_IOT":
            return {
                HOST: "10.160.62.15",
                USER: "NeptuneUser",
                PASSWORD: "Neptune02",
                DATABASE: "AMP_Production_IOT", 
                DIALECT: "mssql",
            };            
        default:
            return null;
    }
}

async function initializeSequelize(connectionDetails) {
    sequelize = new Sequelize(
        connectionDetails.DATABASE,
        connectionDetails.USER,
        connectionDetails.PASSWORD,
        {
            host: connectionDetails.HOST,
            dialect: connectionDetails.DIALECT,
            define: {
                freezeTableName: true,
            },
        }
    );
}
