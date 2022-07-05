var express = require('express')
var app = express()
const schedule = require('node-schedule');
const ejs = require('ejs')
const mongoose = require("mongoose")
const bodyparser = require('body-parser')

app.use(express.static("public"))

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost:27017/codeTrackerDB")
var contact = new mongoose.Schema({
    name: String
})

const rule = new schedule.RecurrenceRule();
rule.minute = 1;
//import schedule from 'node-schedule'

//schedule.scheduleJob('0 0 * * *', () => { ... })
schedule.scheduleJob(rule, function() {
    var Contact = mongoose.model('Contact', contact)

    var contactdata = new Contact({
        name: "sravs"
    })
    contactdata.save()
});
app.get("/", (req, res) => {
    console.log("hi")
})

app.listen(8000, () => console.log("running!"))