const CustomRegex = {
    mongoObjectIdStringRegex : /([0-9]+([a-z]+[0-9]+)+)/i,
    // month/year like 08/2012 or 11/2022, 0 need to appended for test
    dtRegex : /((0[1-9])|(1[0-2]))\/((2[0-2])|(0[0-1])|(0[0-9])|(0[0-9]))/i,
    cec_idRegex : /[a-z0-9]+/i
}

export default CustomRegex;