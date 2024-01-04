'use strict';
import { create, $, $$ } from './dom.js';
import settings,{elementsIndex} from './settings.js';
import ajax,{login} from './ajax.js';
import component,{homePage} from './component.js';

// FUNKTIONEN
const domMapping = () => {
    elementsIndex.main = $('main');
}
const loadPage=()=>{
    homePage(formHandler);
}
const formHandler=evt=>{
    evt.preventDefault();
    const user = new FormData(elementsIndex.form);
    login(user).then(
    ).catch(
        // err=>console.warn
    )
}
const appendEventlisteners = () => {
window.addEventListener('load',loadPage);

}

const init = () => {
    domMapping();
    appendEventlisteners();
    
}

// INIT
init();
