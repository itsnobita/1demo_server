import fs from "fs";

const readFile = async (path, callback) => {
    return new Promise(async (resolve) => {
        fs.readFile(path, { encoding: "utf-8" }, async (err, html) => {
            if (err) {
                if (callback) {
                    await callback(err);
                    resolve(false);
                }
                throw err;
            } else {
                await callback(null, html);
                resolve(true);
            }
        });
    });
};

export default readFile;
