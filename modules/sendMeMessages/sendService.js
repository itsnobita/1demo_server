import  messagesDao  from "./dao"
export const saveMessage = async (obj) => {
    try {
        let result = await messagesDao.saveMessage(obj)
        return result;
    } catch (error) {
        throw error
    }
}