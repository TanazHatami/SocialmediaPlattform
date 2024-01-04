'use strict';
import settings, { user, elementsDesk } from "./settings.js";
import { create, $, $$ } from './dom.js';
import component, { deskHeader, deskPanel, newPost } from './component.js';
import ajax, { saveNewPost, getAllUsers } from './ajax.js';
import render from "./render.js";
// FUNKTIONEN
let socket = io.connect();
const domMapping = () => {
    elementsDesk.main = $('main');
}
const loadHeader = () => {
    deskHeader(elementsDesk.main, user.username, user.fullname, logout);
}
const logout = () => {
    localStorage.clear();
}
const loadPanel = () => {
    deskPanel(elementsDesk.main, createPost);
}
const createPost = () => {
    newPost(elementsDesk.main, formHandler, closeForm)
}
const formHandler = evt => {
    evt.preventDefault();
    elementsDesk.form = $('form');
    const content = new FormData(elementsDesk.form);
    const formData = Object.fromEntries(content);
    let validity = 0;
    for (let key in formData) {
        if (key == 'illu') {
            continue;
        }
        else {
            if (formData[key] == ''){
                validity++;
            }
        }
    }
    //Wenn nur ein Feld ausgefüllt ist
    if (validity ==0 || formData.illu.size > 0) {
        content.append('userId', user.id);
        content.append('username', user.username);
        saveNewPost(content).then(
            () => newPostMsg()
        )
            .catch(console.warn);
        closeForm();
    }
    else {
        closeForm();
    }
}
const newPostMsg = () => {
    socket.emit('msgNewPost', {
        userId: user.id
    });
}

const closeForm = () => {
    $('.card-container').remove();

}
const updatePage = msg => {

    render.showAllPosts(msg)
}
const appendEventlisteners = () => {

}
const updateUsers = () => {
    socket.emit('newUserMsg');
}
const appendSocketEventlisteners = () => {
    socket.on('msgUpdate', updatePage);
    socket.on('msgUpdateUser', msgUpdateUser);
}
const msgUpdateUser = users => {
    render.showAllUsers(users)
}
const init = () => {

    user.id = localStorage.getItem('id');
    user.username = JSON.parse(localStorage.getItem('username'));
    user.fullname = JSON.parse(localStorage.getItem('fullname'));
    domMapping();
    appendEventlisteners();
    loadHeader();
    loadPanel();
    newPostMsg();
    getAllUsers();
    appendSocketEventlisteners();
    setInterval(updateUsers, 1000);

}
// INIT
init();