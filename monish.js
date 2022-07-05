var d = new Date()
cal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
if (d.getMonth() === 1) {
    var year = d.getFullYear()
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        cal[1] = 29
    }
}
console.log(cal)