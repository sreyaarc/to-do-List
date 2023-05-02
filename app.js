import express from "express";
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("<h1>hey there!!</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}..`);
});