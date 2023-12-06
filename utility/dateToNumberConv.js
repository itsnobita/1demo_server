import moment from "moment-timezone";
const dateToNumberConv = (value, format = undefined) => {
    // console.log("DB VALUE===>", value, format);

    return format
        ? moment(value, format).tz("America/Los_Angeles").valueOf()
        : moment(value).tz("America/Los_Angeles").valueOf();
};

export { dateToNumberConv };
