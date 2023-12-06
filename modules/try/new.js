
import MDBConnection from "../../dao/mongodb/connection/MDBConnection";
import { dbProperty } from "../../utility/read-properties";

const sum = async () => {
    let pid = process.pid
    console.log(pid)
    let a = 0, b = 0;
    let dataa;
    process.on("message", (data) => {
        console.log(data)
        dataa=data
       
    })
    return new Promise(async (resolve, reject) => {
        await MDBConnection.get()
        resolve({ sum: { ...dataa, sum: parseInt(dataa.a) + parseInt(dataa.b) },pid:pid.toString() });
    })
    // return a+b
};
// return sum()

// process.send({sum:sum()})
(async () => {
    await sum().then(r => {
        console.log(r)
        process.send(r)
        process.exit(0);
    }
    ).catch(e => {
        console.log(e)
    })
})();