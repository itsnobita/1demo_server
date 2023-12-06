/**
 * @description This is entry file for Development-Workboard node server.
 * To start the server execute the following command at the root folder i.e. where this file exists:
 * $> npm start
 */
import path from "path";
const compression = require("compression");
import express from "express";
import config from "config";
import http from "http";
import APIRoutes from "./APIRoutes";
import DBConnection from "./dao/connection";
import { dbProperty } from "./utility/read-properties";
import Socket from "./service/socket"

const Appserver = {
    create: async (port, socketEnabled) => {
        const app = new express();

        const appServer = http.createServer(app);
        console.log(`Environment - ${config.get("name")}  ${port}`);

        let cors = require("cors");
        app.use(compression());
        app.use(cors({ origin: true}));
        

        const bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        // app.use(SourceLogger);

        const objAPIRoutes = new APIRoutes(app);
        objAPIRoutes.routes("/api/v1");
        
        objAPIRoutes.routes("/api/v2");

        const mongoDBConnString = dbProperty("mongoDB");
        await DBConnection.createMongoDBConnectionPool("mongo1", {
            URL: mongoDBConnString,
        });

        /*BEGIN : Serving Static Files/ FRONTEND Files */
        app.use(express.static(__dirname + "/public/client/build/"));
        app.get("*", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(
                path.resolve(__dirname, "public/client/build/index.html")
            );
        });
        app.get("/socket", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(
                path.resolve(__dirname, "public/client/build/socket.html")
            );
        });

        appServer.listen(port, () => {
          
        }).timeout = 600000; 

        let io;
        if (socketEnabled) {
            io = Socket(appServer);
        }

        process.once("unhandledRejection", (reason, promise) => {
            console.log("unhandledRejection", reason);
            // logger.info(
            //     `Unhandled Rejection at: ${promise} , reason: ${reason}`
            // );
            // Application specific logging, throwing an error, or other logic here
        });

        process.once("error", (error) => {
            // logger.error(error.name); // Print the warning name
            // logger.error(error.message); // Print the warning message
            // logger.error(error.stack); // Print the stack trace
        });

      
    },
};
export default Appserver;
