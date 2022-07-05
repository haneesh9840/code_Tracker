const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

async function scrapeData(username) {
    try {
        const url =
            "https://auth.geeksforgeeks.org/user/" + username + "/practice#problem-solved-div";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const name = $("#detail1 div");
        let res;
        name.each((idx, ele) => {
            const temp = $(ele).children("a").text();
            if (temp.includes("Problems Solved")) {
                res = parseInt(temp.split(":", 2)[1]);
            }
        });
        //console.log(res);
        return res;

    } catch (err) {
        console.error(err);
    }
}
//scrapeData();
Object.defineProperty(exports, "__esModule", {
    value: true
});


exports.scrapeData = scrapeData;