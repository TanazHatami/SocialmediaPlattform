'use strict';
import { create, $, $$ } from './dom.js';
import settings, { elementsRegister } from './settings.js';
import ajax, { checkUserName, saveNewUser } from './ajax.js';
import render from './render.js';
import component, { formRegister, error } from './component.js';

// FUNKTIONEN
const domMapping = () => {
    elementsRegister.main = $('main');
}
const loadform = () => {
    formRegister(elementsRegister.main, formHandler)
}
const formHandler = evt => {
    evt.preventDefault();
    //Wenn bereits ein Fehler aufgetreten ist
    if ($('.error-div')) {
        $('.error-div').remove();
    }
    const user = new FormData(elementsRegister.form);
    const formData = Object.fromEntries(user);
    let validity = 0;
    for (let key in formData) {
        if (formData[key] == '')
            validity++;
    }
    //check email
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.email.match(regexEmail)) {
        //Wenn alle Felder ausgefüllt sind
        if (!validity) {
            //zuerst check username,dann speichern
            checkUserName(user).then(
                res => {
                    if (!res) {
                        saveNewUser(user).then(
                            render.showNewUser
                        ).catch(err => {
                            error(elementsRegister.form, 'Sorry, there was an error while registering your new account.<br>Please Try again.')
                        })
                    } else {
                        error(elementsRegister.form, `The username is already exists. Please Try again.`)
                    }
                }).catch(err => {
                    error(elementsRegister.form, 'Sorry, there was an error while checking the username availability.')
                })

        } else {
            error(elementsRegister.form, 'Please enter all information.')
        }
    }else{
        error(elementsRegister.form, 'Please enter the correct email.')

    }

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