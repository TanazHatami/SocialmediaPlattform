'use strict';
import settings, { elementsRegister, elementsDesk } from './settings.js';
import component, { label, success } from './component.js';
import { create, $, $$ } from './dom.js';

const render = {
    homePage() {
    },
    showNewUser(newUser) {
        elementsRegister.main.innerHTML = '';
        const div = success(
            elementsRegister.main,
            'The user was successfully saved',
        );
        label(div, 'E-Mail:', newUser.email);
        label(div, 'Full Name:', newUser.fullname);
        label(div, 'Username:', newUser.username);
        create({
            parent: div,
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
                classes: ['container']
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
                content: post.text
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
                content: new Date(post.crDate).toLocaleDateString(),
                classes:['date']
            });


        })
    }
}
export default render;
