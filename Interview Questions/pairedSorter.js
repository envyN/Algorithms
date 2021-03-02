/**
 Given an input array sort it such a way that pairs of negative and positive numbers are at the beginning of the array
 and remaining numbers follow in a sorted manner. Ex:
 //input
 var array = [8, 7, 7, 0, 6, 4, -9, -1, 2, -7, 3, 5, 1, 10];
 //output
 var array2 = [-7, 7, -1, 1, -9, 0, 2, 3, 4, 5, 6, 7, 8, 10];
 */
function transformer(inputArr) {
    const pairsArr    = [];
    const sortedArr   = inputArr.sort((a, b) => a - b);
    const unpairedArr = [];
    for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] < 0) {
            if (sortedArr.indexOf(-sortedArr[i]) !== -1) {
                pairsArr.push(...[sortedArr[i], -sortedArr[i]]);
                sortedArr.splice(sortedArr.indexOf(-sortedArr[i]), 1);
            } else {
                unpairedArr.push(sortedArr[i]);
            }
        } else {
            unpairedArr.push(sortedArr[i]);
        }
    }
    return [...pairsArr, ...unpairedArr];
}

transformer(array);

function transformer2(inputArr) {
    const dictionary  = {};
    const retArr      = [];
    const unPairedArr = [];
    for (let i = 0; i < inputArr.length; i++) {
        if (Array.isArray(dictionary[inputArr[i]])) {
            dictionary[inputArr[i]].push(i);
        } else {
            dictionary[inputArr[i]] = [i];
        }
    }

    // n

    console.log(dictionary);
    const sortedKeys = Object.keys(dictionary).sort((a, b) => a - b);
    //nlogn
    sortedKeys.forEach(key => {
        const keyIndexes = dictionary[key];
        keyIndexes.forEach(keyIndex => {
            if (dictionary[-key] && dictionary[-key].length) {
                retArr.push(+key, -key);
                dictionary[-key].pop();
            } else {
                unPairedArr.push(+key);
            }
        });

    });
    // n
    console.log(dictionary);
    return retArr.concat(unPairedArr);
}
