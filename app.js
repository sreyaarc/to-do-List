import express from "express";
const app = express();

import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');  

let tasks = [];

app.use(express.static(path.join(__dirname , "/public")));

app.get("/", (req, res) => {
    let today = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let options = {
        day : "numeric",
        month: "long",
        year: "numeric"
    };
    
    let generalDate = today.toLocaleDateString("en-US", options);
    let typeOfDay = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`

    res.render("list", {
        generalDate: generalDate, 
        currentTime: today.toLocaleTimeString(),
        typeOfDay: typeOfDay,
        tasks: tasks});
});

app.use(express.urlencoded({extended: true}));
app.post("/", (req, res) => {
    // res.send(`<h2>${req.body.newTask}</h2>`)
    let task = req.body.inputTask;
    tasks.push(task);

    res.redirect("/");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}..`);
});