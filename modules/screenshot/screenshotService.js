import screenshotDao from "./dao";


const screenshotService = {
    setScreenshot: async (obj) => {
        try {
            const ss = await screenshotDao.setScreenshot(obj);
            return ss;
        } catch (error) {
            throw error;
        }
    },
    getScreenshot: async (id, obj = {}) => {
        try {
            const ss = await screenshotDao.getScreenshot(id);
            const viewer = await screenshotDao.updateViewer({ id: id, ...obj })
            return ss;
        } catch (error) {
            throw error;
        }
    },
    getScreenshotAll: async () => {
        try {
            const ss = await screenshotDao.getScreenshotAll();
            return ss;
        } catch (error) {
            throw error;
        }
    },
    getViewers: async (id) => {
        try {
            const viewers = await screenshotDao.getViewers(id)
            return viewers
        } catch (error) {
            throw error
        }
    }
}

export default screenshotService;