const propertiesReader = require("properties-reader");
import config from "config";
// const ABSOLUTE_PATH =
//     (process.env.NODE_ENV ? "" : ".") + config.get("absolute_path.source_dir");
// console.log("ABS PATH " + ABSOLUTE_PATH);
// console.log(
//     "Full PATH :" + ABSOLUTE_PATH + "configuration/dbConnection.properties"
// );

var dbProperties = propertiesReader("configuration/dbConnection.properties");
var mailerProperties = propertiesReader("configuration/mailer.properties");
var externalProperties = propertiesReader("configuration/external.properties");
var cronProperties = propertiesReader("configuration/cron.properties");
var projectProperties = propertiesReader("configuration/project.properties");
var whitelistProperties = propertiesReader(
    "configuration/whitelist.properties"
);

const dbProperty = (name) => {
    let connectionString,
        username = "",
        password = "",
        dbtype = "",
        type = "",
        host = "",
        port = "",
        sid = "",
        service = "";
 if (name === "mongoDB") {
        dbtype = dbProperties.get("appDBMongo.dbtype");
        service = process.env.mongoDB;
            // dbProperties.get("appDBMongo.connectionString");
    } else {
    }

     if (dbtype === "mongo") {
        connectionString = service;
    } else {
    }

    return connectionString;
};

const mailProperty = (type) => {
    let report_email,
        fromdata = "",
        todata = "",
        ccdata = "",
        bccdata = "";

    // if (type === "report") {
    //     fromdata = mailerProperties.get("report_email.from");
    //     todata = mailerProperties.get("report_email.to");
    //     ccdata = mailerProperties.get("report_email.cc");
    //     bccdata = mailerProperties.get("report_email.bcc");
    // } else if (type === "failover") {
    //     fromdata = mailerProperties.get("failover_email.from");
    //     todata = mailerProperties.get("failover_email.to");
    //     ccdata = mailerProperties.get("failover_email.cc");
    //     bccdata = mailerProperties.get("failover_email.bcc");
    // } else if (type === "failover_stakeholder") {
    //     fromdata = mailerProperties.get("failover_email_stakeholder.from");
    //     todata = mailerProperties.get("failover_email_stakeholder.to");
    //     ccdata = mailerProperties.get("failover_email_stakeholder.cc");
    //     bccdata = mailerProperties.get("failover_email_stakeholder.bcc");
    // } else {
    // }

    fromdata = mailerProperties.get("qpc_email.from");
    todata = mailerProperties.get("qpc_email.to");
    ccdata = mailerProperties.get("qpc_email.cc");
    bccdata = mailerProperties.get("qpc_email.bcc");
    report_email = { from: fromdata, to: todata, cc: ccdata, bcc: bccdata };
    // console.log("REPORT MAIL " + JSON.stringify(report_email));
    return report_email;
};

const hrmsProperty = () => {
    let hrms,
        url = "",
        user_name = "",
        password = "";

    url = externalProperties.get("hrms.url");
    user_name = externalProperties.get("hrms.user_name");
    password = externalProperties.get("hrms.password");

    hrms = { url: url, user_name: user_name, password: password };

    return hrms;
};

// rChain.oAuthUrl = https://cloudsso.cisco.com/as/token.oauth2
// rChain.baseUrl = https://scripts.cisco.com/orgstats/api/1/org?users=*
// rChain.tailUrl = &escChain=false
// rChain.user_name = nostgusr
// rChain.password = IBNG10!ops
// rChain.client_id = csgbi-client
// rChain.client_secret = csgbi-client-123
const rchainProperty = () => {
    let rchainApi,
        oAuthUrl = "",
        baseUrl = "",
        tailUrl = "",
        user_name = "",
        password = "",
        client_id = "",
        client_secret = "";

    oAuthUrl = externalProperties.get("rChain.oAuthUrl");
    user_name = externalProperties.get("rChain.user_name");
    password = externalProperties.get("rChain.password");
    baseUrl = externalProperties.get("rChain.baseUrl");
    client_id = externalProperties.get("rChain.client_id");
    client_secret = externalProperties.get("rChain.client_secret");
    tailUrl = externalProperties.get("rChain.tailUrl");

    rchainApi = {
        user_name: user_name,
        password: password,
        oAuthUrl: oAuthUrl,
        baseUrl: baseUrl,
        client_id: client_id,
        client_secret: client_secret,
        tailUrl: tailUrl,
    };

    return rchainApi;
};

const jiraProperty = () => {
  let jira,
    url = "",
    user_name = "",
    password = "",
    token = "",
    project_id = "",
    project_key = "",
    issue_id = "",
    api = "",
    type = "",
    tech_area = "",
    qpc_id = "",
    bse = "",
    be = "",
    executive_sponsor = "",
    qpc_object_id = "",
    aha_platform = "",
    qpc_ref = "",
    program_class = "",
    user_search_url = "",
    clarity_id = "";

    url = externalProperties.get("jira.url");
    user_name = externalProperties.get("jira.user_name");
    password = externalProperties.get("jira.password");
    api = externalProperties.get("jira.api");
    token = externalProperties.get("jira.token");
    project_id = externalProperties.get("jira.project_id");
    project_key = externalProperties.get("jira.project_key");
    issue_id = externalProperties.get("jira.issue_id");
    type = externalProperties.get("jira.type");
    tech_area = externalProperties.get("jira.tech_area");
    qpc_id = externalProperties.get("jira.qpc_id");
    bse = externalProperties.get("jira.bse");
    qpc_ref = externalProperties.get("jira.qpc_ref");
    be = externalProperties.get("jira.be");
    executive_sponsor = externalProperties.get("jira.executive_sponsor");
    qpc_object_id = externalProperties.get("jira.qpc_object_id");
    aha_platform = externalProperties.get("jira.aha_platform");
    program_class = externalProperties.get("jira.program_class");
  user_search_url = externalProperties.get("jira.user_search_url");
  clarity_id=externalProperties.get('jira.clarity_id');

    jira = {
        url: url,
        user_name: user_name,
        password: password,
        api: api,
        token: token,
        project_id: project_id,
        project_key: project_key,
        issue_id: issue_id,
        type: type,
        tech_area: tech_area,
        qpc_id: qpc_id,
        bse: bse,
        qpc_ref: qpc_ref,
        be: be,
        executive_sponsor: executive_sponsor,
        qpc_object_id: qpc_object_id,
        aha_platform: aha_platform,
        program_class: program_class,
      user_search_url: user_search_url,
        clarity_id:clarity_id,
    };

    return jira;
};

const platformProperty = () => {
    let platformApi,
        url = "";
    url = externalProperties.get("platformApi.url");
    platformApi = { url: url };

    return platformApi;
};

const kafakaProperty = () => {
    let logEnable, kafaka;
    // url = "",
    // username = "",
    // password = "";
    logEnable = externalProperties.get("kafaka.logEnable") ? true : false;
    kafaka = { logEnable: logEnable };
    return kafaka;
};

const cronProperty = () => {
    return {
        cron_pin_org_group_name_job: cronProperties.get(
            "cron_pin_org_group_name_job"
        ),
        cron_pin_org_group_name_job_incremental: cronProperties.get(
            "cron_pin_org_group_name_job_incremental"
        ),
        cron_pin_org_group_name_job_complete: cronProperties.get(
            "cron_pin_org_group_name_job_complete"
        ),
        cron_rs_qpc_product_platform: cronProperties.get(
            "cron_rs_qpc_product_platform"
        ),
        daysBeforeLastGroupNameSync: cronProperties.get(
            "daysBeforeLastGroupNameSync"
        ), // through complete or incremental load only
        pinOrgGroupNameCronJobName: cronProperties.get(
            "pinOrgGroupNameCronJobName"
        ),
        pinOrgCollectionName: cronProperties.get("pinOrgCollectionName"),
        cronHistoryCollecName: cronProperties.get("cronHistoryCollecName"),
        pinOrgCollectionBkpName: cronProperties.get("pinOrgCollectionBkpName"),
        cronQpcProductPlatform: cronProperties.get("cronQpcProductPlatform"),
    };
};

const grafanaProperty = () => {
    let grafana,
        source = "",
        event = "",
        audit_trail = "";

    source = projectProperties.get("grafana.source");
    event = projectProperties.get("grafana.event");
    audit_trail = projectProperties.get("grafana.audit_trail");

    grafana = { source: source, event: event, audit_trail: audit_trail };

    return grafana;
};

const projectProperty = () => {
    let applicationUrl = projectProperties.get("applicationUrl");
    let appProperties = { applicationUrl: applicationUrl };

    return appProperties;
};

const deptToPinAPI = () => {
    let api = externalProperties.get("dept.api");
    console.log(api);
    return api;
};

const qpcIdProperty = () => {
    let id = externalProperties.get("qpc.id");
    let qpc = { id: id };
    return qpc;
};

const whitelistDomainsProperty = () => {
    let whitelistDomains = "";

    whitelistDomains = whitelistProperties.get("whitelist-domain");

    return whitelistDomains;
};

export {
    dbProperty,
    hrmsProperty,
    jiraProperty,
    kafakaProperty,
    cronProperty,
    rchainProperty,
    grafanaProperty,
    projectProperty,
    deptToPinAPI,
    platformProperty,
    mailProperty,
    qpcIdProperty,
    whitelistDomainsProperty,
};
