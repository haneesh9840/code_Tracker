const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

async function scrapeData(username) {
    try {
        const url = "https://auth.geeksforgeeks.org/user/" + username + "/practice";
        const { data } = await axios.get(url);
        let $ = cheerio.load(data);
        let body = $(".activity-graph-div script").html();
        let mDates = body
            .match(new RegExp(/labels: [\w\W]+ datasets/i))[0]
            .replace("datasets", "")
            .replace("labels: [", "")
            .replace("]", "")
            .replace(/'/g, "", )
            .trim()
            .split(",")
            .map((value, index) => {
                return value.trim();
            });
        //console.log(mDates);
        let questions = body.match(new RegExp(/data [\w\W\n]+ fill/))[0];
        //console.log(questions)
        qSolved = questions.match(new RegExp(/[\n] [\w\W]+ ]/))[0].replace("\n", "").replace("]", "").trim().split(",").map((value, index) => { return parseInt(value) });
        var d = new Date().getDate();
        return qSolved[d - 1];
        //let donno = $('#mdl-cell mdl-textfield__input  mdl-cell--5-col').html()
        //console.log($.contains)
    } catch (err) {
        console.error(err);
    }
}
//scrapeData();
Object.defineProperty(exports, "__esModule", {
    value: true
});


exports.scrapeData = scrapeData;

// const Nightmare = require('nightmare')

// const nightmare = Nightmare({ show: true })
// var URL = "https://auth.geeksforgeeks.org/user/dabbiruhaneesh/practice";
// const selector = '.lineChartMonth'
// nightmare
//     .goto(URL)
//     .select(selector, "10")

// .click('#mdl-cell lineChart submitFormBtn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent')
//     //.click('')
//     .end()
//     .then(console.log)
//     .catch(error => {
//         console.error('Search failed:', error)
//     })