// https://leetcode.com/problems/integer-to-roman/

var intToRoman = function (num) {
    const book      = [
        {
            divisor: 1000,
            roman: 'M',
            diff: 1
        },
        {
            divisor: 500,
            roman: 'D',
            diff: 0
        },
        {
            divisor: 100,
            roman: 'C',
            diff: 1
        },
        {
            divisor: 50,
            roman: 'L',
            diff: 0
        },
        {
            divisor: 10,
            roman: 'X',
            diff: 1
        },
        {
            divisor: 5,
            roman: 'V',
            diff: 0
        },
        {
            divisor: 1,
            roman: 'I',
            diff: 1
        }
    ];
    let romanString = '';
    while (num > 0) {
        let div    = book.shift();
        let divMin = book[div.diff] ? book[div.diff].divisor : 0;
        let min    = div.divisor - divMin;
        while (num < min) {
            div    = book.shift();
            divMin = book[div.diff] ? book[div.diff].divisor : 0;
            min    = div.divisor - divMin;
        }
        while (num >= div.divisor) {
            num -= div.divisor;
            romanString += div.roman;
        }
        if (num >= min) {
            num -= min;
            romanString += (book[div.diff] ? book[div.diff].roman : '') + div.roman;
        }
    }
    return romanString;
};
