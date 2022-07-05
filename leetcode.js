var _leetcodeQuery = require("leetcode-query");

var _dates = require("./dates.js");

const leetcode = new _leetcodeQuery.LeetCode();
//var username = "dabbiruhaneesh";
var val = 0;
async function letscall(username) {
    // Call start
    //(async() => {
    //console.log('before start');

    const user = await leetcode.get_user(username);
    //console.log("total leetcode accepted submissions", user.matchedUser.submitStats.acSubmissionNum[0].count);
    var val = user.matchedUser.submitStats.acSubmissionNum[0].count;
    console.log('after start');
    // var x = user.matchedUser.submissionCalendar;
    // var a = x.split(",");
    // var ans = {};
    // a.forEach(s => {
    //     var ts = s.match(/"([^']+)"/)[1];
    //     var t = (0, _dates.dates)(ts);
    //     var k = s.split(":")[1];
    //     if (k.includes("}")) k = k.substring(0, k.length - 1);
    //     ans[t] = k;
    // });
    //console.log(ans);
    return val

    //})();
    //return user.matchedUser.submitStats.acSubmissionNum[0].count;
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
//letscall("dabbiruhaneesh")

exports.letscall = letscall;
//console.log(val)
// async function getData() {
//     return await axios.get('https://jsonplaceholder.typicode.com/posts');
//   }

//   (async () => {
//     console.log(await getData())
//   })()