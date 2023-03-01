const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const DB = require("./DB/db")

const indexRoute = require("./Routes/indexRoute")
const db = new DB()

const app = express()
app.set('view engine', 'hbs')
const publicDirectoryPath = path.join(__dirname, "/public")
const viewDirectoryPath = path.join(__dirname, "views")

app.use(express.static(publicDirectoryPath))
app.use(express.static(viewDirectoryPath))
app.use(indexRoute)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



app.get('', (req, res) =>{
    
    let arr = Array()

    db.GetTasks().then((data)=>{

        data.forEach(element => {
            arr.push(element.toJSON())
        });
        console.log("exec")
        res.render('index.hbs', {tasks : arr})
    })
})


app.listen(3000, ()=>{
    console.log("server successful")
})