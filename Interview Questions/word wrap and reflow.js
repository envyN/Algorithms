/*

Q1: Wrap a given list of words into lines with a max length. words cannot be broken
Q2: We are building a word processor and we would like to implement a "reflow" functionality that also applies full justification to the text.
Given an array containing lines of text and a new maximum width, re-flow the text to fit the new width. Each line should have the exact specified width. If any line is too short, insert '-' (as stand-ins for spaces) between words as equally as possible until it fits.
Note: we are using '-' instead of spaces between words to make testing and visual verification of the results easier.


lines = [ "The day began as still as the",
          "night abruptly lighted with",
          "brilliant flame" ]

reflowAndJustify(lines, 24) "reflow lines and justify to length 24" =>

        [ "The--day--began-as-still",
          "as--the--night--abruptly",
          "lighted--with--brilliant",
          "flame" ] // <--- a single word on a line is not padded with spaces

reflowAndJustify(lines, 25) "reflow lines and justify to length 25" =>

        [ "The-day-began-as-still-as"
          "the-----night----abruptly"
          "lighted---with--brilliant"
          "flame" ]

reflowAndJustify(lines, 26) "reflow lines and justify to length 26" =>

        [ "The--day-began-as-still-as",
          "the-night-abruptly-lighted",
          "with----brilliant----flame" ]

reflowAndJustify(lines, 40) "reflow lines and justify to length 40" =>

        [ "The--day--began--as--still--as-the-night",
          "abruptly--lighted--with--brilliant-flame" ]

reflowAndJustify(lines, 14) "reflow lines and justify to length 14" =>

        ['The--day-began',
         'as---still--as',
         'the------night',
         'abruptly',
         'lighted---with',
         'brilliant',
         'flame']

n = number of words OR total characters
*/

"use strict";

const lines = ["The day began as still as the","night abruptly lighted with","brilliant flame"];
const testReflowWidth1 = 24;
const testReflowWidth2 = 25;
const testReflowWidth3 = 26;
const testReflowWidth4 = 40;
const testReflowWidth5 = 14;




function wrapLines(lines, maxLineLength){
    const words = [];
    lines.forEach(line=>{
        words.push(...line.split(' '));
    });
    const retArr = [[]];
    let lineLengthCounter = 0;
    let currentLineIndex = 0;
    words.forEach(word=>{
        let wordLength = word.length;
        let tempTotalLineLength = lineLengthCounter + wordLength;
        if(tempTotalLineLength>maxLineLength){
            retArr.push([]);
            currentLineIndex++;
            lineLengthCounter = 0;
        }
        retArr[currentLineIndex].push(word);
        lineLengthCounter+=wordLength+1;

    });

    retArr.forEach(line=>{
        let paddedLine = '';
        let lineWordsCount = 0;
        lineWordsCount = line.reduce((tc,word)=>{
            return tc+word.length;
        },lineWordsCount);
        console.log(maxLineLength, lineWordsCount);
        let pads = maxLineLength - lineWordsCount;
        let betWords = Math.floor(pads / (line.length-1));
        let remPads = pads % (line.length-1);
        for(let i=0;i<line.length;i++){
            paddedLine+=line[i];
            console.log(betWords);
            paddedLine+=new Array(betWords).fill('-').join('');
            if(remPads){
                paddedLine++;
                remPads--;
            }
        }
        console.log(paddedLine);
    });
    console.log('-------------------------------');
//   const retVal = retArr.map(line=>line.join('-'))
//   console.log(JSON.stringify(retVal));
//   return retVal;

}
wrapLines(lines, testReflowWidth1);
wrapLines(lines, testReflowWidth2);
wrapLines(lines, testReflowWidth3);
wrapLines(lines, testReflowWidth4);
wrapLines(lines, testReflowWidth5);



// Time and Space = O(n);
