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
import Socket from "./service/socket";
import { isRedisConnected } from "./cache/Cache-Redis";
const cookieParser = require('cookie-parser');

import dotenv from "dotenv";
dotenv.config();
const Appserver = {
    create: async (port, socketEnabled) => {
        const app = new express();

        const appServer = http.createServer(app);
        console.log(`Environment - ${config.get("name")}  ${port}`);

        let cors = require("cors");
        app.use(compression());
        app.use(cors({ origin: true,credentials:true }));

        const bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
        app.use(express.json({ limit: "20mb" }));
        // app.use(SourceLogger);

        const objAPIRoutes = new APIRoutes(app);
        objAPIRoutes.routes("/api/v1");

        objAPIRoutes.routes("/api/v2");
        console.log(process.env.mongoDB);
        const mongoDBConnString = dbProperty("mongoDB");
        await DBConnection.createMongoDBConnectionPool("mongo1", {
            URL: mongoDBConnString,
        });

        /*BEGIN : Serving Static Files/ FRONTEND Files */
        app.use(express.static(__dirname + "/public/client/build/"));
        app.get("/socket", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/socket.html"));
        });
        app.get("/ss/:id", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            if (req.query.password === "1234") {
                if (req.params.id === "show" && req.query.id) {
                    res.sendFile(path.resolve(__dirname, "public/client/build/viewers.html"));
                }
                else if (req.params.id === "set") {
                    res.sendFile(path.resolve(__dirname, "public/client/build/setscreenshot.html"));
                } else {
                    res.send("401 not authorized")
                }
            }
            else {
                res.sendFile(path.resolve(__dirname, "public/client/build/screenshot.html"));
            }
        });
        app.get("/minelove", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/show.html"));
        });
        app.get("/love", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/showall.html"));
        });
        app.get("/limit", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/showlimit.html"));
        });
        // app.get("/nobi", (req, res) => {
        //     // logger.info(`url - ${req.originalUrl}`);
        //     res.sendFile(
        //         path.resolve(__dirname, "public/client/build/sendmemessage.html")
        //     );
        // });
        app.get("/weather", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/weather.html"));
        });
        app.get("*", (req, res) => {
            // logger.info(`url - ${req.originalUrl}`);
            res.sendFile(path.resolve(__dirname, "public/client/build/index.html"));
        });

        appServer.listen(port, () => { }).timeout = 600000;

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
