const express = require("express")
const Route = express.Router()
const indexController = require("../controllers/IndexController")
const bodyParser = require("body-parser")

var urlencodedParser = bodyParser.urlencoded({extended : false})

Route.post("/add", urlencodedParser, indexController.add)

Route.post("/delete", urlencodedParser, indexController.delete)

Route.post("/update", urlencodedParser, indexController.update)

Route.post("/updateData", urlencodedParser, indexController.updateData)

module.exports = Route;