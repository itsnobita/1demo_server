import express from "express";
import {  numCheck } from "../../helper/middilewares";
import { cp } from "./tryService";

const router = express.Router();



router.get("/1", async(req, res) => {
    console.log("in try /1")
    console.log(req.query)
    let r = await cp(req.query)
    // console.log(JSON.stringify(r))
    res.send([r])
    // res.send({

    //     route: req.route,
    //     body: req.body,
    //     params: req.params,
    //     baseUrl: req.baseUrl,
    //     _parseUrl: req._parseUrl,
    //     rawHeaders: req.rawHeaders,
    //     headers: req.headers,
    //     navigator: req.navigator,
    //     remoteAddress: req.socket.remoteAddress,
    //     localAddress: req.socket.localAddress,
    //     ip: req.ip,
    
    
    // })
});

router.get("/1/:num",numCheck, (req, res) => {
    console.log("in try /1/num")
    // console.log(req)
    res.send({
        route: req.route,
        body: req.body,
        params: req.params,
        baseUrl: req.baseUrl,
        _parseUrl: req._parseUrl,
        rawHeaders: req.rawHeaders,
        headers: req.headers,
        navigator: req.navigator,
        remoteAddress: req.socket.remoteAddress,
        localAddress:req.socket.localAddress
    
    
    })
})




module.exports = router;