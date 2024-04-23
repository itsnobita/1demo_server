import messagesDao from "./dao"
export const saveMessage = async (obj, headers) => {
    try {
        let result = await messagesDao.saveMessage({ ...obj, ...headers })
        return result;
    } catch (error) {
        throw error
    }
}

export const getMessages = async () => {
    try {
        let result = await messagesDao.getMessages()
        return result;
    } catch (error) {
        throw error
    }
}