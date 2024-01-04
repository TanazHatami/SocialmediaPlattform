'use strict';
import { create, $, $$ } from './dom.js';
import settings, { elementsRegister } from './settings.js';
import ajax, { checkUserName, saveNewUser } from './ajax.js';
import render from './render.js';
import component, { formRegister, error } from './component.js';
// import socket from './desk.js';
let socket=io.connect();
// FUNKTIONEN
const domMapping = () => {
    elementsRegister.main = $('main');
    // elementsRegister.form = $('form');
}
const loadform = () => {
    formRegister(elementsRegister.main,formHandler)
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
                ).then(
                    newUserMsg()
                ).catch(err => {
                    error(elementsRegister.form, 'Sorry, there was an error while registering your new account.<br>Please Try again.')
                })
            } else {
                error(elementsRegister.form, `The username is already exists. Please Try again.`)
            }
        }).catch(err => {
            error(elementsRegister.form, 'Sorry, there was an error while checking the username availability.')
        })

}
const newUserMsg = () => {
    socket.emit('newUserMsg');
}

const appendEventlisteners = () => {
   
}
const appendSocketEventlisteners = () => {
   
}

const init = () => {
    domMapping();
    appendEventlisteners();
    loadform();
    appendSocketEventlisteners();
}

// INIT
init();