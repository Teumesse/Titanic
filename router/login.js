const express = require('express');
const router = express.Router();
const path = require("path")
const app = express()
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser')
const userSchema = require("../models/User");

app.use(cookieParser())

const User = mongoose.model("User", userSchema)


///////////////////////////GET page login//////////////////////////
router.get('/', function (req, res) {

    res.render("login")

});

//////////////////////////POST verifUser//////////////////////////
router.post('/verifUser', function (req, res) {

    const email = req.body.email
    const password = req.body.password

    async function verifUser() {
        const OneUser = await User.find({
            "email": email,
            "password": password
        })


        if (OneUser.length != 0) {  // l'user existe déjà on le connecte


            //Cookie
            //res.cookie("idUser", OneUser[0]._id)

            res.redirect('http://localhost:3005/titanic')

        } else { // l'user n'existe pas, on le créer et on le connecte


            async function createUser() {
                let user = new User({
                    email: email,
                    password: password
                })
                const result = await user.save()

            }

            createUser()
            //Cookie

            res.redirect('http://localhost:3005/titanic')
        }
    }
    verifUser()

});

module.exports = router;

