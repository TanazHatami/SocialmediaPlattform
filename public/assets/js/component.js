'use strict';
import { create, $, $$ } from './dom.js';
import { elementsDesk, elementsIndex,elementsRegister } from './settings.js';

const component = {
    homePage(formHandler) {
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
        image.src='./assets/img/logo.png'
        const col2 = create({
            parent: row,
            classes: ['col-md-6 col-12 vh-100 position-relative']
        });
      
        elementsIndex.form=create({
            type:'form',
            parent:col2,
            classes:['px-3 py-5 text-center'],
            listeners:{'submit':formHandler}
        });
        const divTitel = create({
            parent: elementsIndex.form,
            classes:['mb-4']
        });
        create({
            type:'h1',
            parent:divTitel,
            content:'Eligram',
            classes:['titel']
        })
        textbox(elementsIndex.form, 'Username', 'username');
        passbox(elementsIndex.form, 'Password', 'password');
        btn(elementsIndex.form, 'Log in','w-100');
        const p=create({
            type:'p',
            parent:elementsIndex.form,
            content:'Do not have an account? ',
            classes:['form-label mb-4']
        });
        create({
            type:'a',
            parent:p,
            content:'Sing up',
            attr:{href:'/register.html'}
        })
        elementsIndex.form.divErr=create({
        parent:(elementsIndex.form)
       })
    },
    textBox(parent, placeholder,name) {
        const div = create({
            parent:parent,
            classes:['form-outline mb-4']
        });
        const input = create({
            type:'input',
            parent:div,
            classes:['form-control'],
            attr:{name:name,placeholder:placeholder}
        });
    },
    passbox(parent, placeholder,name) {
        const div = create({
            parent:parent,
            classes:['form-outline mb-4']
        });
        const input = create({
            type:'input',
            parent:div,
            classes:['form-control'],
            attr:{type:'password',name:name,placeholder:placeholder}
        });
    },
    btn(parent,content,cl){
        const button = create({
            content:content,
            parent:parent,
            type:'button',
            classes:[`btn btn-primary mb-4 ${cl}`]
        });
        return btn;
    },
    formRegister(parent,formHandler){
        elementsRegister.form = create({
            type: 'form',
            parent:  parent,
            classes: ['p-3'],
            listeners: { 'submit': formHandler }
        });
        create({
            type: 'label',
            content: 'Sign up to see your friends photos.',
            classes: ['form-label titel mb-4'],
            parent: elementsRegister.form
        })
        textbox(elementsRegister.form, 'E-mail', 'email');
        textbox(elementsRegister.form, 'Full Name', 'fullname');
        textbox(elementsRegister.form, 'Usename', 'username');
        textbox(elementsRegister.form, 'Password', 'password');
        btn(elementsRegister.form, 'Register', 'w-100');
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
        // const div=create({
        //     parent:parent,
        //     classes:['']
        // });
        const row=create({
            parent:parent,
            classes:['row justify-content-around m-0']
        });
        const colLeft=create({
            parent:row,
            classes:['col-3 panel-container']
        });
        const colCernter=create({
            parent:row,
            classes:['col-5 panel-container']
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
            content:'Start a post ...',
            parent:colNewPost,
            type:'button',
            classes:['btn btn-primary w-100'],
            listeners:{'click':createPost}
        });
        elementsDesk.panelPost=create({
            parent:rowCenter,
            classes:['col-12']
        });
        // elementsDesk.panelPost=colPosts;
       const panelRight=create({
            parent:row,
            classes:['col-3 panel-container']
        });
         elementsDesk.members=create({
            parent:panelRight,
            classes:['panel-users-container']
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
export const passbox = component.passbox;
export const homePage = component.homePage;
export const btn = component.btn;
export const error = component.error;
export const success = component.success;
export const label = component.label;
export const deskHeader = component.deskHeader;
export const deskPanel = component.deskPanel;
export const newPost = component.newPost;
export const formRegister = component.formRegister;