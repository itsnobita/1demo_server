let data = []
let newData = []
data.forEach(obj => {  
    let arr = obj["Finance Plateform"].split(" | ")
    arr.forEach(f => {
        let temp = {
            ...obj,
            "Finance Plateform":f
        }
        newData(temp)
    })
})