const { json } = require("sequelize")
const Sequelize = require("sequelize")

const sequelize = new Sequelize("todo_app", "root", "", {
    dialect : "mysql"
})

class InitaitateDB{
   constructor(){
    sequelize.authenticate().then(()=>{
        console.log("sucessfull connected to DB")
    }).catch((err)=>{
        console.log("Error while connecting to the database")
        console.log(err)
    })
   }

   get Tasks(){
    return sequelize.define("task", {
        name : {
            type : Sequelize.DataTypes.STRING,
            allowNull : false
        },

        desc : {
            type : Sequelize.DataTypes.STRING,
        },

        date : {
            type : Sequelize.DataTypes.DATE
        }
    })

   }

    initTask(){
        const Tasks = this.Tasks

        Tasks.sync().then((data)=>{
            console.log("success")
        }).catch((err)=>{
            console.log("error")
        })
   }

   AddNewTask(name, desc, date, res){
    let Tasks = this.Tasks

    Tasks.create({
        name : name,
        desc : desc,
        date : date
    }).then((data)=>{
        console.log("task added successfully")
        
        res.redirect("/")
    }).catch((err)=>{
        console.log("Error")

    })

   }

   GetTasks(){
    let Tasks = this.Tasks;

    return Tasks.findAll({
        order : [ ['id' , 'ASC']]

    })


   }

   DeleteTask(id){
    let Tasks = this.Tasks;

    Tasks.destroy({where : {id : id}}).then(()=>{
        console.log("successfully deleted task")
    }).catch((err)=>{
        console.log("Error")
    })
   }

   GetTaskById(id, res){
    let Tasks = this.Tasks
    var jsonData;

    Tasks.findAll({where : {
        id : id
    }}).then((data)=>{
        data.forEach(element => {
            jsonData =  element.toJSON();
        });
        console.log(jsonData)
        res.render("update.hbs", jsonData)
        
    })
   }

   UpdateTask(id, name, desc, date, res){
    let Tasks = this.Tasks

    Tasks.update({
        name : name,
        desc : desc,
        date : date
    }, {where : {
        id : id
    }}).then((data)=>{
        console.log("success")
        
        res.redirect("/")
    })
   }
}

module.exports = InitaitateDB;