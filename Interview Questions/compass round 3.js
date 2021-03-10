/*

=======wwww=======
----------^|
==========wx=======
----------^|

*/


function wrapPrint( textString, columnWidth ){
    const wrappedLines = [];
    let lineStart = 0;
    if(textString.length<=columnWidth-1){
        return [textString];
    }
    let lineEnd = columnWidth-1;
    while(lineEnd < textString.length){
        const charEndNext = textString[lineEnd+1];

        if(charEndNext === ' ' || charEndNext === undefined ){
            wrappedLines.push(textString.substring(lineStart, lineEnd+1));
            lineStart = lineEnd+1;
            lineEnd = lineStart + columnWidth-1;
        }else{
//         letter;
            for(let i=lineEnd;i>=lineStart;i--){
                if(textString[i] === ' '){
                    wrappedLines.push(textString.substring(lineStart, i+1));
                    lineStart = i+1;
                    lineEnd = lineStart + columnWidth-1;
                    break;
                }
            }
        }
    }
    wrappedLines.forEach(line=>console.log(line));

}

const s = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

wrapPrint(s, 16);

//test bed:
// const inputWords = inputStr.split(' ').filter(word=>word);
// const resultWords = resultStr.reduce((acc,line)=>{return acc.concat(line.split(' ').filter(word=>word))}, []);
// if(let i=0;i<=inputWords.length;i++){
//     if(inputWords[i]!==resultWords[i]){
//         throw new Error('invalid answer');
//     }
// }

