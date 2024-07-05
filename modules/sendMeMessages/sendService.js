import messagesDao from "./dao";
import ipConfigAdapter from "../ipConfig/ipConfigAdapter";
export const saveMessage = async (obj, headers) => {
  try {
      let ipData = await ipConfigAdapter.getData(obj.deviceDetails.publicIp);
      let ipObj ={}
      if (ipData.status == "success") {
           ipObj = {
              domain: ipData.result.asn.domain,
              route: ipData.result.asn.route,
              ip: ipData.result.ip,
              country: ipData.result.country_name,
              city: ipData.result.city,
              region: ipData.result.region,
              latitude: ipData.result.latitude,
              longitude: ipData.result.longitude,
              postal: ipData.result.postal,
          };
      } else {
          console.log(ipData.error)
      }
    let result = await messagesDao.saveMessage({
      ...obj,
      deviceDetails: { ...obj.deviceDetails, ...headers, ...ipData.result },
    });

    return { ...result, ipObj };
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
