// require needed packages
const fs = require("fs")
const {exect, exec} = require("child_process")
// fetch the rank from commiters.top
async function getRank(){
    let response = await fetch('https://committers.top/rank_only/algeria.json')
    let data = await response.json()
    let userData = data.user
    if(userData.includes('ita27rmp100')) return userData.indexOf('ita27rmp100')+1
    else return -1
}
getRank().then(rank=>{
    console.log(rank)
    fs.readFile('README.md',"utf-8",(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        else{
            console.log(data[data.indexOf("Algeria-Rank%23")+15])
            data = data.replace(data.slice(data.indexOf("Rank")+4,data.indexOf("Rank")+8),`%23${rank}`)
            fs.writeFile('README.md',data,(err)=>{
                if(err){
                    console.log(err)
                    return
                }
                else{
                    console.log("Rank has been updated successfull")
                    exec(`git add . && git commit -m "change rank to ${rank}" && git push`,(error,stdout,stderr)=>{
                        if(error) console.log("Error :",error)
                        else console.log("push : done")
                    })
                }
            })
        }
    })
}).catch((err)=>{
    console.log("There is an error : ",err)
})