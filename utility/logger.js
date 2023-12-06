// import config from "config";
// import { createLogger, format, transports } from "winston";
// import { join, relative, basename } from "path";
// import { titleCase } from "./common";
// const { combine, timestamp, printf } = format;
// var PROJECT_ROOT = join(__dirname, "..");
// let enableMethodException = false;

// import DailyRotateFile from "winston-daily-rotate-file";

// const transport = new DailyRotateFile({
//     filename:
//         (process.env.LOG_PATH
//             ? process.env.LOG_PATH
//             : "." + config.get("logger.filePath")
//         ).concat(config.get("logger.fileName")) + "-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: false,
//     maxSize: "20m",
//     maxFiles: "30d",
//     prepend: true,
//     level: config.get("logger.level"),
//     format: combine(
//         format.errors({ stack: false }), // log the full stack
//         timestamp(), // get the time stamp part of the full log message
//         printf(({ level, message, timestamp }) => {
//             return `[${timestamp}] [${level}] ${
//                 process.env && process.env.NODE_ENV
//                     ? titleCase(process.env.NODE_ENV)
//                     : "Development"
//             } - ${JSON.stringify(message)}`;
//             // return JSON.stringify({ level, timestamp, message }, undefined, 4);
//         })
//     ),
// });

// transport.on("rotate", function (oldFilename, newFilename) {
//     // do something fun
// });

// const options = {
//     console: {
//         level: "trace",
//         prettyPrint: true,
//         colorize: true,
//         silent: false,
//         timestamp: true,
//     },
// };

// const logger = new createLogger({
//     transports: [transport, new transports.Console(options.console)],
//     exitOnError: false, // do not exit on handled exceptions
// });

// export default (fileName = "", loggedInUser = "") => {
//     const log = {
//         debug: (error) => {
//             let formattedLog;

//             if (error instanceof Error) {
//                 formattedLog = formatLogArguments(error, "debug");
//                 logger.debug(formattedLog);
//                 logToConsole(formattedLog.stack);
//             } else if (enableMethodException)
//                 throw new Error(
//                     `Please, provide your message using 'new Error(<YOUR_MESSAGE>)'.`
//                 );
//             else {
//                 logger.error(error);
//                 logToConsole(error);
//             }
//         },

//         info: (error) => {
//             let formattedLog;

//             if (error instanceof Error) {
//                 formattedLog = formatLogArguments(error, "Info");
//                 logger.info(formattedLog);
//                 logToConsole(formattedLog.stack);
//             } else if (enableMethodException)
//                 throw new Error(
//                     `Please, provide your message using 'new Error(<YOUR_MESSAGE>)'.`
//                 );
//             else {
//                 logger.info(error);
//                 logToConsole(error);
//             }
//         },

//         warn: (error) => {
//             let formattedLog;

//             if (error instanceof Error) {
//                 formattedLog = formatLogArguments(error, "Warn");
//                 logger.warn(formattedLog);
//                 logToConsole(formattedLog.stack);
//             } else if (enableMethodException)
//                 throw new Error(
//                     `Please, provide your message using 'new Error(<YOUR_MESSAGE>)'.`
//                 );
//             else {
//                 logger.warn(error);
//                 logToConsole(error);
//             }
//         },

//         /**
//          * @description logs error object
//          * @param {error} error
//          */
//         error: (error) => {
//             let formattedLog;

//             if (error instanceof Error) {
//                 formattedLog = formatLogArguments(error, "error");
//                 logger.error(formattedLog);
//                 logToConsole(error);
//             } else if (enableMethodException)
//                 throw new Error(
//                     `Please, provide your message using 'new Error(<YOUR_MESSAGE>)'.`
//                 );
//             else {
//                 logger.error(error);
//                 logToConsole(error);
//             }
//         },
//     };

//     return log;
// };

// /**
//  * Attempts to add file and line number info to the given log arguments.
//  */
// function formatLogArguments(error, callType = "Error", stackIndex = 0) {
//     // get call stack, and analyze it
//     // get all file, method, and line numbers
//     const stacklist = error.stack.split("\n").slice(1);
//     const errorInfo = `${
//         callType === "Info" || callType === "Warn" || callType === "Debug"
//             ? callType
//             : error.name
//     }: ${error.message}`;
//     const errorStack = [errorInfo, ...stacklist];

//     // stack trace format:
//     // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
//     // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
//     const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
//     const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

//     const s = stacklist[stackIndex] || stacklist[0];
//     const sp = stackReg.exec(s) || stackReg2.exec(s);

//     if (sp && sp.length === 5) {
//         return {
//             [callType.toLowerCase()]: errorInfo,
//             method: sp[1],
//             relativePath: relative(PROJECT_ROOT, sp[2]),
//             line: sp[3],
//             pos: sp[4],
//             file: basename(sp[2]),
//             stack: errorStack.join("\n"),
//         };
//     }
// }

// const logToConsole = (stack) => {
//     if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//         console.log(stack);
//     }
// };
