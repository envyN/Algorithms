if (!Array.prototype.mapLimit) {
    Array.prototype.mapLimit = function (iterateeFn, limit) {
        const chunks = [];
        const clone = [...this];
        const results = new Array(this.length);
        while (clone.length) {
            chunks.push(clone.splice(0, limit));
        }
        const finalPromise = chunks.reduce((prevPromise, chunk, chunkIndex) => {
                return prevPromise.then(() => Promise.all(
                        chunk.map((item, itemIndexInChunk) => new Promise((resolve, reject) => {
                                iterateeFn(item, resolve);
                            }).then(ir => {
                                results[chunkIndex * limit + itemIndexInChunk] = ir;
                                console.log('processed:',ir);
                                return Promise.resolve(ir);
                            })
                        )
                    )
                );
            },
            Promise.resolve(true));
        finalPromise.then(() => {
            console.log('All Processed', results);
        });
    }
}
[1, 2, 3, 4, 5, 6, 7, 8, 9].mapLimit((v, cb) => {
    setTimeout(() => {
        cb(v * 2);
    }, 5000 - (v * 500));
}, 5);