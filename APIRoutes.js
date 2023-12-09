class APIRoutes {
    constructor(app) {
        this.app = app;
        this.try = require("./modules/try/tryController");
        this.weather = require("./modules/weather/weatherController")
        this.sendmemsg = require("./modules/sendMeMessages/sendController")
        this.userDetails = require("./modules/user/userController")
        
    }

    routes = (apiBasePath) => {
        this.app.use(`${apiBasePath}/try`, this.try);
        this.app.use(`${apiBasePath}/weather`, this.weather);
        this.app.use(`${apiBasePath}/sendmemsg`, this.sendmemsg)
        this.app.use(`${apiBasePath}/usr`, this.userDetails)
    };
}

export default APIRoutes;
