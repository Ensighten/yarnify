module.exports = function (prefix, src) {
    var elem = document.createElement('div');
    var className = prefix.slice(0, -1);
    elem.setAttribute('className', prefix + '_container') ||
        elem.setAttribute('class', prefix + '_container');
    elem.innerHTML = src;

    var nodes = elem.getElementsByTagName('*');

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var c = node.getAttribute('class');
        if (c) {
            var cn = c.split(/\s+/)
                .map(function (x) { return  prefix + x })
                .concat(className)
                .join(' ');
            node.setAttribute('className', cn) ||
                node.setAttribute('class', cn);
        }
        else {
            node.setAttribute('className', className) ||
                node.setAttribute('class', className);
        }

        var id = node.getAttribute('id');
        if (id) node.setAttribute('id', prefix + id);
    }

    return elem;
};
