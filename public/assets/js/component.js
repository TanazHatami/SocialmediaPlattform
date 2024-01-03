'use strict';
import { create, $, $$ } from './dom.js';
import { elementsDesk, elementsIndex,elementsRegister } from './settings.js';

const component = {
    homePage() {
        const row = create({
            parent: elementsIndex.main,
            classes: ['row vh-100 m-0']
        });
        const col1 = create({
            parent: row,
            classes: ['col-md-6 col-12 vh-100 position-relative'],
            id:'coll'
        });
        let image=create({
            type:'img',
            parent:col1,
            classes:['imghome']
        });
        image.src='./assets/img/homepage.png'
        const col2 = create({
            parent: row,
            classes: ['col-md-6 col-12 vh-100 position-relative']
        });
        const box=create({
           parent:col2,
           classes:['border border-dark-subtle div-form rounded'],
        });
       return box;
    },
    textBox(parent, placeholder,name) {
        const div = create({
            parent:parent,
            classes:['form-outline mt-5']
        });
        const input = create({
            type:'input',
            parent:div,
            classes:['form-control'],
            attr:{name:name,placeholder:placeholder}
        });
    },
    btn(parent,content){
        const button = create({
            content:content,
            parent:parent,
            type:'button',
            classes:['btn btn-primary my-5']
        });
        return btn;
    },
    error(parent,content){
        const div=create({
            parent:parent,
            classes:['error-div']
        });
        create({
            type:'label',
            parent:div,
            content:content,
            classes:['form-label']
        })
    },
    success(parent,titel){
        const div=create({
            parent:parent,
            classes:['container-success']
        });
        create({
            parent:div,
            type:'h2',
            content:titel,
            classes:['']
        });
       
        return div;
    },
    label(parent,titel,content){
        const div=create({
            parent:parent,
            classes:['row']
        });
        create({
            parent:div,
            type:'h5',
            content:titel,
            classes:['col-12 col-lg-4 form-label']
        });
            create({
               parent:div,
               type:'p',
               content:content,
               classes:['col-12 col-lg-8 form-label']
           });
          
    },
    deskHeader(parent,username,fullname,logout,home){
        const div=create({
            type:'header',
            parent:parent,
            classes:['header-container row']
        });
        const colLeft=create({
            parent:div,
            classes:['col-4']
        });
        create({
            type:'h1',
            parent:colLeft,
            content:username
        });
        create({
            type:'p',
            parent:colLeft,
            content:fullname
        });
        const colCernter=create({
            parent:div,
            classes:['col-4']
        });
        const colRight=create({
            parent:div,
            classes:['col-4 d-flex justify-content-end']
        });
        create({
            type:'a',
            parent:colRight,
            content:'Logout',
            attr:{href:'../index.html'},
            listeners:{'click':logout}
        })
    },
    deskPanel(parent,createPost){
        const div=create({
            parent:parent,
            classes:['']
        });
        const row=create({
            parent:div,
            classes:['row justify-content-center']
        });
        const colLeft=create({
            parent:row,
            classes:['col-3 panel-container']
        });
        const colCernter=create({
            parent:row,
            classes:['col-6 panel-container']
        });
       
        const rowCenter=create({
            parent:colCernter,
            classes:['row']
        });
        const colNewPost=create({
            parent:rowCenter,
            classes:['col-12']
        });
        const button = create({
            content:'Start a post...',
            parent:colNewPost,
            type:'button',
            classes:['btn btn-primary w-100'],
            listeners:{'click':createPost}
        });
        const colPosts=create({
            parent:rowCenter,
            classes:['col-12']
        });
        elementsDesk.panelPost=colPosts;
       const colRight=create({
            parent:row,
            classes:['col-3 panel-container']
        });
    },
    newPost(parent,formHandler,closeForm){
        const div=create({
            parent:parent,
            classes:['card-container']
        });
        const card=create({
            parent:div,
            classes:['createpost_container']
        });
        const rowTitel=create({
            parent:card,
            classes:['row']
        });
        const colTitel=create({
            parent:rowTitel,
            classes:['col-10']
        });
        create({
            type:'h2',
            parent:colTitel,
            content:'Create Post',
            classes:['pt-2']
        });
        const colClose=create({
            parent:rowTitel,
            classes:['col-2 text-center']
        });
        create({
            type:'h2',
            parent:colClose,
            classes:['btn-close'],
            listeners:{'click':closeForm}           
        });
        const rowForm=create({
            parent:card,
            classes:['row']
        });
        const colform=create({
            parent:rowForm,
            classes:['col-12']
        });
        const form=create({
            parent:colform,
            type:'form',
            classes:[''],
            listeners:{'submit':formHandler}
        });
        const divText = create({
            parent:form,
            classes:['form-outline mb-4']
        });
        const input = create({
            type:'textarea',
            parent:divText,
            classes:['form-control'],
            attr:{name:'text',placeholder:'What are you doing right now?',rows:'8',cols:'50'},
            styles:{resize:'none'}
        });
        const divfile = create({
            parent:form,
            classes:['form-outline mb-4']
        });
        const file=create({
            type:'input',
            parent:divfile,
            attr:{type:'file', accept:'image/*',name:'illu'}
        });
        const button = create({
            content:'post',
            parent:form,
            type:'button',
            classes:['btn btn-primary w-100']
        });
    }
}
export default component;
export const textbox = component.textBox;
export const homePage = component.homePage;
export const btn = component.btn;
export const error = component.error;
export const success = component.success;
export const label = component.label;
export const deskHeader = component.deskHeader;
export const deskPanel = component.deskPanel;
export const newPost = component.newPost;