window.onload = function () {
    var submitButton = document.getElementById('submit'),
        submitPass   = document.getElementById('submitPass'),
        result       = document.getElementById('result'),
        pass,
        stops;

    submitPass.onclick = function () {
        pass = document.getElementById('passengers').value;
        if (isNaN(pass) || pass < 1) {
            result.innerHTML      = '<red>Zero Passengers!!! Enter a number > 0</red>';
            submitButton.disabled = true;
            return;
        } else {
            conDiv           = document.getElementById('condiv');
            conDiv.innerHTML = '';
            for (var i = 0; i < pass; i++) {
                var p = '<br />Passenger ' + (i + 1) + '\'s destination :<input id="p' + i + '" type="text" />';
                conDiv.innerHTML += p;
            }
        }
        submitButton.disabled = false;
    };

    submitButton.onclick = function () {
        stops = Number(document.getElementById('stops').value);

        if (isNaN(stops) || stops < 1) {
            result.innerHTML = '<span style="text:red;">The Lift is an elevator right??? It has to stop somewhere!!! Enter a number >0</span>';
        } else if (isNaN(pass) || pass < 1) {
            result.innerHTML      = 'Zero Passengers!!! Enter a number > 0';
            submitButton.disabled = true;
            return;
        } else {
            var dfloors = new Array();
            for (var i = 0; i < pass; i++) {
                var p = document.getElementById('p' + i);
                if (p.value && !(isNaN(p.value)) && p.value > 0) {
                    dfloors.push(p.value);
                } else {
                    result.innerHTML = 'Please enter Destination for passenger :' + (i + 1);
                    return;
                }
            }
            console.log(dfloors.toString());
            dfloors.sort(function (a, b) {
                return a - b;
            });
            console.log(dfloors.toString());
            if (stops == 1) {
                result.innerHTML = 'Optimized floor to stop: ' + calcAvg(dfloors) + ' and minimum walk required : ' + calcDeviationForArray(dfloors);
            } else if (pass <= stops) {
                if (dfloors.length != pass) {
                    result.innerHTML = 'No. of passengers not equal to no. of destination floors';
                } else {
                    result.innerHTML = 'Floors to stop: ' + dfloors.toString();
                }
            } else if (dfloors.length != pass) {
                result.innerHTML = 'No. of passengers not equal to no. of destination floors';
            } else {
                var optimizedResult = evaluate(pass - 1, stops - 1, dfloors);
                result.innerHTML    = optimizedResult;
            }
        }
    };
};

function evaluate(pass, stops, dfloors) {
    var iterations,
        maxFloor    = dfloors[dfloors.length - 1];
    iterations      = getnCrList(pass, stops);
    var resultIndex = 0;
    for (var i = 0; i < iterations.length; i++) {
        var indexElem = iterations[i];
        var groups    = splitIntoGroups(dfloors, indexElem);
        console.log(indexElem.toString());
        iterations[i].stopFloorArr = calcGroupsAvges(groups);
        iterations[i].amntToWalk   = calcDeviationForGroups(groups);
        console.log(iterations[i].stopFloorArr);
        console.log(iterations[i].amntToWalk);
        if (iterations[i].amntToWalk < iterations[resultIndex].amntToWalk)
            resultIndex = i;
    }
    return 'Optimized floors to stop: ' + iterations[resultIndex].stopFloorArr.toString() + ' and minimum walk required : ' + iterations[resultIndex].amntToWalk;
}

function ncr(n, r) {
    if (n < r)
        return -1;
    var result = 1,
        p      = n - r;
    var i      = 0;
    while (n > r) {
        result *= n--;
        i++;
    }
    while (p > 0) {
        result /= p--;
        i++;
    }
    return result;
}

function getnCrList(n, r) {
    var item       = new Array(r);
    var iterations = new Array();
    for (var i = 0; i < item.length; i++) {
        item[i] = i + 1;
    }

    var done = false;
    while (!done) {
        iterations.push(item.slice(0));
        done = getNextItem(item, n, r);
    }
    return iterations;
}

function getNextItem(item, n, r) {
    var dest = r - 1;
    item[dest]++;
    if (item[dest] > ((n - (r - dest)) + 1)) {
        while (item[dest] > ((n - (r - dest)))) {
            dest--;
            if (dest < 0) {
                break;
            }
        }
        if (dest < 0) {
            return true;
        }
        item[dest]++;
        for (var i = dest + 1; i < item.length; i++) {
            item[i] = item[i - 1] + 1;
        }
    }
    return false;
}

function splitIntoGroups(dfloors, indexElem) {
    var groups = new Array(),
        start  = 0,
        l      = indexElem.length,
        end    = indexElem[l - 1];
    if (l) {
        groups.push(dfloors.slice(start, indexElem[0]));
        for (var i = 0; i < l - 1; i++) {
            groups.push(dfloors.slice(indexElem[i], indexElem[i + 1]));
        }
        groups.push(dfloors.slice(indexElem[l - 1]));
    }
    return groups;
}

function calcGroupsAvges(groups) {
    var avgArr = new Array();
    for (var i = 0, l = groups.length; i < l; i++) {
        avgArr.push(calcAvg(groups[i]));
    }
    return avgArr;
}

function calcAvg(array) {
    var sum = 0,
        i   = array.length;
    while (i--) {
        sum += +array[i];
    }
    var avg = Math.floor(sum / array.length);
    return avg;
}

function calcDeviationForGroups(groups) {
    var sum = 0;
    for (var i = 0, l = groups.length; i < l; i++) {
        sum += +calcDeviationForArray(groups[i]);
    }
    return sum;
}

function calcDeviationForArray(array) {
    var avg = calcAvg(array),
        sum = 0;
    for (var j = 0; j < array.length; j++) {
        sum += +(Math.abs(array[j] - avg));
    }
    return sum;
}
