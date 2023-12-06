
let users = [
    "navgoyal",
    "mismailm"
]

let userSockets={}

const init = (server) => {
    let io = require("socket.io")(server)
    console.log("in socket")
    
    userSockets[users[0]] = io.of(`/${users[0]}`)
    userSockets[users[1]] = io.of(`/${users[1]}`)

    userSockets[users[0]].on("connection", (client) => {
        

        client.send(users[0])

        client.on("data", (data) => {
            userSockets[users[0]].emit("data",data)
        })

        client.on("mouse", (data) => {
            client.broadcast.emit("mouse",data)
        })

        
        // client.on("msg")

        userSockets[users[0]].on("disconnect", () => {
            console.log(users[0]+" disconnected")
        })

    })

    io.on("connection", (client) => {

        // console.log(client)
        io.send(client.id)
        
        
        
        // console.log(io.sockets.sockets)
        if (io.sockets.sockets[client.id]) {
            console.log("id exists")
        }
        // console.log(Object.keys(io.sockets.sockets))

        client.on("sendMsg", (d) => {
            console.log(d)
            console.log(client.id)
            client.broadcast.emit("msgRcv",d)//// for all prev connected ones
        })


        client.on("disconnect", () => {
            console.log("client disconnected")
        })
        return io;
    })
    
}


export default init;