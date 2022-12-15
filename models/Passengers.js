const mongoose = require("mongoose")

module.exports = passengers = new mongoose.Schema({
    PassengerId: String ,
	Survived: String ,
    Pclass: String ,
    Name: String ,
    Sex: String ,
    Age: String ,
    SibSp: String ,
    Parch: String ,
    Ticket: String ,
    Fare: String ,
    Embarked: String 
})
