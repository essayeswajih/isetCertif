const express = require('express')
const mysql = require('mysql')
const hbs = require('express-hbs')
const bodyParser = require('body-parser')
//const cors = require('cors')
const app = express();
const port = 3000;
const path = require("path");


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'produits'
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




app.get("/",(req,res)=>{
    const sql = "SELECT * FROM praduit";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.render("index",{
            "layout":"main",
            "certif":result
        });
    })
})

app.listen(port,()=>console.log(`Connected to ${port}`));