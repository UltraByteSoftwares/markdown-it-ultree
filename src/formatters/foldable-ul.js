class FoldableUL {
    /**
     * 
     * @param {Object} item 
     * @param {Object} ulMap 
     * @param {Object | null} opts 
     * @returns 
     */
    static _getItem(item, ulMap, opts = null) {
        let str = '<li>';
        let hasChildren = item.children && item.children.length ? true: false;

        let openStr = ' open';
        if (opts) {
            openStr = opts.open === false ? '': openStr;
        }

        str += hasChildren ? `<details${openStr}><summary>` : ''; 
        str += `${item.text}`;
        str += hasChildren ? '</summary>' : '';

        if (hasChildren) {
            str += '<ul>';

            for (let id of item.children) {
                const child = ulMap[id];

                str += FoldableUL._getItem(child, ulMap);
            }

            str += '</ul>';
        }

        str += hasChildren ? '</details>': '';
        str += '</li>';

        return str;
    }
    /**
     * 
     * @param {Object} ulMap 
     */
    generate(ulMap, opts = {open: true}) {
        // Get the root
        const root = ulMap[0];
        return `<ul>${FoldableUL._getItem(root, ulMap, opts)}</ul>`
    }
}

module.exports = FoldableUL;