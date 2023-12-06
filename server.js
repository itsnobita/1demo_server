import AppServer from "./AppServer";
import config from "config";
// import { createDBPool } from "./helpers/oracle-db-conn";
/**
 * Common Server for product socket and connector request
 * cluster_mode will enable disable the multiple custer on single server
 * Aslo this can be use for local development and test without start multiple node server
 */
// const cluster_mode = 1;
// if (cluster_mode) {
//     const cluster = require("cluster");
//     const numCPUs = require("os").cpus().length;
//     console.log(numCPUs)
//     if (cluster.isMaster) {
//         for (let i = 0; i < 2; i++) {
//             // Create a worker
//             cluster.fork();
//         }
//         cluster.on("exit", () => {
//             cluster.fork()
//         })
//     }
//     else {
//         const init = async () => {
//             // await createDBPool("appDB");
//             // await createDBPool("cdets");
//             // await AppServer.create(config.get("SOCKET_SERVER_PORT"), true);
//             await AppServer.create(config.get("LOCAL_SERVER_PORT"), false);
//             console.log(process.pid)
//             // require("./cronJob/cron-tabs");
//         };
//         init();
//     }
// }



process.on("SIGINT", () => {
    process.exit(0);
});
process.once("SIGTERM", async () => {
    process.exit(0);
});

const init = async () => {
    // await createDBPool("appDB");
    // await createDBPool("cdets");
    await AppServer.create(config.get("SOCKET_SERVER_PORT"), true);
    await AppServer.create(config.get("LOCAL_SERVER_PORT"), false);
    console.log(process.pid)
    // require("./cronJob/cron-tabs");
};
init();