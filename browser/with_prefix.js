module.exports = function withPrefix (prefix, elem) {
    function wrap (e) {
        if (!e) return e
        if (e && e.length) {
            for (var i = 0; i < e.length; i++) {
                e[i] = withPrefix(prefix, e[i]);
            }
        }
        if (e._prefix === prefix) return e;

        return withPrefix(prefix, e);
    }

    elem._prefix = prefix;

    /*var querySelector = elem.constructor.prototype.querySelector;
    elem.querySelector = function (sel) {
        var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
            return op + prefix + c;
        });
        return wrap(querySelector.call(this, s));
    };
    if (!/MSIE 8.0/.test(navigator.userAgent)) {
        var querySelectorAll = elem.constructor.prototype.querySelectorAll;
        elem.querySelectorAll = function (sel) {
            var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
                return op + prefix + c;
            });
            return wrap(querySelectorAll.call(this, s));
        };
    }*/

    elem.addClass = function (c) {
        var cn = elem.className || elem['class'] ||
          elem.getAttribute('class') ||
          elem.getAttribute('className');
        var ps = cn.split(/\s+/);
        if (ps.indexOf(prefix + c) < 0) {
            ps.push(prefix + c);
            elem.className = ps.join(' ');
            elem['class'] = ps.join(' ');
            elem.setAttribute('className', ps.join(' ')) ||
                elem.setAttribute('class', ps.join(' '));
            cn = elem.className || elem['class'] ||
              elem.getAttribute('class') ||
              elem.getAttribute('className');
        }
    };

    elem.removeClass = function (c) {
        var ps = elem.className.split(/\s+/);
        var ix = ps.indexOf(prefix + c);
        if (ix >= 0) {
            ps.splice(ix, 1);
            elem.className = ps.join(' ');
        }
    };

    elem.hasClass = function (c) {
        var ps = elem.className.split(/\s+/);
        var ix = ps.indexOf(prefix + c) >= 0;
        return ix >= 0;
    };

    return elem;
};
