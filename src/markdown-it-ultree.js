const ParserMgr = require('./parser-mgr.js');
const FormatterMgr = require('./formatter-mgr.js');

const defaults = {
    'input': 'indent',
    'output': 'foldable'
}

/**
 * Gets the options and also returns a string with options removed
 * @param {string} text 
 * @returns {Object | null}
 */
function preProcessContent(text) {
    // Check for first non-empty line
    const lines = text.split(/\r?\n/).filter(s => s.trim() !== '');
    // If no lines, return null
    if (!lines && !lines.length)
        return null;

    const parserMgr = ParserMgr.getInstance();
    const formatterMgr = FormatterMgr.getInstance();

    // Set the default parsers
    let parser = parserMgr.getParser(defaults['input']);
    let formatter = formatterMgr.getFormatter(defaults['output']);

    let lineNum = 0
    const regexp = /(\w+\s*:\s*\w+)/g;
    // Initialize with default options
    let options = {...defaults};

    // Loop over lines for presence of options
    for (let line of lines) {
        // Check for presence of options 
        const matches = line.matchAll(regexp);

        let found = false;
        for (let match of matches) {
            const option = match[1].split(/\s*:\s*/);
            // Update the options
            options[option[0]] = option[1];

            found = true;
        }

        // Break if no more option lines are present
        if (!found)
            break;

        ++lineNum;
    }

    // Get the user chosen parser, if valid
    if (parserMgr.isValid(options['input']))
        parser = parserMgr.getParser(options['input']);

    // Get the user chosen formatter, if valid
    if (formatterMgr.isValid(options['output']))
        formatter = formatterMgr.getFormatter(options['output']);

    // Now, make the object
    return {
        'content': lines.slice(lineNum).join('\n'),
        'parser': parser,
        'formatter': formatter
    }
    
}

function ulTreePlugin(md) {
    const origRule = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];

        if (token.info === 'ultree') {
            // get options if any
            const ret = preProcessContent(token.content);
            // if ret is not null only then proceed
            if (ret)
            {
                const {content, parser, formatter} = ret;
                const ulMap = parser.parse(content);
                if (ulMap) {
                    const htmlCode = formatter.generate(ulMap);
                    return `<div class="ultree">${htmlCode}</div>`;
                }
            }
        }

        // If it's not ultree, do things normally
        return origRule(tokens, idx, options, env, slf);
    }
}

module.exports = ulTreePlugin;
