class APIRoutes {
    constructor(app) {
        this.app = app;
        this.try = require("./modules/try/tryController");
        this.weather = require("./modules/weather/weatherController")
        this.sendmemsg = require("./modules/sendMeMessages/sendController")
        this.userDetails = require("./modules/user/userController")
        this.screenshot = require("./modules/screenshot/screenshotController")
        this.shared = require("./modules/shared/SharedController")
        this.addMessage = require("./modules/addMessage/addMessageController")
    }

    routes = (apiBasePath) => {
        this.app.use(`${apiBasePath}/try`, this.try);
        this.app.use(`${apiBasePath}/weather`, this.weather);
        this.app.use(`${apiBasePath}/sendmemsg`, this.sendmemsg)
        this.app.use(`${apiBasePath}/usr`, this.userDetails)
        this.app.use(`${apiBasePath}/ss`, this.screenshot)
        this.app.use(`${apiBasePath}/shared`, this.shared)
        this.app.use(`${apiBasePath}/addmsg`, this.addMessage)
    };
}

export default APIRoutes;
