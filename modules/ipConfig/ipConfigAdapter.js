import Axios from "axios";
import config from "config";
import dotenv from "dotenv";

dotenv.config();

const ipConfigAdapter = {
    getData: async (ip) => {
    return new Promise(async (resolve, reject) => {
      try {
        let searchUrl = `${config.get(
          "ip_api"
        )}/${ip}?api-key=${process.env.IPDATA_TOKEN}`;
        console.log(searchUrl);
          let ipData = await Axios.get(searchUrl);
            resolve({
              status: "success",
              statusCode: 200,
              result: ipData.data,
              error: null,
            });
      } catch (error) {
        resolve({
          status: "failed",
          statusCode: 500,
          result: null,
          error: error,
        });
      }
    });
    },
    
};
export default ipConfigAdapter;