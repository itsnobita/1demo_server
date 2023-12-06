import Axios from "axios";
import config from "config";

const weatherAdapter = {
    getCurrent: async (param) => {
    return new Promise(async (resolve, reject) => {
      try {
        let currentUrl = `${config.get(
          "weather_api"
        )}/current.json?key=${config.get("weather_key")}&q=${param}&aqi=yes`;
        console.log(currentUrl);
        await Axios.get(currentUrl)
          .then((res) => {
            resolve({
              status: "success",
              statusCode: 200,
              result: res.data,
              error: null,
            });
          })
          .catch((error) => {
            reject({
              status: "failed",
              statusCode: 400,
              result: null,
              error: {
                code: 1006,
                message: "No matching location found.",
              },
            });
          });
      } catch (error) {
        delete error["config"];
        reject({
          status: "failed",
          statusCode: 500,
          result: null,
          error: error,
        });
      }
    });
    },
    getForecastByHour: async (param) => {
    return new Promise(async (resolve, reject) => {
      try {
        let forecastUrl = `${config.get(
          "weather_api"
        )}/forecast.json?key=${config.get(
          "weather_key"
        )}&q=${param}&days=3&aqi=yes&alerts=yes`;
        console.log(forecastUrl);
        await Axios.get(forecastUrl)
          .then((res) => {
            resolve({
              status: "success",
              statusCode: 200,
              result: res.data,
              error: null,
            });
          })
          .catch((error) => {
            reject({
              status: "failed",
              statusCode: 400,
              result: null,
              error: {
                code: 1006,
                message: "No matching location found.",
              },
            });
          });
      } catch (error) {
        delete error["config"];
        reject({
          status: "failed",
          statusCode: 500,
          result: null,
          error: error,
        });
      }
    });
    },
    getForecastByDay: async (param) => {
    return new Promise(async (resolve, reject) => {
      try {
        let forecastUrl = `${config.get(
          "weather_api"
        )}/forecast.json?key=${config.get(
          "weather_key"
        )}&q=${param}&days=3&aqi=yes&alerts=yes`;
        console.log(forecastUrl);
        await Axios.get(forecastUrl)
          .then((res) => {
            let r = res.data;
            r.forecast.forecastday.map((day) => {
              delete day.hour;
            });
            resolve({
              status: "success",
              statusCode: 200,
              result: r,
              error: null,
            });
          })
          .catch((error) => {
            reject({
              status: "failed",
              statusCode: 400,
              result: null,
              error: {
                code: 1006,
                message: "No matching location found.",
              },
            });
          });
      } catch (error) {
        delete error["config"];
        reject({
          status: "failed",
          statusCode: 500,
          result: null,
          error: error,
        });
      }
    });
    },
    getSearch: async (param) => {
    return new Promise(async (resolve, reject) => {
      try {
        let searchUrl = `${config.get(
          "weather_api"
        )}/search.json?key=${config.get("weather_key")}&q=${param}`;
        console.log(searchUrl);
        await Axios.get(searchUrl)
          .then((res) => {
            resolve({
              status: "success",
              statusCode: 200,
              result: res.data,
              error: null,
            });
          })
          .catch((error) => {
            reject({
              status: "failed",
              statusCode: 400,
              result: null,
              error: {
                code: 1006,
                message: "No matching location found.",
              },
            });
          });
      } catch (error) {
        delete error["config"];
        reject({
          status: "failed",
          statusCode: 500,
          result: null,
          error: error,
        });
      }
    });
    },
    
};
export default weatherAdapter;
