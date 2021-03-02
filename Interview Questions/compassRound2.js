// Uncomment either if needed
//var _ = require('underscore')
//var _ = require('lodash')

/*
Given a JSON array of data, convert it to a string outline with this formatting:
- Animals
  - Dogs
    - Pitbull
      - English Pitbull
      - American Pitbull
    - Chihuahua
  - Cats
    - Calico
      - British Shorthair
      - Japanese Bobtail
    - Scottish Fold
*/


function printTree(rootArray, spacePadding) {
    let retString = '';
    const padding = spacePadding?new Array(spacePadding).fill(' ').join(''):'';
    console.log('padding', spacePadding, padding);
    const childPadding = spacePadding?spacePadding+2:2;
    rootArray.forEach(obj=>{
        retString +=`${padding}- ${obj.title}\n`;
        if(Array.isArray(obj.children)){
            retString +=printTree(obj.children, childPadding);
        }
    });

    return retString;

}

var rawData = [
    {
        "title": "Animals",
        "children": [
            {
                "title": "Dogs",
                "children": [
                    {
                        "title": "Pitbull",
                        "children": [
                            {
                                "title": "English Pitbull",
                                "children": null
                            },
                            {
                                "title": "American Pitbull"
                            }
                        ]
                    },
                    {
                        "title": "Chihuahua",
                        "children": null
                    }
                ]
            },
            {
                "title": "Cats",
                "children": [
                    {
                        "title": "Calico",
                        "children": [
                            {
                                "title": "British Shorthair",
                                "children": null
                            },
                            {
                                "title": "Japanese Bobtail"
                            }
                        ]
                    },
                    {
                        "title": "Scottish Fold",
                        "children": null
                    }
                ]
            }
        ]
    }
];

/* Test Suite */

var Mocha = require('mocha');
var assert = require('assert');
var mocha = new Mocha({ui: 'bdd'});

// Bit of a hack, sorry!
mocha.suite.emit('pre-require', this, 'solution', mocha);

describe("Test suite", function() {
    // Add Tests Here!
    it("rawData to outline", function() {
        var testResult = printTree(rawData),
            correctResult = `
- Animals
  - Dogs
    - Pitbull
      - English Pitbull
      - American Pitbull
    - Chihuahua
  - Cats
    - Calico
      - British Shorthair
      - Japanese Bobtail
    - Scottish Fold`.trim();

        assert.equal(testResult.trim(), correctResult.trim());
    });
});

mocha.run(function() {});
