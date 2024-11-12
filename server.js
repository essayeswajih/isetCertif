const express = require('express')
const mysql = require('mysql')
const hbs = require('express-hbs')
const bodyParser = require('body-parser')
//const cors = require('cors')
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'isetcert'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to database")
    }
})

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



const path = require("path");

app.get("/",(req,res)=>{
    const sql = "SELECT * FROM certif";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.render("index",{
            "layout":"main",
            "certif":result
        });
    })
})

app.get("/login", (req, res) => {
    res.render("login/login.hbs");
});
app.post("/login", (req,res)=>{
    const sql = "SELECT * FROM utilisateur WHERE cin = ? AND mot_de_passe = ?";
    connection.query(sql, [req.body.cin, req.body.password], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/");
    });
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname,"views/register/register.hbs"));
});

app.listen(port,()=>console.log(`Connected to ${port}`));