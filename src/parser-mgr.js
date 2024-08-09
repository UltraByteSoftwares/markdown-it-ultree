const IndentParser = require('./parsers/indent-parser.js');

class ParserMgr {
    static _instance = null;

    constructor() {
        this._parsers = {};
        this._loadParsers();
    }

    /**
     * 
     * @returns {ParserMgr}
     */
    static getInstance() {
        if (!ParserMgr._instance)
            ParserMgr._instance = new ParserMgr();

        return ParserMgr._instance;
    }

    /**
     * Check if a key is valid
     * @param {string} parser
     * @returns {boolean} 
     */
    isValid(parser) {
        return parser in this._parsers;
    }

    _loadParsers() {
        this._parsers['indent'] = new IndentParser();
    }

    /**
     * Returns an object of parser type
     * @param {string} parser 'indent'
     * @returns A formatter object
     */
    getParser(parser) {
        return this._parsers[parser];
    }
}

module.exports = ParserMgr;