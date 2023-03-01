const DB =  require("../DB/db")

const db = new DB();

db.initTask()

class indexController{
   
    static add(req, res){
       let name = req.body.name
        let desc = req.body.desc
        let date = req.body.date

        db.AddNewTask(name, desc, date, res)

    }

    static delete(req, res){
        var id = Number(req.body.id);
        db.DeleteTask(id)
        res.redirect("/")
    }

    static update(req, res){
        var id = Number(req.body.id);

        db.GetTaskById(id, res)

    }

    static updateData(req, res){
        var id = Number(req.body.id);
        let name = req.body.name
        let desc = req.body.desc
        let date = req.body.date

        db.UpdateTask(id, name, desc, date, res)

    }
}

module.exports = indexController;