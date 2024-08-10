/**
 * Class to create a ul tree in html. The tree must have
 * only one root
 */
class SimpleUL {
    static _getItem(item, ulMap) {
        let str = '<li>'
        str += `${item.text}`

        if (item.children && item.children.length) {
            str += '<ul>';

            for (let id of item.children) {
                const child = ulMap[id];

                str += SimpleUL._getItem(child, ulMap);
            }

            str += '</ul>';
        }

        str += '</li>';

        return str;
    }
    /**
     * 
     * @param {Object} ulMap
     * @param {Object} opts Additional options 
     */
    generate(ulMap, opts = null) {
        // Get the root
        const root = ulMap[0];
        return `<ul>${SimpleUL._getItem(root, ulMap)}</ul>`
    }
}

module.exports = SimpleUL;