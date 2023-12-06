// "use strict";
// import handlebars from "handlebars";
// import nodemailer from "nodemailer";
// import config from "config";
// import log from "./logger";
// import readFile from "./read-file";

// const logger = log(__filename);
// const ABSOLUTE_PATH = process.env.NODE_ENV
//   ? ""
//   : "." + config.get("absolute_path.source_dir");

// let transportConfig = config.get("mailer.transport");

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport(transportConfig);

// // setup email data with unicode symbols
// let mailDefaultOptions = {
//   from: config.get("mailer.options.from"), // sender address
//   to: config.get("mailer.options.to"), // list of receivers
//   subject: config.get("env") + ": Email Notification", // Subject line
//   html: "", // html body
// };

// if (config.get("mailer.options.cc"))
//   mailDefaultOptions.cc = config.get("mailer.options.cc");
// if (config.get("mailer.options.bcc"))
//   mailDefaultOptions.bcc = config.get("mailer.options.bcc");

// const sendMail = async (mailOptions) => {
//   if(!mailOptions.noAttachment){
//   mailOptions["attachments"] = [{
//     filename: "image1.svg",
//     path: ABSOLUTE_PATH + "email-templates/img/program-initiated.svg",
//     cid: "initiated",
//   }];
//    //console.log("mailOptions=====", mailOptions);
//   //    console.log('absolute----',ABSOLUTE_PATH);
//   if (mailOptions.awaiting_approval) {
//     console.log("admin")
//     mailOptions["attachments"].push({
//       filename: "image7.svg",
//       path: ABSOLUTE_PATH + "email-templates/img/program-approval-blue.svg",
//       cid: "approval-blue",
//     })
//   } else {
//     console.log("submitter")
//     mailOptions["attachments"].push({
//       filename: "image5.svg",
//       path: ABSOLUTE_PATH + "email-templates/img/program-approval-grey.svg",
//       cid: "approval-grey",
//     })   
//   }
//   if(mailOptions.autocomplete){
//     mailOptions["attachments"].push({
//       filename: "image8.svg",
//       path: ABSOLUTE_PATH + "email-templates/img/program-completed-blue.svg",
//       cid: "completed-blue",
//     })
//   }
//   else{
//     mailOptions["attachments"].push({
//       filename: "image6.svg",
//       path: ABSOLUTE_PATH + "email-templates/img/program-completed-grey.svg",
//       cid: "completed-grey",
//     })
//   }
//   }
//   else{
//     mailOptions["attachments"] = [];
//   }
//   return new Promise(async (resolve, reject) => {
//     mailOptions = Object.assign({}, mailDefaultOptions, mailOptions);
//     // send mail with defined transport object
//     if (mailOptions && mailOptions.templatePath) {
//       // console.log("Template path===>", mailOptions.templatePath);
//       mailOptions.html = await mailTemplate(
//         mailOptions.templatePath,
//         mailOptions.replacements
//       );
//     }
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("error===>>", error);
//         logger.error("Error sendMail: ", error);
//         reject(false);
//       }
//       logger.debug("Message %s sent: %s");
//       resolve(true);
//     });
//   });
// };

// const mailTemplate = async (templatePath, replacements = {}) => {
//   let htmlTemplate = "";
//   // console.log("replacements===>", replacements);
//   await readFile(ABSOLUTE_PATH + `${templatePath}`, async (err, html) => {
//     // console.log("replacements===>", replacements);
//     // console.log("HTML+++>", html);
//     let template = handlebars.compile(html);
//     htmlTemplate = template(replacements);
//     // mailOption["html"] = htmlTemplate;
//   });
//   return htmlTemplate;
// };

// export default sendMail;
