const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const mongoose = require("mongoose")
//const pug = require('pug');

///////////// DB CONNECT /////////////

mongoose.connect("mongodb://localhost:27017/titanic")
.then(res => {console.log("mongodb connected")})
.catch ((err)=> {console.log(err)})


/* MongoClient.connect("mongodb://localhost:27017", (err, db) => {
    if (err) throw err;
    let titanic = db.db("titanic")
    /* titanic.collection("passengers").find({}).toArray(function(err,res) {
        if (err) throw err;
        console.log("users : ",res)
    }) */
/*
}) 
*/

///////////// BODY PARSER /////////////
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
})); 

///////////// ROUTES /////////////

app.use(express.static("public"))

app.set('view engine', 'ejs')


let login = require("./router/login")
let titanicUrl = require("./router/titanic")

app.use('/', login );


app.use('/titanic', titanicUrl );

/* // Compile template.pug, and render a set of data
console.log(pug.renderFile('views/template.pug', {
    name: 'Timothy'
})); */

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log('listening on http://localhost:' + port)
})
