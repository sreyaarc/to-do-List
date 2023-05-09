import express from "express";
const app = express();

import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');  

import * as dateFunctions from "./modules.js";
let generalDate = dateFunctions.getGeneralDate();
let currentDay = dateFunctions.currentDay();
let typeOfDay = dateFunctions.typeOfDay();

app.use(express.static(path.join(__dirname , "/public")));

app.get("/", (req, res) => {
    res.render("list", {
        generalDate: generalDate, 
        currentDay: currentDay,
        listTitle: typeOfDay,
        tasks: tasks,
        page: "WorkList",
        pageLink: "/work"
    });
});

app.use(express.urlencoded({extended: true}));

let tasks = [];
app.post("/", (req, res) => {
    // res.send(`<h2>${req.body.newTask}</h2>`)
    console.log(req.body);
    let task = req.body.inputTask;

    if(req.body.buttonAttr == "Work") {
        workTitle.push(task);
        res.redirect("/work");
    } else {
        tasks.push(task);
        res.redirect("/");
    }   
})

let workTitle = [];
app.get("/work", (req, res) => {
    res.render("list", {
        generalDate: generalDate, 
        currentDay: currentDay,
        listTitle: "Work List",
        tasks: workTitle,
        page: "Home",
        pageLink: "/"
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}..`);
});