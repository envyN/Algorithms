window.onload = function () {
    var submitMN = document.getElementById('submitMN'),
        result   = document.getElementById('result');

    submitMN.onclick = function () {
        var matm         = document.getElementById('rows').value,
            matn         = document.getElementById('columns').value,
            matDiv       = document.getElementById('MatDiv');
        matDiv.innerHTML = '';
        if (isNaN(matm) || matm < 1) {
            result.innerHTML = 'Please enter a number for <b>"ROWS"</b>!!!';
            return;
        } else if (isNaN(matn) || matn < 1) {
            result.innerHTML = 'Please enter a number for <b>"Columns"</b>!!!';
            return;
        }
        for (var i = 0; i < matm; i++) {
            if (i < 9)
                matDiv.innerHTML += '<br />Row:&nbsp;&nbsp;&nbsp;&nbsp;' + (i + 1) + '&nbsp;&nbsp;&nbsp;&nbsp;';
            else
                matDiv.innerHTML += '<br />Row:&nbsp;&nbsp;&nbsp;' + (i + 1) + '&nbsp;&nbsp;&nbsp;';
            for (var j = 0; j < matn; j++) {
                var p = '<input id="m' + i + j + '" type="text" style="width: 1em;"/>';
                matDiv.innerHTML += p;
            }
        }
        matDiv.innerHTML += '<br /><input id="submitMat" type="submit" value="Calculate" onclick="calculate(' + matm + ',' + matn + ')"/>';
    };
};

function calculate(m, n) {
    var mat    = new Array(),
        result = document.getElementById('result');
    for (var i = 0; i < m; i++) {
        var row = new Array();
        for (var j = 0; j < n; j++) {
            var elem = document.getElementById('m' + i + j).value;
            if (!elem || isNaN(elem) || elem < 0 || elem > 1) {
                result.innerHTML = 'Please enter "1" or "0" for element in Row :' + (i + 1) + ', Column : ' + (j + 1);
                return;
            } else {
                result.innerHTML = '';
                row.push(elem);
            }
        }
        mat.push(row);
    }
    console.log('Matrix : ', mat.toString());
    var len          = calcDMSM(mat);
    result.innerHTML = '<br />Max Sub Matrix Start: ' + (len[1] + 1) + ',' + (len[2] + 1) + '<br />Max Sub Matrix End: ' + (len[3] + 1) + ',' + (len[4] + 1) + '<br />Max Sub Matrix Length: ' + len[0];
}

function calcMSM(arr) {
    if (arr) {
        var rows = arr.length,
            cols = arr[0].length,
            len  = new Array(1);
        len[0]   = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var temp = calcD(i, j, rows, cols, arr);
                console.log('temp : ', temp.toString());
                if (temp[0] > len[0]) {
                    console.log('Got the MAX!!!!!!');
                    len = temp;
                }
            }
        }
        console.log('Returning : ', len.toString());
        return len;
    }
    return;
}

function calc(si, sj, r, c, arr) {
    var di  = r,
        dj  = c,
        len = new Array(5);
    len[0]  = 0;
    len[1]  = si;
    len[2]  = sj;
    console.log('-----------------');
    console.log('processing :', (si + 1), (sj + 1));
    for (var i = si; i < di; i++) {
        for (var j = sj; j < dj; j++) {
            if (arr[i][j] == 1) {
                var temp = (j - sj + 1) * (i - si + 1);
                console.log('checking :', (i + 1), (j + 1), temp);
                if (temp > len[0]) {
                    len[0] = temp;
                    len[3] = i;
                    len[4] = j;
                    console.log('len increased : ', (i + 1), (j + 1));
                }
            } else {
                dj = j;
                break;
            }
        }
        if (dj == sj)
            break;
    }
    console.log(len.toString());
    return len;
}
