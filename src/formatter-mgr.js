const FoldableUL = require('./formatters/foldable-ul.js');
const SimpleUL = require('./formatters/simple-ul.js');

class FormatterMgr {
    static _instance = null;

    constructor() {
        this._formatters = {};
        this._loadFormatters();
    }

    /**
     * Get the instance of FormatterMgr
     * @returns {FormatterMgr}
     */
    static getInstance() {
        if (!FormatterMgr._instance)
            FormatterMgr._instance = new FormatterMgr();

        return FormatterMgr._instance;
    }

    /**
     * Check if a key is valid
     * @param {string} formatter
     * @returns {boolean} 
     */
    isValid(formatter) {
        return formatter in this._formatters;
    }

    _loadFormatters() {
        this._formatters['foldable'] = new FoldableUL();
        this._formatters['simple'] = new SimpleUL();
    }

    /**
     * Get the instance of formatter
     * @param {string} formatter 'foldable' | 'simple'
     * @returns {Object} Formatter
     */
    getFormatter(formatter) {
        return this._formatters[formatter];
    }
}

module.exports = FormatterMgr;
