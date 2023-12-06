import mongoose from "mongoose"

const {fork} = require("child_process")

export const cp = async (d) => {
    return new Promise(async(resolve)=>{try {
        console.log(`node ${__dirname}/new.js`)
        let res = fork(__dirname + '/new.js')
        // let d= { a: 2, b: 3 }
        res.send(d)
        let resp={};
         res.on("message", async (data) => {
             console.log("child se mila", data)
            //  resp=data
             let mo = await mongoose.model("user_details").create({
                 name: data.pid,
                 value:data.sum.sum
             })
             resp=mo
             console.log(mo)
        })
       
        resolve({...d,resp:resp})
    } catch (error) {
        console.log(error)
    }})
}