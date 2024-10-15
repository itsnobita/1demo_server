import addMessageDao from "./dao";
export const saveMessage = async (obj) => {
    try {
      
    let result = await addMessageDao.saveMessage(obj);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (name,headers) => {
  try {
    let result = await addMessageDao.getMessages(name,headers);
    return result;
  } catch (error) {
    throw error;
  }
};
