// Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
// ["012", "23", "0", "5", "45", "10", "206", "2068", "200", "1234", "10301", "11111111111111111111"] should return
// [0,2,0,1,1,1,1,1,0,3,0,10946]
function getDecodedNumbers(encoded) {
    const es  = `${encoded}`;
    const map = {};

    function rec(es) {
        if (!es.length) {
            return 1;
        }
        if (!+es[0]) {
            return 0;
        }
        if (es.length === 1) {
            if (+es) {
                map[es] = 1;
                return 1;
            } else {
                map[es] = 0;
                return 0;
            }
        }
        if (map[es]) {
            return map[es];
        }
        const next = rec(es.substring(1));

        if (+es.substring(0, 2) && +es.substring(0, 2) <= 26) {
            const nextToNext = rec(es.substring(2));
            map[es]          = next + nextToNext;
            return next + nextToNext;
        }
        map[es] = next;
        return next;

    }

    return rec(es);
}
