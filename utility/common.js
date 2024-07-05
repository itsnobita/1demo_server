const uniqueWithCount = (elmList) => {
    let elmObj = {};
    let elmListWithCount = [];
    elmList.forEach((elm) => {
        elmObj[elm] = (elmObj[elm] || 0) + 1;
    });

    Object.entries(elmObj).forEach(([key, val]) => {
        elmListWithCount.push(`${key} (${val})`);
    });

    return elmListWithCount;
};

const argv = key => {
    // Return true if the key exists and a value is defined
    if ( process.argv.includes( `--${ key }` ) ) return true;
    const value = process.argv.find( element => element.startsWith( `--${ key }=` ) );
    // Return null if the key does not exist and a value is not defined
    if ( !value ) return null;
    return value.replace( `--${ key }=` , '' );
}

/**
 * @description This method is used to encode special characters using escape
 * function of javascript
 * @param {*} str
 * @returns encoded string
 */
const encodeStr = (str) => {
    return str ? escape(JSON.stringify(str)) : "";
};

/**
 * @description This method is used to decode special characters using unescape
 * function of javascript
 * @param {*} str
 * @returns
 */
const decodeStr = (str) => {
    let _decodedStr = "";
    if (str) {
        const wasProbablyEscaped = /%\d\d/.test(str);
        _decodedStr = wasProbablyEscaped ? JSON.parse(unescape(str)) : str;
    }
    return _decodedStr;
};

/**
 * @description This method is used to format deadline string
 * @param {*} deadline
 * @returns
 */
const formatDeadline = (deadline) => {
    let _deadline = "";
    // console.log("CHECK FOR DEADLINE STRINGTYPE====>", typeof deadline);
    deadline = typeof deadline === "string" ? deadline : `${deadline}`;
    if (deadline) {
        _deadline = `${deadline
            .replace("T", " ")
            .replace("-08:00", " ")
            .replace("-07:00", " ")} PDT`;
    }
    return _deadline;
};

/**
 * @description This utility method is used to convert object key in small and upper case
 * @param {string} _case - either small or upper case
 * @param {object} obj - {key, value}
 * @returns
 */
const switchSmallUpperCaseToKey = (_case, obj = {}) => {
    const newObj = {};
    const keys = Object.keys(obj);
    if (keys.length > 0) {
        keys.forEach((key) => {
            newObj[_case === "upper" ? key.toUpperCase() : key.toLowerCase()] =
                obj[key];
        });
    }
    return newObj;
};

/**
 * @description This responseHandler method is used to process
 * response object and send the result using express response object
 * @param {object} expressResponse - express's response object
 * @param {object} response - service's response object
 * i.e {status: string, statusCode: number, result: object}
 */
const responseHandler = (expressResponse, response) => {
    const {
        status = "success",
        statusCode = 200,
        code = 200,
        result = null,
    } = response;
    expressResponse.status(statusCode || code).send({ status, result });
};

/**
 * This function is used to convert a string into Title Case i.e: "Heading title" to "Heading Title"
 * @param {string} str
 * @returns
 */
const titleCase = (str) => {
    if (str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    } else {
        return str;
    }
};

/**
 * @description This method is used to create data set for filter list.
 * @param {object} objFilterDataSet - placeholder object for filter key and their respective array
 * @param {array} results - result array for which we want to create filter
 * @param {array} headerArray - array of header objects that holds all the config if filter will be applied or not
 * on specific key.
 * @returns Promise that has filter data set
 */
const createFilterListPriorDataSet = async (
    objFilterDataSet,
    results,
    headerArray
) => {
    headerArray &&
        headerArray.length > 0 &&
        headerArray.forEach((entity) => {
            objFilterDataSet[entity.key] = [];
            objFilterDataSet[`${entity.key}_ARRAY`] = [];
        });

    results &&
        results.length > 0 &&
        results.forEach((scrubber) => {
            headerArray &&
                headerArray.length > 0 &&
                headerArray.forEach((entity) => {
                    if (entity.filter) {
                        switch (entity.key) {
                            case "DE-priority":
                                break;
                            default:
                                objFilterDataSet[`${entity.key}_ARRAY`].push(
                                    setNoneIfBlank(scrubber[entity.key])
                                );
                                break;
                        }
                    }
                });
        });

    headerArray &&
        headerArray.length > 0 &&
        headerArray.forEach((entity) => {
            if (entity.filter) {
                objFilterDataSet[entity.key].push(
                    ...uniqueWithCount(
                        objFilterDataSet[`${entity.key}_ARRAY`].sort()
                    )
                );
            }
        });

    return objFilterDataSet;
};

/**
 * @description This method creates filter list for headers
 * @param {object} filterObj - filter object on which basis filter needs to be created
 * @param {array} headers - array which is used to create filter list object
 * @param {array} sourceObj - array which is used as source to get values
 * @returns filter list object on the basis of header
 */
const createFilterList = (filterObj, headers, sourceObj) => {
    // console.log("source object ===========> ", sourceObj);
    const filterList = {};
    headers &&
        headers.length > 0 &&
        headers.forEach((entity) => {
            if (entity.filter)
                filterList[entity.key] = createFilterObject(
                    sourceObj[entity.key],
                    filterObj[entity.key]
                );
        });
    return filterList;
};

const createFilterObject = (Value, selected) => {
    return {
        allValues: Value,
        selected: selected ? [selected] : [],
    };
};

/**
 * @description This method handles the undefined or null value
 * and assigned passed placeholder value
 * @param {string} value - value that needs to be checked and replaced
 * with placeholder value if condition falsy
 * @param {string} placeholderValue - placeholderValue that will replace
 * the value in case of condition is falsy
 * @returns value that is replaced with placeholder value
 */
const setNoneIfBlank = (value, placeholderValue = "-") => {
    return value ? value : placeholderValue;
};

const createBugArraysList = (bugids = [], bugArrayList = [], count = 100) => {
    let _bugIds = JSON.parse(JSON.stringify(bugids));
    if (_bugIds.length > count) {
        bugArrayList.push(_bugIds.splice(0, count));
        createBugArraysList(_bugIds, bugArrayList, count);
    } else {
        bugArrayList.push(_bugIds);
    }

    return bugArrayList;
};

const childError = (data) => {
    if (data && data.error && !data.error.stack) {
        return childError(data.error.stack ? data.error.stack : data.error);
    } else {
        return data;
    }
};

const dateRange = (startDate, endDate) => {
    var start = startDate.split("/");
    var end = endDate.split("/");
    var startYear = parseInt(start[1]);
    var endYear = parseInt(end[1]);
    var mYArr = [];

    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[0]) - 1;
      var startMon = i === startYear ? parseInt(start[0]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        mYArr.push({ month: month, year: i });
      }
    }
    return mYArr;
  };

/**
 * @descriptin This method is used to sort object key wise
 * @param {object} obj : sort object {key: value | array | object} key wise in ascending order
 * @returns sorted key wise object
 */
const sortObjKeyWise = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((accumulator, key) => {
            accumulator[key] = obj[key];

            return accumulator;
        }, {});
};

const chunkArray = (_cecIds, batchLimit) => {
    const cecidsBatch = [];
    let startIndex = 0,
        endIndex = batchLimit;

    const iterationCount = Math.ceil(_cecIds.length / batchLimit);

    for (let i = 0; i < iterationCount; i++) {
        startIndex = i * batchLimit;
        endIndex = (i + 1) * batchLimit;
        cecidsBatch.push(_cecIds.slice(startIndex, endIndex));
    }
    return cecidsBatch;
};

/**
 * @description This method is used to delay the execution.
 * @param {*} ms - milliseconds
 * @returns
 */
const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const mapRowsMetaData = (metadata, rows) => {
    let result = [];
    rows &&
        rows.forEach((row) => {
            let obj = {};

            for (let i = 0; i < row.length; i++) {
                obj[metadata[i].name] = row[i];
            }

            result.push(obj);
        });

    return result;
};

const getFormattedDate =(date) => {
    let month = format(date.getMonth() + 1);
    let day = format(date.getDate());
    let year = format(date.getFullYear());
    return month + "/" + day + "/" + year;
};

const parseCookieString = (str) => {
    return str.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=').map(item => item.trim());
      acc[key] = value;
      return acc;
    }, {});
  };

export {
    argv,
    encodeStr,
    decodeStr,
    formatDeadline,
    switchSmallUpperCaseToKey,
    responseHandler,
    titleCase,
    createFilterList,
    createFilterListPriorDataSet,
    createBugArraysList,
    childError,
    dateRange,
    sortObjKeyWise,
    chunkArray,
    sleep,
    uniqueWithCount,
    mapRowsMetaData,
    getFormattedDate,
    parseCookieString
};
