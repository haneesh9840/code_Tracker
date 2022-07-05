var express = require('express')
var app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
const bodyparser = require('body-parser')
var lc = require("./leetcode.js");
var gfg = require("./gfg.js");
var gfg2 = require("./gfg2.js");
app.use(express.static("public"))

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://admin:admin143@cluster0.0ggnx.mongodb.net/codeTrackerDB")
var userdetails = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    gfgprofilename: String,
    lcprofilename: String,
    mtarget: Number,
    dtarget: Number,
    tgfgsolved: Number,
    tlcsolved: Number
})

var Userdetails = mongoose.model('Userdetails', userdetails)

app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/", (req, res) => {
    console.log(res.body)
    lc.letscall("dabbiruhaneesh").then((result1) => {
            gfg.scrapeData("dabbiruhaneesh").then((result2) => {
                gfg2.scrapeData("dabbiruhaneesh").then((result3) => {
                    //var alpha = result3

                    res.render("main", { gfg_c: result1, lc_c: result2, todaygfg: result3 })
                        //res.render("main", { lc_c: result })
                })

            })


        })
        //var alpha = setTimeout(lc.letscall("dabbiruhaneesh"), 5000)


    //console.log(alpha)
})
app.get("/settings/:username", (req, res) => {
    const username = req.params.username;
    //here an authenticatin code has to be written otherwise anyone with the url can make the changes!
    res.render("settings", { uname: username })
})


app.post('/settings', (req, response) => {
    const username = req.body.rest
    const pass = req.body.password
    const lcpn = req.body.lcpn
    const gfgpn = req.body.gfgpn
    const mtarget = req.body.mtarget
    const dtarget = req.body.dtarget
    Userdetails.findOne({ "username": username }, (err, res) => {
        if (err) {
            console.log("Sorry user doesnt exist!")
            res.render("home")
        } else {
            if (pass !== null) {
                Userdetails.updateOne({ "username": username }, { $set: { "password": pass } }, (err) => {
                    if (err)
                        console.log(err)
                })
            }
            if (lcpn != null) {
                lc.letscall(lcpn).then((result1) => {
                    Userdetails.updateOne({ "username": username }, { $set: { "lcprofilename": lcpn, "tlcsolved": result1 } }, (err) => {
                        if (err)
                            console.log(err)
                    })
                })
            }
            if (gfgpn != null) {
                gfg.scrapeData(req.body.gfg).then((result2) => {
                    Userdetails.updateOne({ "username": username }, { $set: { "gfgprofilename": gfgpn, "tgfgsolved": result2 } }, (err) => {
                        if (err)
                            console.log(err)
                    })
                })
            }
            if (mtarget !== null) {
                Userdetails.updateOne({ "username": username }, { $set: { "mtarget": mtarget } }, (err) => {
                    if (err)
                        console.log(err)
                })
            }
            if (dtarget !== null) {
                Userdetails.updateOne({ "username": username }, { $set: { "dtarget": dtarget } }, (err) => {
                    if (err)
                        console.log(err)
                })
            }
            console.log(gfgpn, lcpn)
        }
        response.render('success')
    })
})
app.get('/history', (req, res) => {
    res.render('history')
})
app.post('/login', (req, res) => {
        const username = req.body.username
        const password = req.body.password
            //db.collection.find({_id: "myId"}, {_id: 1}).limit(1)
        Userdetails.findOne({ "username": username, "password": { $exists: true } }, (err, founduser) => {
                if (err)
                    console.log("sorry no user found")
                else {
                    //console.log(founduser)
                    if (founduser !== null && founduser.password === password) {
                        lc.letscall(founduser.lcprofilename).then((result1) => {
                            gfg.scrapeData(founduser.gfgprofilename).then((result2) => {

                                res.render('main', { gfg_c: result2, lc_c: result1, todaygfg: result2 - founduser.tgfgsolved, todaylc: result1 - founduser.tlcsolved, uname: founduser.username })
                            })
                        })
                    } else {
                        console.log('error')
                            //console.log(founduser.password + password)
                    }

                }
            }

        )



    })
    //-----------------problems solved schema----------------------

let t1 = new Array(12).fill(0).map(() => new Array(31).fill(0));
let t2 = new Array(12).fill(0).map(() => new Array(31).fill(0));
let t3 = new Array(12).fill(0).map(() => new Array(31).fill(0));
var problems = new mongoose.Schema({
    username: String,
    email: String,
    gfgsolved: { type: Array, default: t1 },
    leetcodesolved: { type: Array, default: t2 },
    manualsolved: { type: Array, default: t3 },
});

var problems_s = mongoose.model("problems_s", problems);
//-----------------problems solved schema----------------------
app.post('/register', (req, res) => {

        //----------------------------

        var obj = new problems_s({
            username: req.body.username,
            email: req.body.email,
            gfgsolved: t1,
            leetcodesolved: t2,
            manualsolved: t3,
        });
        obj.save();

        //console.log(newuser[dtarget])


        lc.letscall(req.body.lc).then((result1) => {
            gfg.scrapeData(req.body.gfg).then((result2) => {
                gfg2.scrapeData(req.body.gfg).then((result3) => {
                    //var alpha = result3

                    const newuser = new Userdetails({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        gfgprofilename: req.body.gfg,
                        lcprofilename: req.body.lc,
                        mtarget: req.body.mtarget,
                        dtarget: req.body.dtarget,
                        tgfgsolved: result2,
                        tlcsolved: result1



                    })
                    newuser.save()
                    res.render("main", { gfg_c: result1, lc_c: result2, todaygfg: 0, todaylc: 0, uname: req.body.username })
                })


                //res.render("main", { lc_c: result })
            })

        })




        //res.render("success")
    })
    //console.log(Userdetails.find({}))


app.listen(3000, (req, res) => console.log("runnning on port 3000"));