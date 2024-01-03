'use strict';
import settings, { user, elementsDesk } from "./settings.js";
import { create, $, $$ } from './dom.js';
import component, { deskHeader, deskPanel, newPost } from './component.js';
import ajax, { saveNewPost } from './ajax.js';
import render from "./render.js";
// FUNKTIONEN
let socket=io.connect();
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
    content.append('userId', user.id);
    content.append('username', user.username);
    saveNewPost(content).then(
            () => newPostMsg()
        )
        .catch(console.warn);
    closeForm();
}
const newPostMsg = () => {
    // Nachricht über Websocket versenden
    socket.emit('msgNewPost', {
        userId:user.id
    });
}

const closeForm = () => {
    $('.card-container').remove();
   
}
const updatePage=msg=>{
    render.showAllPosts(msg)
}
const appendEventlisteners = () => {
   
}
const appendSocketEventlisteners = () => {
    socket.on('msgUpdate', updatePage);
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
    appendSocketEventlisteners();
}

// INIT
init();