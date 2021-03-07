/** https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3662/
 * @param {string[]} words
 * @return {number}
 */

var minimumLengthEncoding = function (words) {
    const dictionary = {};
    const results    = [];
    words.sort((a, b) => b.length - a.length);
    words.forEach(word => {
        if (!dictionary[word]) {
            results.push(word);
            for (let i = 0; i < word.length; i++) {
                dictionary[word.substring(i)] = true;
            }
        }
    });
    return results.join('#').length + 1;
};

// store reversed strings in results so that finding substr becomes easier as indeOx will return 0; :)
var minimumLengthEncoding = function (words) {
    const results = [];
    words.forEach(word => {
        const reversedWord = word.split('').reverse().join('');
        let processed      = false;
        results.forEach((result, index) => {
            if (result.indexOf(reversedWord) === 0) {
                processed = true;
            } else if (reversedWord.indexOf(result) === 0) {
                results[index] = reversedWord;
                processed      = true;
            }
        });
        if (!processed) {
            results.push(reversedWord);
        }
    });
    return results.join('#').length + 1;
};

var minimumLengthEncoding = function (words) {
    const dictionary = {};
    words.forEach(word => {
        dictionary[word] = true;
    });
    Object.keys(dictionary).sort((a, b) => b.length - a.length).forEach(word => {
        for (let i = 1; i < word.length; i++) {
            delete dictionary[word.substring(i)];
        }
    });
    return Object.keys(dictionary).join('#').length + 1;
};
