import mongoose from "mongoose";
import config from "config";
// import log from "../../../utility/logger";
import initializeSchema from "../schemas";
import { dbProperty } from "../../../utility/read-properties";
// const logger = log();

/**
 * This class provides methods to connect and disconnect to the mongodb.
 */
class MDBConnection {
    static async get(url) {
        const MongoURI = url || dbProperty("mongoDB");
        return this.connect(MongoURI);
    }

    static async set(url) {
        const MongoURI = url || dbProperty("mongoDB");
        this.conn = mongoose.connect(MongoURI);
    }

    static async connect(url) {
        try {
            const MongoURI = url || dbProperty("mongoDB");
            mongoose.Promise = global.Promise;
            // console.log("Establish     new connection with url", MongoURI);
            if (this.conn) {
                console.log("#### REUSING CONNECTION ####");
                return this.conn;
            } else {
                console.log("#### NEW CONNECTION ####");
                const options = {
                    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
                    useNewUrlParser: true,
                };
                this.conn = await mongoose.connect(MongoURI, options);
                console.log("######### INITIALIZED #########");
                await initializeSchema();
                console.log("######### INIT COMPLETE #########");
                return this.conn;
            }
        } catch (error) {
            console.log("Error ======> ", error);
            // logger.error(
            //     `Connect Error ============>  ${error && error.message}`
            // );
        }
    }

    static async disconnect() {
        console.log("### Closing connection ###");
        const conn = await this.conn;
        conn.connection.close();
    }
}

export default MDBConnection;
