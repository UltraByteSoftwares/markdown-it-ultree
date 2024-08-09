class FoldableUL {
    static _getItem(item, ulMap) {
        let str = '<li>';
        let hasChildren = item.children && item.children.length ? true: false;

        str += hasChildren ? '<details open><summary>' : ''; 
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
    generate(ulMap) {
        // Get the root
        const root = ulMap[0];
        return `<ul>${FoldableUL._getItem(root, ulMap)}</ul>`
    }
}

module.exports = FoldableUL;