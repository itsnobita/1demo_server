class APIRoutes {
    constructor(app) {
        this.app = app;
        this.try = require("./modules/try/tryController");
        this.weather=require("./modules/weather/weatherController")
        
    }

    routes = (apiBasePath) => {
        this.app.use(`${apiBasePath}/try`, this.try);
        this.app.use(`${apiBasePath}/weather`, this.weather);
    };
}

export default APIRoutes;
