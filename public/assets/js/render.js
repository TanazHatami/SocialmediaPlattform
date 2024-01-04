'use strict';
import settings, { elementsIndex, elementsRegister, elementsDesk,user } from './settings.js';
import component, { error } from './component.js';
import { create, $, $$ } from './dom.js';
const render = {
    showError(err) {
        elementsIndex.form.divErr.innerHTML = '';
        error(elementsIndex.form.divErr, err)
    },
    showNewUser(newUser) {
        elementsRegister.main.innerHTML = '';
        const div = create({
            parent: elementsRegister.main,
            classes: ['container-success']
        });
        const row = create({
            parent: div,
            classes: ['row']
        });
        const colTitel = create({
            parent: row,
            classes: ['col-12']
        });
        create({
            type: 'p',
            parent: colTitel,
            content: 'The user was successfully saved',
            classes: ['form-label titel']
        });
        //Email
        const colEmailt = create({
            parent: row,
            classes: ['col-12 mb-3']
        });
        create({
            type: 'h5',
            parent: colEmailt,
            content: 'E-Mail',
            classes: ['form-label']
        });
        const colEmailv = create({
            parent: row,
            classes: ['col-12  mb-4']
        });
        create({
            type: 'p',
            parent: colEmailv,
            content: newUser.email,
            classes: ['form-label']
        });
        //Fullname
        const colFullnamet = create({
            parent: row,
            classes: ['col-12 mb-3']
        });
        create({
            type: 'h5',
            parent: colFullnamet,
            content: 'Fullname',
            classes: ['form-label']
        });
        const colFullnamev = create({
            parent: row,
            classes: ['col-12  mb-4']
        });
        create({
            type: 'p',
            parent: colFullnamev,
            content: newUser.fullname,
            classes: ['form-label']
        });
        //Username
        const colUsernamet = create({
            parent: row,
            classes: ['col-12  mb-3']
        });
        create({
            type: 'h5',
            parent: colUsernamet,
            content: 'Fullname',
            classes: ['form-label']
        });
        const colUsernamev = create({
            parent: row,
            classes: ['col-12  mb-4']
        });
        create({
            type: 'p',
            parent: colUsernamev,
            content: newUser.username,
            classes: ['form-label']
        });
        //link
        const colLink = create({
            parent: row,
            classes: ['col-12']
        });
      
        create({
            parent: colLink,
            type: 'a',
            content: 'Back to Login',
            attr: { href: '../index.html' }
        })
    },
    showAllPosts(contents) {
        elementsDesk.panelPost.innerHTML = '';
        contents.reverse();
        contents.map(post => {
            const div = create({
                parent: elementsDesk.panelPost,
                classes: ['container-post']
            });
            const rowUser = create({
                parent: div,
                classes: ['row']
            });
            const colUser = create({
                parent: rowUser,
                classes: ['col-12']
            });
            create({
                type: 'h2',
                parent: colUser,
                content: post.username,
                classes: ['username', post.userId==user.id ? 'myPost' : 'notMyPost']
            });
            //nur wenn ein img speichert wurde
            if (post.hasOwnProperty('illu')) {
                const rowImg = create({
                    parent: div,
                    classes: ['row']
                });
                const colImg = create({
                    parent: rowImg,
                    classes: ['col-12']
                });
                create({
                    type: 'img',
                    parent: colImg,
                    attr: { src: `/assets/img/uploads/${post.illu}` },
                    classes: ['illu']
                });
            }
            const rowText = create({
                parent: div,
                classes: ['row']
            });
            const colText = create({
                parent: rowText,
                classes: ['col-12']
            });
            create({
                type: 'p',
                parent: colText,
                content: post.text,
                classes: ['text']
            });

            const rowDate = create({
                parent: div,
                classes: ['row']
            });
            const colDate = create({
                parent: rowDate,
                classes: ['col-12']
            });
            create({
                type: 'p',
                parent: colDate,
                content: new Date(post.crDate).toLocaleString(),
                classes: ['date']
            });


        })
    },
    showAllUsers(users){
        elementsDesk.members.innerHTML='';
        create({
            type:'h3',
            parent:elementsDesk.members,
            content:`${users.length} Members`
        });
        users.map(user=>{
            const row=create({
                parent:elementsDesk.members,
                classes:['row m-0 px-3']
            });
            const col=create({
                parent:row,
                classes:['col']
            });
            create({
                type:'p',
                parent:col,
                content:user
            });
        })
    }
}
export default render;
