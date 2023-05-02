import express from "express";
const app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');  

var tasks = [];

app.get("/", (req, res) => {
    let today = new Date();

    let options = {
        day : "numeric",
        month: "long",
        year: "numeric"
    };
    
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {typeOfDay: day, tasks: tasks});
});

app.post("/", (req, res) => {
    // res.send(`<h2>${req.body.newTask}</h2>`)
    var task = req.body.newTask;
    tasks.push(task);
    res.redirect("/");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}..`);
});