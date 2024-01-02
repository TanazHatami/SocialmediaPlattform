'use strict';
import { create, $, $$ } from './dom.js';
import settings,{elementsIndex} from './settings.js';
import ajax,{login} from './ajax.js';
// import render,{homePage} from './render.js';
import component,{homePage,textbox,btn, label} from './component.js';


// FUNKTIONEN
const domMapping = () => {
    elementsIndex.main = $('main');
}
const loadPage=()=>{
    const box=homePage();
    elementsIndex.form=create({
        type:'form',
        parent:box,
        classes:['px-3 text-center'],
        listeners:{'submit':formHandler}
    });
    textbox(elementsIndex.form, 'Username', 'username');
    textbox(elementsIndex.form, 'Password', 'password');
    const p=create({
        type:'p',
        parent:elementsIndex.form,
        content:'Do not have an account?',
        classes:['form-label']
    });
    create({
        type:'a',
        parent:p,
        content:'Sing up',
        attr:{href:'/register.html'}
    })
    btn(elementsIndex.form, 'Log in');
}
const formHandler=evt=>{
    evt.preventDefault();
    const user = new FormData(elementsIndex.form);
    login(user).then(
    ).catch(
        err=>console.warn
    )
}
const appendEventlisteners = () => {
window.addEventListener('load',loadPage);

}

const init = () => {
    domMapping();
    appendEventlisteners();
    // socket=io.connect();
   

}

// INIT
init();