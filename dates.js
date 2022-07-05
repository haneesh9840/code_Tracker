Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dates = dates;

function dates(vals) {
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }

    var date = new Date(vals * 1000);
    var month = pad2(date.getMonth() + 1); //months (0-11)

    var day = pad2(date.getDate()); //day (1-31)

    var year = date.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
}