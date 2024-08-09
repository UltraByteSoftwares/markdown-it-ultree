const FoldableUL = require('../src/formatters/foldable-ul.js');

test('FoldableUL', () => {
    const ulMap = {
        '0': { text: 'lorem', children: [ 1, 2, 8 ] },
        '1': { text: 'ipsum', children: [] },
        '2': { text: 'dolor', children: [ 3, 7 ] },
        '3': { text: 'sit', children: [ 4, 6 ] },
        '4': { text: 'amet', children: [ 5 ] },
        '5': { text: 'consectetur', children: [] },
        '6': { text: 'adipiscing', children: [] },
        '7': { text: 'elit', children: [] },
        '8': { text: 'sed', children: [ 9, 10, 11 ] },
        '9': { text: 'do', children: [] },
        '10': { text: 'eiusmod', children: [] },
        '11': { text: 'tempor', children: [ 12 ] },
        '12': { text: 'incididunt', children: [] }
    };

    const ref = '<ul><li><details open><summary>lorem</summary><ul><li>ipsum</li><li><details open><summary>dolor</summary><ul><li><details open><summary>sit</summary><ul><li><details open><summary>amet</summary><ul><li>consectetur</li></ul></details></li><li>adipiscing</li></ul></details></li><li>elit</li></ul></details></li><li><details open><summary>sed</summary><ul><li>do</li><li>eiusmod</li><li><details open><summary>tempor</summary><ul><li>incididunt</li></ul></details></li></ul></details></li></ul></details></li></ul>'

    const formatter = new FoldableUL();
    const output = formatter.generate(ulMap);

    expect(output).toEqual(ref);
})