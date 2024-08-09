const IndentParser = require('../src/parsers/indent-parser.js');

const parser = new IndentParser();
test('IndentParser', () => {
    const input = `
        lorem
            ipsum
            dolor
                sit
                    amet
                        consectetur
                    adipiscing
                elit
            sed 
                do 
                eiusmod 
                tempor 
                    incididunt 
        ut 
        labore 
            et `;
    
    const output = parser.parse(input);

    const ref = {
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
        '12': { text: 'incididunt', children: [] },
        '13': { text: 'ut', children: [] },
        '14': { text: 'labore', children: [ 15 ] },
        '15': { text: 'et', children: [] }
      }

    expect(output).toEqual(ref);
});