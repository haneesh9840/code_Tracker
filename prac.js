var express = require("express");
var app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var lc = require("./leetcode.js");
var gfg = require("./gfg.js");
var gfg2 = require("./gfg2.js");
app.use(express.static("public"));
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
const date = new Date();
d = date.getDate() - 1;
m = date.getMonth();
y = date.getFullYear();
console.log(d, m);
var problems_s = mongoose.model("problems_s", problems);

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://admin:admin143@cluster0.0ggnx.mongodb.net/codeTrackerDB");
//console.log(c.collection("userdetails"))

var userdetails = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    gfgprofilename: String,
    lcprofilename: String,
    mtarget: Number,
    dtarget: Number,
    tgfgsolved: Number,
    tlcsolved: Number,
});

var Userdetails = mongoose.model("Userdetails", userdetails);
let profilenames = [];
Userdetails.find({}, (err, res) => {
    if (!err) {
        res.forEach((element) => {
            if (element.username != null) {
                profilenames.push([
                    element.username,
                    element.gfgprofilename,
                    element.lcprofilename,
                ]);
            } else {
                profilenames.push([
                    element.email,
                    element.gfgprofilename,
                    element.lcprofilename,
                ]);
            }
            //   console.log(profilenames);
        });
    }
    console.log(profilenames);
    profilenames.forEach((element) => {
        //     //=================================================================================
        lc.letscall(element[2]).then((result1) => {
            gfg.scrapeData(element[1]).then((result2) => {
                console.log(result1, result2);
                Userdetails.find({ username: element[0] }, (err1, res) => {
                    if (err1) {
                        console.log("error");
                    } else {
                        problems_s.find({ username: element[0] }, (err2, resInner) => {
                            if (err2) {
                                console.log("error");
                            } else {
                                const temp = resInner[0];

                                console.log(
                                    result2 - res[0].tgfgsolved,
                                    result1 - res[0].tlcsolved
                                );

                                temp.gfgsolved[m][d] = result2 - res[0].tgfgsolved;
                                console.log(m, d, "gfg", temp.gfgsolved[m]);
                                temp.leetcodesolved[m][d] = result1 - res[0].tlcsolved;
                                console.log(m, d, "lc", temp.leetcodesolved[m][d]);
                                problems_s.updateOne({ username: element[0] }, {
                                        $set: {
                                            gfgsolved: temp.gfgsolved,
                                            leetcodesolved: temp.leetcodesolved,
                                        },
                                    },
                                    (err, res) => {}
                                );
                            }
                        });
                        Userdetails.updateOne({ username: element[0] }, { $set: { tgfgsolved: result2, tlcsolved: result1 } },
                            (err, res) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        );
                    }
                });
            });
        });
        //     //=================================================================================
    });
});

//     leetcodeprofilenames.forEach(element => {
//         lc.letscall(element).then((result1) => {
//             console.log(result1)
//                 // Userdetails.find({ lcprofilename: element }, (err, res) => {
//                 //     console.log(res)
//                 // })
//             Userdetails.updateOne({ lcprofilename: element[1] }, { $set: { "tlcsolved": result1 } }, (err, res) => {
//                     if (err)
//                         console.log(err)
//                 }

//             )

//         })
//     })
// })

// var problems = new mongoose.Schema({
//     username: String,
//     email: String,
//     year: { type: Array, "default": [] },
//     gfgsolved: { type: Array, "default": [] },
//     leetcodesolved: { type: Array, "default": [] },
//     manualsolved: { type: Array, "default": [] },
//     totalsolved: { type: Array, "default": [] },
// })

// gfgprofilenames = []
// leetcodeprofilenames = []
// Userdetails.find({}, (err, res) => {
//     if (!err) {
//         res.forEach(element => {
//             gfgprofilenames.push(element.gfgprofilename)
//             leetcodeprofilenames.push(element.lcprofilename)
//         });

//     }

//     console.log(gfgprofilenames, leetcodeprofilenames)
//     gfgprofilenames.forEach(element => {
//         gfg.scrapeData(element).then((result2) => {
//             Userdetails.updateOne({ gfgprofilename: element }, { $set: { "tgfgsolved": result2 } }

//             )

//         })
//     })
//     leetcodeprofilenames.forEach(element => {
//         lc.letscall(element).then((result1) => {
//             Userdetails.updateOne({ lcprofilename: element }, { $set: { "tlcsolved": result1 } }

//             )

//         })
//     })
// })

// var obj = new problems_s({
//   username: "hane",
//   email: "dsa",
// });
// obj.save();

//----------------date------------------------

// console.log(
//   date.getDate() + " " + (date.getMonth() + 1) + " " + date.getFullYear()
// );
//----------------date------------------------

// console.log(t1);
// problems_s.updateOne({ username: "hane" }, { $set: { gfgsolved: t1 } },(err)=>{});

// var express = require('express')
// var app = express()
// const ejs = require('ejs')
// const mongoose = require("mongoose")
// const bodyparser = require('body-parser')
// var lc = require("./leetcode.js");
// var gfg = require("./gfg.js");
// var gfg2 = require("./gfg2.js");
// app.use(express.static("public"))
// let t1 = new Array(12).fill(0).map(() => new Array(31).fill(0));
// let t2 = new Array(12).fill(0).map(() => new Array(31).fill(0));
// let t3 = new Array(12).fill(0).map(() => new Array(31).fill(0));
// // console.log(t)

// var problems = new mongoose.Schema({
//     username: String,
//     email: String,
//     gfgsolved: { type: Array, default: t1 },
//     leetcodesolved: { type: Array, default: t2 },
//     manualsolved: { type: Array, default: t3 },
// });
// const date = new Date();
// d = date.getDate();
// m = date.getMonth() + 1;
// y = date.getFullYear();
// var problems_s = mongoose.model("problems_s", problems);

// app.set('view engine', 'ejs')
// app.use(bodyparser.urlencoded({ extended: true }))
// mongoose.connect("mongodb://localhost:27017/codeTrackerDB")
//     //console.log(c.collection("userdetails"))

// var userdetails = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     gfgprofilename: String,
//     lcprofilename: String,
//     mtarget: Number,
//     dtarget: Number,
//     tgfgsolved: Number,
//     tlcsolved: Number
// })

// var Userdetails = mongoose.model('Userdetails', userdetails)
// gfgprofilenames = []
// leetcodeprofilenames = []
// Userdetails.find({}, (err, res) => {
//     if (!err) {
//         res.forEach(element => {
//             if (element.username != null) {
//                 gfgprofilenames.push([element.username, element.gfgprofilename])
//                 leetcodeprofilenames.push([element.username, element.lcprofilename])
//             } else {
//                 gfgprofilenames.push([element.email, element.gfgprofilename])
//                 leetcodeprofilenames.push([element.email, element.lcprofilename])
//             }
//         });

//     }

//     console.log(gfgprofilenames, leetcodeprofilenames)
//     gfgprofilenames.forEach(element => {
//         //console.log(element)
//         lc.letscall(element[1]).then((result1) => {
//             gfg.scrapeData(element[1]).then((result2) => {

//                     Userdetails.find({ username: element[0] }, (err, res) => {
//                         if (err)
//                             console.log("dengindi")
//                         problems_s.find({ username: element[0] }, (err2, resInner) => {
//                             if (err2)
//                                 console.log("gud pagaldenginidi")
//                             else {
//                                 const temp = resInner[0];

//                                 console.log(resInner, res);

//                                 temp.gfgsolved[m][d] = result2 - res[0].tgfgsolved;
//                                 //temp.leetcodesolved[m][d] = result1 - res[0].tlcsolved;
//                                 problems_s.updateOne({ username: element[0] }, {
//                                         $set: {
//                                             "gfgsolved": temp.gfgsolved,
//                                             // "leetcodesolved": temp.leetcodesolved,
//                                         },
//                                     },
//                                     (err) => {}
//                                 );
//                             }
//                         });
//                         Userdetails.updateOne({ gfgprofilename: element[1] }, { $set: { "tgfgsolved": result2 } }, (err, res) => {
//                                     if (err)
//                                         console.log(err)
//                                 }

//                             )
//                             //}
//                     });
//                 })
//                 //console.log(result2)

//         })
//     })
// })


// //     leetcodeprofilenames.forEach(element => {
// //         lc.letscall(element).then((result1) => {
// //             console.log(result1)
// //                 // Userdetails.find({ lcprofilename: element }, (err, res) => {
// //                 //     console.log(res)
// //                 // })
// //             Userdetails.updateOne({ lcprofilename: element[1] }, { $set: { "tlcsolved": result1 } }, (err, res) => {
// //                     if (err)
// //                         console.log(err)
// //                 }

// //             )

// //         })
// //     })
// // })



// // var problems = new mongoose.Schema({
// //     username: String,
// //     email: String,
// //     year: { type: Array, "default": [] },
// //     gfgsolved: { type: Array, "default": [] },
// //     leetcodesolved: { type: Array, "default": [] },
// //     manualsolved: { type: Array, "default": [] },
// //     totalsolved: { type: Array, "default": [] },
// // })



// // gfgprofilenames = []
// // leetcodeprofilenames = []
// // Userdetails.find({}, (err, res) => {
// //     if (!err) {
// //         res.forEach(element => {
// //             gfgprofilenames.push(element.gfgprofilename)
// //             leetcodeprofilenames.push(element.lcprofilename)
// //         });

// //     }

// //     console.log(gfgprofilenames, leetcodeprofilenames)
// //     gfgprofilenames.forEach(element => {
// //         gfg.scrapeData(element).then((result2) => {
// //             Userdetails.updateOne({ gfgprofilename: element }, { $set: { "tgfgsolved": result2 } }

// //             )

// //         })
// //     })
// //     leetcodeprofilenames.forEach(element => {
// //         lc.letscall(element).then((result1) => {
// //             Userdetails.updateOne({ lcprofilename: element }, { $set: { "tlcsolved": result1 } }

// //             )

// //         })
// //     })
// // })


// // var obj = new problems_s({
// //   username: "hane",
// //   email: "dsa",
// // });
// // obj.save();

// //----------------date------------------------

// // console.log(
// //   date.getDate() + " " + (date.getMonth() + 1) + " " + date.getFullYear()
// // );
// //----------------date------------------------


// // console.log(t1);
// // problems_s.updateOne({ username: "hane" }, { $set: { gfgsolved: t1 } },(err)=>{});