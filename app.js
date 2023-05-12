import express from "express";
const app = express();

import _ from "lodash";

import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');  

import * as dotenv from "dotenv";
dotenv.config({path: path.resolve(__dirname, ".env")});
const userName = process.env.USER_NAME;
const pwd = process.env.USER_PWD;

import mongoose from "mongoose";
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect("mongodb+srv://"+userName+":"+pwd+"@cluster0.0m9lew1.mongodb.net/toDoListDB");
}

import * as dateFunctions from "./modules.js";
let generalDate = dateFunctions.getGeneralDate();
let currentDay = dateFunctions.currentDay();
let typeOfDay = dateFunctions.typeOfDay();

app.use(express.static(path.join(__dirname , "/public")));

const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your task missing!! Enter your task"]
    }
});
const Task = mongoose.model("Task", tasksSchema);

const listSchema = new mongoose.Schema({
    name: String,
    tasks: [tasksSchema]
});
const List = mongoose.model("List", listSchema);

const task1 = new Task({
    name: "Welcome to your to-Do List!!"
});
const task2 = new Task({
    name: "Hit + button to add your tasks.."
});
const task3 = new Task({
    name: "Check the box to remove your completed tasks..."
})

const defaultTasks = [ task1, task2, task3];  // for inserting default items


app.get("/", (req, res) => {
    Task.find({}).then((tasks) => {
        if(tasks.length == 0) {   
            Task.insertMany(defaultTasks).then(() => {
                console.log("tasks inserted")
            })
            .catch((err) => {
                console.log(err);
            });
            res.redirect("/");
        } else {       // if the collection is empty, then insert the default items else, render those items to list.ejs
            res.render("list", {      
                generalDate: generalDate, 
                currentDay: currentDay,
                listTitle: typeOfDay,
                tasks: tasks,
                page: ""
            });
        } 
    })
    .catch((err) => {
        console.log(err)
    });
    
});

app.use(express.urlencoded({extended: true}));


app.post("/", (req, res) => {  
    const taskName = req.body.inputTask;
    const customTitle = req.body.buttonAttr; // helps to know to which custom route tasks have been added
    // console.log(customTitle)
    const task = new Task({
        name: taskName
    });

    if(customTitle === typeOfDay) {
        task.save();  // saves in the home route
        res.redirect("/");

    } else {  
        // post request is made on the custom route. So find the document and into its items array, push the new item
        List.findOne({name:{$eq: customTitle}}).then((doc) => {
            doc.tasks.push(task);
            doc.save();
            res.redirect("/"+customTitle);  
        })
        .catch((err) => {
            console.log(err);
        });
    }
})

app.post("/delete", (req, res) => {
    const checkedTaskId = req.body.isCheck;  
    const hiddenInpTitle = req.body.hiddenInput;
    if(hiddenInpTitle === typeOfDay) {
        Task.findByIdAndRemove(checkedTaskId).then(() => {
            console.log("striked task removed!!")
        })
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/");
    } else { 
        List.findOneAndUpdate({name: hiddenInpTitle}, {$pull: {tasks: {_id: checkedTaskId}}}).then((doc) => {
            // console.log(doc);
            res.redirect("/"+hiddenInpTitle)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
})

// creating custom pages using express routing
app.get("/:newCustomPage", (req, res) => {
    const newCustomPageName = _.capitalize(req.params.newCustomPage);
    List.findOne({name: {$eq: newCustomPageName}}).then((list) => {
        if(!list) {
            // if list not present, then create a new list with default items
            const newList = new List({
                name: newCustomPageName,
                tasks: defaultTasks
            });
            newList.save();
            res.redirect(`/${newCustomPageName}`);

        } else {
            // show the list
            res.render("list", {
                generalDate: generalDate, 
                currentDay: currentDay,
                listTitle: list.name,
                tasks: list.tasks,
                page: "Home"
            })
        }
    })
    .catch((err) => {
        console.log(err);
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}..`);
});