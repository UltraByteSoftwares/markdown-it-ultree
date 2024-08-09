class IndentParser {
    constructor() {
        this.defaultPadding = 4;
    }
    /**
     * 
     * @param {string} text 
     * @returns {string[]}
     */
    static getLines(text) {
        return text.split(/\r?\n/).filter(s => s.trim() !== '');
    }

    /**
     * 
     * @param {string} str 
     * @returns {number} index
     */
    static getPadding(str) {
        return str.search(/[^\s]/);
    }

    /**
     * 
     * @param {string} str 
     * @param {number} offset 
     * @param {number} indent 
     * @returns {number}
     */
    static getDepth(str, offset, indent) {
        // Get the total padding
        const padding = IndentParser.getPadding(str);
        const depth = (padding - offset)/indent;

        return depth;
    }

    /**
     * 
     * @param {string[]} lines 
     * @param {number} offset 
     * @param {number} indent 
     * @param {Object} ulMap 
     */
    _getItem(lines, offset, indent, ulMap) {
        const line = lines[this._lineNum];

        const item = {
            text: line.trim(),
            children: []
        }
    
        // If it has children get the children
        while (this._lineNum + 1 < lines.length) {
            const diff = IndentParser.getDepth(lines[this._lineNum + 1], offset, indent) 
            - IndentParser.getDepth(line, offset, indent);
            
            // no children, break and ultimately return
            if (diff !== 1)
                break;
            
            const childLineNum = ++this._lineNum;
            // now that it indeed has children, so get them
            const child = this._getItem(lines, offset, indent, ulMap);
    
            if (child) {
                ulMap[childLineNum] = child;
                item.children.push(childLineNum);
            }
        }
    
        return item;
    }

    /**
     * Parse the given text and return a JS object
     * @param {string} text
     * @returns {Object | null} ulMap or null
     */
    parse(text) {
        // Check for empty string
        if (text.trim() === '')
            return null;

        // Reset the lineNum
        this._lineNum = 0;

        const lines = IndentParser.getLines(text);
        if (!lines || !lines.length)
            return null;

        const offset = IndentParser.getPadding(lines[0]);

        // If input text has only one line, set to default padding
        const indent = lines.length === 1 ? this.defaultPadding : IndentParser.getPadding(lines[1]) - offset;

        const ulMap = {};

        while (this._lineNum < lines.length) {
            // Save the parent line number so that we can set it later,
            // as this._lineNum will keep incrementing inside this._getItem
            const parentLine = this._lineNum;
            
            const root = this._getItem(lines, offset, indent, ulMap);
            ulMap[parentLine] = root;

            ++this._lineNum;
        }

        return ulMap;
    }
}

module.exports = IndentParser;