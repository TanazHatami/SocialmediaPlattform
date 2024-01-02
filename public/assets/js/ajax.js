'use strict';
import settings, { user, elementsDesk } from "./settings.js";
import render from "./render.js";
const ajax = {
    checkUserName(user) {
        return fetch('/checkUserName', {
            method: 'post',
            body: user
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'error') {
                    return true
                } else return false
            }
        )
    },
    saveNewUser(user) {
        return fetch('/saveNewUser', {
            method: 'put',
            body: user
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'success') return res.data
                else throw (new Error(res.err));
            }
        )
    },
    login(user) {
        return fetch('/login', {
            method: 'post',
            body: user
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'success') {
                    const id=res.data[0].id;
                    const username=res.data[0].username;
                    const fullname=res.data[0].fullname;
                    localStorage.setItem('id',JSON.stringify(id));
                    localStorage.setItem('username',JSON.stringify(username));
                    localStorage.setItem('fullname',JSON.stringify(fullname));

                    window.location.href = `desk.html`
                }
                else if (res.status == 'not-exist') throw (new Error(res.err));
            }
        ).catch(
            console.warn
        )
    },
    saveNewPost(content) {
        return fetch('/saveNewPost', {
            method: 'put',
            body: content
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log(res.data);
                if (res.status == 'success') return res.data
                else throw (new Error(res.err));
            }
        )
    },
    getAllPosts(id){
        fetch('/getAllPosts', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({id})
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status == 'success') return res.data
                else throw (new Error(res.err));
            }
        ).then(
            render.showAllPosts
        ).catch(
            console.warn
        )
    }
}
export default ajax;
export const checkUserName = ajax.checkUserName;
export const saveNewUser = ajax.saveNewUser;
export const login = ajax.login;
export const saveNewPost = ajax.saveNewPost;
export const getAllPosts = ajax.getAllPosts;
