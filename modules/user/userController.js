import express from "express";
import mongoose from "mongoose";
import messages from "../../dao/mongodb/schemas/messages";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  let db = await mongoose.model("user_details").create(req.body);
  res.send(db);
});

router.post("/msg", async (req, res) => {
    let {from,to,message}=req.body
  let obj = {
    Users: [req.body.from, req.body.to],
    messages: [
      {
        message: req.body.message,
        sender: req.body.from,
      },
    ],
    };
    let atob = from + "_" + to
    let btoa = to+"_"+from
  console.log(obj);
  let db = await mongoose.model("new_message").findOneAndUpdate(
    {
      atob:{$in:[atob,btoa]}
    },
      {
          atob: atob,
          btoa:btoa,
      $push: {
        messages: {
          message: req.body.message,
              sender: req.body.from,
          time:new Date()
        },
      },
      }, {
        upsert: true,
        new:true
    }
    );
    console.log(db)
  res.send(db);
});
// router.get("/msg", async (req, res) => {
//     // let obj = {
//     //     Users:[req.body.from,req.body.to],
//     //     messages: [
//     //       {
//     //     message: req.body.message,
//     //       sender: req.body.from
//     //       }
//     //     ]
//     // }
//     // console.log(obj)
//     let db = await mongoose.model("new_message").find({
//         users: {
//           $all: [req.body.from, req.body.to],
//         },
//       })
//     res.send(db)
// })

module.exports = router;
