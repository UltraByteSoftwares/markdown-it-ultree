# About

A markdown tree plugin for [markdown-it](https://github.com/markdown-it/markdown-it) parser to render collapsible (foldable) trees. The tree is rendered as an unordered-list HTML element.

# Installation

```bash
npm install markdown-it-ultree
```

# Usage

```js
// If you don't have markdown-it, install it
const markdownIt = require('markdown-it');
const ultree = require('markdown-it-ultree');
const mdit = markdownIt();
mdit.use(ultree);

/* You can use spaces or tabs (but not both simultaneously)
* to indent items
*/  
mdit.render(`\`\`\`ultree
output: foldable

.
    LICENSE
    package.json
    package-lock.json
    README.md
    src
        markdown-it-ultree.js
    test
        markdown-it-ultree.test.js

\`\`\``);

// or you can paste the output of the "tree" command as well
mdit.render(`\`\`\`ultree
output: foldable

.
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── markdown-it-ultree.js
└── test
    └── markdown-it-ultree.test.js

\`\`\``);
```

## Output

### Raw output (prettified)

```html
<div class="ultree">
    <ul>
        <li><details open><summary>.</summary>
                <ul>
                    <li>LICENSE</li>
                    <li>package.json</li>
                    <li>package-lock.json</li>
                    <li>README.md</li>
                    <li><details open><summary>src</summary>
                            <ul>
                                <li>markdown-it-ultree.js</li>
                            </ul>
                        </details>
                    </li>
                    <li><details open><summary>test</summary>
                            <ul>
                                <li>markdown-it-ultree.test.js</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
    </ul>
</div>
```

### HTML output with styling

![foldable-tree](./res/example-foldable.png)

**NOTE**: The CSS for the above image can be found in [style](./style/style.css) folder.

# Options

Options can be specified as `key: value` pairs at the beginning of the body of `ultree` block as shown in the example above.

Here are the currently supported options,

| Option     | Possible values | Description                                        |
| ---------- | --------------- | -------------------------------------------------- |
| **output** | `foldable`      | (default) Output a foldable tree                   |
|            | `simple`        | Output a non-foldable tree                         |
| **open**   | `true`          | (default) Keep foldable tree expanded at the start |
|            | `false`         | Keep foldable tree collapsed at the start          |

# Important

- The tree can have only **one** root.
- Do not mix tabs and spaces for indentation within one `ultree` block. Either use spaces (recommended) or tabs.
- Keep the indentation consistent. e.g. if you indent by 4 spaces, do not indent by 2 spaces later on within the same `ultree` block.
