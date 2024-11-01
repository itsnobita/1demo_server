import messagesDao from "./dao";
import ipConfigAdapter from "../ipConfig/ipConfigAdapter";
export const saveMessage = async (obj, headers) => {
    try {
      let finalData={
        ...obj,
        deviceDetails: { ...obj.deviceDetails, ...headers,  },
      }
      console.log(`Data of message sending me message ${JSON.stringify(finalData)}`)
      let ipData = await ipConfigAdapter.getData(finalData.deviceDetails["cf-connecting-ip"]);
      let ipObj ={}
      if (ipData.status == "success") {
        if (ipData.result) {
          ipObj = ipData.result
        }
          finalData={...finalData,...ipObj}
      } else {
          console.log("Error in ipdata fetching")
      }
    let result = await messagesDao.saveMessage(finalData);

    return { ...result };
  } catch (error) {
    throw error;
  }
};

export const getMessages = async () => {
  try {
    let result = await messagesDao.getMessages();
    return result;
  } catch (error) {
    throw error;
  }
};
