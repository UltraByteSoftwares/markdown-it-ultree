const SimpleUL = require('../src/formatters/simple-ul.js');

test('SimpleUL', () => {
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

    const ref = `<ul><li>lorem<ul><li>ipsum</li><li>dolor<ul><li>sit<ul><li>amet<ul><li>consectetur</li></ul></li><li>adipiscing</li></ul></li><li>elit</li></ul></li><li>sed<ul><li>do</li><li>eiusmod</li><li>tempor<ul><li>incididunt</li></ul></li></ul></li></ul></li></ul>`;

    const formatter = new SimpleUL();
    const output = formatter.generate(ulMap);

    expect(output).toEqual(ref);
})