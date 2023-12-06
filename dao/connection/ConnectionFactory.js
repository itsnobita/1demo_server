import MDBConnection from "../mongodb/connection/MDBConnection";

class ConnectionFactory {
    static async create(dbType, dbConfig) {
        switch (dbType) {
            case "mongodb":
                return await MDBConnection.connect(dbConfig.URL);
            case "oracle":
                return;
            default:
                return null;
        }
    }
}

export default ConnectionFactory;
