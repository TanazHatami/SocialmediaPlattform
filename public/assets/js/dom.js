'use strict';

const dom = {
    create({
        content = '',
        type = 'div',
        parent = false,
        classes = [],
        attr = {},
        listeners = {},
        styles = {},
        amEnde = true,
        id=false
    } = {}) {
        let neu = document.createElement(type);
        if (content) neu.innerHTML = content;
        if (id) neu.id = id;
        if (classes.length) neu.className = classes.join(' ');

        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(style => neu.style[style[0]] = style[1]);
    
        if (parent) {
            if (!amEnde) parent.prepend(neu);
            else parent.append(neu);
        }
    
        return neu;
    },
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
}

export default dom;
export let create = dom.create;
export let $ = dom.$;
export let $$ = dom.$$;