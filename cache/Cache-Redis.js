/**
 * @description This class provides services related to Redis
 */
import config from "config";
import dotenv from "dotenv";
dotenv.config();
const redisUrl = process.env.REDIS_URL
// || config.get("redis-url");
const async = require("async");
let isRedisConnected = false;

const client = require("redis").createClient(redisUrl);
const { promisify } = require("util");

client.on("connect", () => {
    isRedisConnected = true;
    console.log("Redis client connected")
});

client.on("error", (error) => {
    isRedisConnected = false;
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expAsync = promisify(client.expire).bind(client);
const delAsync = promisify(client.del).bind(client);
const flushAll = promisify(client.flushall).bind(client);

const delWildCardAsync = async (key, callback = () => { }) => {
    key = key ? "*" + key + "*" : key;
    client.keys(key, (err, rows) => {
        async.each(
            rows,
            (row, callbackDelete) => {
                client.del(row, callbackDelete);
            },
            callback
        );
    });
};


/**
 *
 * @param {*} process
 * @param {*} keyIdentifier
 * @param {*} key
 * @param {*} dataset
 * @returns
 */
const redisData = async (
    process,
    keyIdentifier,
    dataset = undefined,
    expiry = 0
) => {
    let response;
    return new Promise(async (resolve, reject) => {
        try {
            if (process === "get") {
                response = isRedisConnected
                    ? JSON.parse(await getAsync(`${keyIdentifier}`))
                    : [];
            } else if (process === "set") {
                response = isRedisConnected
                    ? await setAsync(
                        `${keyIdentifier}`,
                        JSON.stringify(dataset)
                    )
                    : [];

                if (expiry > 0) {
                    isRedisConnected &&
                        (await expAsync(`${keyIdentifier}`, expiry));
                }
            } else {
                isRedisConnected && (await delAsync(`${keyIdentifier}`));
                response = "Data cleared";
            }
            resolve({
                status: "success",
                data: response,
            });
        } catch (err) {
            const msg = "Error in RedisData ::" + err.message;
            reject({
                status: "failed",
                result: msg,
            });
        }
    });
};

export {
    isRedisConnected,
    getAsync,
    setAsync,
    expAsync,
    delAsync,
    flushAll,
    delWildCardAsync,
    redisData,
};
