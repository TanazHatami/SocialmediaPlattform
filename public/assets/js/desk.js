'use strict';
import settings, { user, elementsDesk } from "./settings.js";
import { create, $, $$ } from './dom.js';
import component, { deskHeader, deskPanel, newPost } from './component.js';
import ajax, { saveNewPost, getAllPosts } from './ajax.js';
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
    saveNewPost(content)
        .then(() => getAllPosts(user.id))
        .catch(console.warn);
    closeForm();
    sendMsg();
    // showData();
}
const sendMsg = () => {
    // Nachricht über Websocket versenden
    socket.emit('msgFromClient', {
        userId:user.id
    });
}

const closeForm = () => {
    $('.card-container').remove();
}
const renderMsg=msg=>{
    console.log(msg.socketId);
}
const appendEventlisteners = () => {
   
}
const appendSocketEventlisteners = () => {
    socket.on('msgFromServer', renderMsg);
}
const init = () => {
    user.id = localStorage.getItem('id');
    user.username = JSON.parse(localStorage.getItem('username'));
    user.fullname = JSON.parse(localStorage.getItem('fullname'));
    console.log(user.id);
    domMapping();
    appendEventlisteners();
    loadHeader();
    loadPanel();
    getAllPosts(user.id);
    appendSocketEventlisteners();
    sendMsg();
}

// INIT
init();