import ConnectionFactory from "./ConnectionFactory";

class DBConnection {
    static mongoDBConnectionPool = {};
    static oracleConnectionPool = {};

    static getMongoDBConnectionPool(
        poolName = undefined,
        dbConfig = undefined
    ) {
        return poolName
            ? this.mongoDBConnectionPool.hasOwnProperty(poolName)
                ? this.mongoDBConnectionPool[poolName]
                : this.createMongoDBConnectionPool(poolName, dbConfig)
            : this.mongoDBConnectionPool;
    }

    static getOracleConnectionPool(poolName = undefined) {
        return poolName
            ? this.oracleConnectionPool[poolName]
            : this.oracleConnectionPool;
    }

    static async createMongoDBConnectionPool(poolName, dbConfig) {
        const connection = ConnectionFactory.create("mongodb", dbConfig);
        this.mongoDBConnectionPool[poolName] = await connection;
    }

    static async createOracleConnectionPool(poolName, dbConfig) {
        const connection = ConnectionFactory.create("oracle", dbConfig);
        this.oracleConnectionPool[poolName] = await connection;
    }
}

export default DBConnection;
