// https://leetcode.com/problems/valid-anagram/
// 242. Valid Anagram
// Easy
//
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
//
//
//
// Example 1:
//
// Input: s = "anagram", t = "nagaram"
// Output: true
//
// Example 2:
//
// Input: s = "rat", t = "car"
// Output: false
//
//
//
// Constraints:
//
//     1 <= s.length, t.length <= 5 * 104
//     s and t consist of lowercase English letters.
//
//
//
// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length != t.length) {
        return false;
    }
    // return s.split("").sort().join("") === t.split("").sort().join("");
    const m = {};
    for (let i = 0; i < s.length; i++) {
        const si = s[i];
        const ti = t[i];
        m[si] = m[si] ? m[si] + 1 : 1;
        m[ti] = m[ti] ? m[ti] - 1 : -1;
    }
    // return !Object.values(m).filter(a => !!a).length;
    const set = new Set(Object.values(m))
    return set.size === 1 && set.has(0);
};
console.log(isAnagram("anagram", "nagaram")) // true
console.log(isAnagram("rat", "car")) // false