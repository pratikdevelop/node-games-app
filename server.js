const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config(path.join(__dirname,'/.env'))
const port = process.env.LOCAL_PORT || 3306;
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const db = require("./config");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ static: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    db.all('select * from games',(err, content)=>{
        if (err) {
            console.error('err',err);
        }
		res.render('index', {content:content})
    })
   
});

app.post("/signup", (req, res) => {
    const v4options = {
        random: [
            0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
            0x67, 0x1c, 0x58, 0x36,
        ],
    };
    const {password, first_name, last_name, email, username} = req.body;
    const user_id = uuidv4(v4options);
    const hash_password= bcryptjs.hashSync(password, 10);
    const created_date =  new Date();
    db.run(
        `INSERT INTO users (user_id,first_name,last_name, username, email, password, confirm_password, created_date) values(?,?,?,?,?,?,?,?)`,[user_id,first_name, last_name, username, email, hash_password,hash_password, created_date],
        (err) => {
            if (err) {
                console.log('msg', err);
                return res.status(500).json({"message":err.message, status: false,code:500});
            }
            return res.status(200).json({"message":"user registeration successfull", status: true, code:200});
        }
    );
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email  = ?", [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('row', row[0].password);
        if (row) {
            const passwordVerify = bcryptjs.compareSync(password, row[0].password)
            return res.redirect("/");
        }
        else {
            return res.redirect("/signin");
        }
    });
});

app.get("/signin", (req, res) => {
    res.render("signin");
});

app.get('/signup',(req,res)=>{

    res.render('signup')
});

app.listen(port, (req, res) => {
    console.log(`port listinning on  http://localhost:${port}`);
});
