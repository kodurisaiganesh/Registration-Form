var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/sai', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    var rollno = req.body.rollno;
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var branch = req.body.branch; // corrected typo
    var phno = req.body.phno;
    var gender = req.body.gender;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "rollno": rollno,
        "name": name,
        "age": age,
        "email": email,
        "branch": branch,
        "phno": phno,
        "gender": gender,
        "username": username,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully");
        return res.redirect('signup_successful.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
