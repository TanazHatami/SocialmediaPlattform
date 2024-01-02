'use strict';
import { create, $, $$ } from './dom.js';
import settings, { elementsRegister } from './settings.js';
import ajax, { checkUserName, saveNewUser } from './ajax.js';
import render from './render.js';
import component, { textbox, btn, error } from './component.js';

// FUNKTIONEN
const domMapping = () => {
    elementsRegister.main = $('main');
    // elementsRegister.form = $('form');
}
const loadform = () => {
    elementsRegister.form = create({
        type: 'form',
        parent: elementsRegister.main,
        classes: [''],
        listeners:{'submit':formHandler}
    });
    textbox(elementsRegister.form, 'E-mail', 'email');
    textbox(elementsRegister.form, 'Full Name', 'fullname');
    textbox(elementsRegister.form, 'Usename', 'username');
    textbox(elementsRegister.form, 'Password', 'password');
    btn(elementsRegister.form, 'Register');
}
const formHandler = evt => {
    evt.preventDefault();
    //Wenn bereits ein Fehler aufgetreten ist
    if ($('.error-div')) {
        $('.error-div').remove();
    }
    //zuerst check username,dann speichern
    const user = new FormData(elementsRegister.form);
    checkUserName(user).then(
        res => {
            if (!res) {
                saveNewUser(user).then(
                    render.showNewUser
                ).catch(err => {
                    error(elementsRegister.form, 'Sorry, there was an error while registering your new account.<br>Please Try again.')
                })
            } else {
                error(elementsRegister.form, `The username is already exists.Please Try again.`)
            }
        }).catch(err => {
            error(elementsRegister.form, 'Sorry, there was an error while checking the username availability.')
        })

}

const appendEventlisteners = () => {
}
const init = () => {
    domMapping();
    appendEventlisteners();
    loadform();

}

// INIT
init();