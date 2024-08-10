const mdit = require('markdown-it');
const ulTreePlugin = require('../src/markdown-it-ultree.js');

const md = mdit().use(ulTreePlugin);

test("ULTree-simple", () => {
const input = 
`
\`\`\`ultree
    output: simple
    lorem
        ipsum
            sit
            amet
        consectetur
            adipiscing
\`\`\`
`;

    const ref = 
`<div class="ultree"><ul><li>lorem<ul><li>ipsum<ul><li>sit</li><li>amet</li></ul></li><li>consectetur<ul><li>adipiscing</li></ul></li></ul></li></ul></div>`

    const output = md.render(input);

    expect(output).toEqual(ref);
});

test("ULTree-foldable", () => {
const input = 
`
\`\`\`ultree
    output: foldable
    lorem
        ipsum
            sit
            amet
        consectetur
            adipiscing
\`\`\`
`;

    const ref = 
`<div class="ultree"><ul><li><details open><summary>lorem</summary><ul><li><details open><summary>ipsum</summary><ul><li>sit</li><li>amet</li></ul></details></li><li><details open><summary>consectetur</summary><ul><li>adipiscing</li></ul></details></li></ul></details></li></ul></div>`

    const output = md.render(input);

    expect(output).toEqual(ref);
});

test('ULTree-simple: no ultree', () => {
    const input = 
`
\`\`\`
    lorem
        ipsum
            sit
            amet
        consectetur
            adipiscing
\`\`\`
`;

    const ref = 
`<pre><code>    lorem
        ipsum
            sit
            amet
        consectetur
            adipiscing
</code></pre>
`

    const output = md.render(input);

    expect(output).toEqual(ref);
});

test('IndentParser-tree-default', () => {
    const input = 
`
\`\`\`ultree
    lorem
    ├── ipsum
    │   ├── sit
    │   └── amet
    └── consectetur
        └── adipiscing
\`\`\`
`;

    const ref = 
    `<div class="ultree"><ul><li><details open><summary>lorem</summary><ul><li><details open><summary>ipsum</summary><ul><li>sit</li><li>amet</li></ul></details></li><li><details open><summary>consectetur</summary><ul><li>adipiscing</li></ul></details></li></ul></details></li></ul></div>`

    const output = md.render(input);

    expect(output).toEqual(ref);
})