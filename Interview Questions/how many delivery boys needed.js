/*
Given two arrays where the first one is a list of starting times and second one is the list of Round trip delivery times
 for corresponding orders in the first list, find out how many delivery boys are needed.
 Ex: [100,102,103,106,108,110,112] [2,1,2,1,3,2,1] should need 2 delivery boys
 Ex: [100,102,103,106,108,110,112] [2, 10, 20, 10, 3, 2, 1] should need 5 delivery boys
 */
function countDeliveryBoys(startTimesArr, timeTakenArr) {
    let boys         = {};
    let boyId        = 0;
    let ranges       = startTimesArr.map((startT, index) => {
        return [startT, startT + timeTakenArr[index]];
    });
    const getFreeBoy = (startTime) => {
        let freeBoys = Object.keys(boys)
            .filter(boyId => {
                const boyLastRange = boys[boyId];
                return (startTime >= boyLastRange[1]);
            });
        return freeBoys.length ? freeBoys[0] : 0; //m  = nu. of keys in the boys object
    };
    ranges.forEach(range => {
        const st        = range[0];
        const nextBoyId = getFreeBoy(st);
        if (!nextBoyId) {
            boys[++boyId] = range;
        } else {
            boys[nextBoyId] = range;
        }
    });
    return boyId;
}

countDeliveryBoys([100, 102, 103, 106, 108, 110, 112], [2, 10, 20, 10, 3, 2, 1]);
