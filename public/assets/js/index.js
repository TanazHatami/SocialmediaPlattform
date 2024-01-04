'use strict';
import { create, $, $$ } from './dom.js';
import settings, { elementsIndex } from './settings.js';
import ajax, { login } from './ajax.js';
import component, { homePage,error } from './component.js';

// FUNKTIONEN
const domMapping = () => {
    elementsIndex.main = $('main');
}
const loadPage = () => {
    homePage(formHandler);
}
const formHandler = evt => {
    evt.preventDefault();
    const user = new FormData(elementsIndex.form);
    const formData = Object.fromEntries(user);
    let validity = 0;
    for (let key in formData) {
        if (formData[key] == '')
            validity++;
    }
    //Wenn alle Felder ausgefüllt sind
    if (!validity) {
        login(user)
    } else {
        elementsIndex.form.divErr.innerHTML = '';
        error( elementsIndex.form.divErr, 'Please enter all information.')
    }
}
const appendEventlisteners = () => {
    window.addEventListener('load', loadPage);

}

const init = () => {
    domMapping();
    appendEventlisteners();

}

// INIT
init();
