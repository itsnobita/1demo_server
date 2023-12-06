import  messagesDao  from "./dao"
export const saveMessage = async (obj) => {
    try {
        let result = await messagesDao.saveMessage(obj)
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