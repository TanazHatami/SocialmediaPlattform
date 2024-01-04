'use strict';

import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import formidable from 'formidable';
import nano from 'nano';
import fs from 'fs';
import classes from './classes.js';
const expressServer = express();
expressServer.use(express.static('public', {
    extensions: ['html']
}));
expressServer.use(express.json());
const dbNames = {
    users: 'users',
    posts: 'posts'
}
let db;
// HTTP
const httpServer = http.Server(expressServer);
// Websocket
const io = new Server(httpServer);
io.on('connect', socket => {

    socket.on('msgNewPost', data => {
        data.socketId = socket.id;
        const userId = data.userId;
        let dbPosts = db.use(dbNames.posts);
        return dbPosts.list({
            include_docs: true
        }).then(
            res => res.rows.map(row => row.doc)
        ).then(
            res => {
                io.emit('msgUpdate', res);
            }
        ).catch(
            err => {
                io.emit('msgUpdate', err);
            }
        )
    });
    socket.on('newUserMsg', data => {
        let dbUsers = db.use(dbNames.users);
        dbUsers.list({
            include_docs: true
        }).then(
            res => res.rows.map(row => row.doc.username)
        ).then(
            res => {
                io.emit('msgUpdateUser', res);
            }
        ).catch(
            console.warn
        )
    })
})
// Routen
expressServer.post('/checkUserName', (request, response) => {
    const myForm = formidable();
    myForm.parse(request, (err, fields) => {
        if (err) {    // Fehlerbehandlung
            console.log(err);
            response.json({
                status: 'err',
                err
            })
        } else {     // Alles gut
            let dbUsers = db.use(dbNames.users);
            dbUsers.list({
                include_docs: true
            }).then(
                res => res.rows.map(row => row.doc.username)
            ).then(usernames => usernames.includes(fields.username[0]))
                .then(res => {
                    if (res) {
                        throw new Error('exist');
                    } else {
                        response.json({
                            status: 'not-exist',
                            data: fields
                        })
                    }
                })
                .catch(err => {
                    response.json({
                        status: 'error',
                        message: err.message
                    });
                });
        }
    })
})
expressServer.put('/saveNewUser', (request, response) => {
    const myForm = formidable();
    myForm.parse(request, (err, fields) => {
        if (err) {    // Fehlerbehandlung
            console.log(err);
            response.json({
                status: 'err',
                err
            })
        } else {     // Alles gut
            let dbUsers = db.use(dbNames.users);
            return dbUsers.list({
                include_docs: true
            }).then(
                res => res.rows.map(row => row.doc.id)
            ).then(
                res => {
                    if (res.length) return Math.max(...res)
                    else return 0
                }
            ).then(
                res => res + 1
            ).then(
                newUser => {
                    return new classes.Users(
                        fields.email[0],
                        fields.fullname[0],
                        fields.username[0],
                        fields.password[0],
                        newUser
                    )
                }
            ).then(
                newUser => {
                    dbUsers.insert(newUser).then(
                        res => {
                            response.json({
                                status: 'success',
                                data: newUser
                            })
                        }
                    ).catch(
                        err => {
                            // Falls der Datensatz nicht geschrieben weden konnte
                            response.json({
                                status: 'err',
                                err
                            })
                            console.warn(err);
                        })
                }
            )
        }
    })
})
expressServer.post('/login', (request, response) => {
    const myForm = formidable();

    myForm.parse(request, (err, fields) => {

        if (err) {    // Fehlerbehandlung
            console.log(err);
            response.json({
                status: 'err',
                err
            })
        } else {     // Alles gut
            let dbUsers = db.use(dbNames.users);
            return dbUsers.find({
                selector: {
                    username: {
                        '$eq': fields.username[0]
                    },
                    password: {
                        '$eq': fields.password[0]
                    }
                }
            }).then(
                res => res.docs
            ).then(
                res => {
                    if (res.length) {
                        response.json({
                            status: 'success',
                            data: res
                        })
                    } else {
                        throw new Error('not-exist');
                    }
                }
            ).catch(err => {
                response.json({
                    status: 'error',
                    message: err.message
                });
            });
        }
    })
})
expressServer.put('/saveNewPost', (request, response) => {
    const myForm = formidable({
        uploadDir: 'public/assets/img/uploads/',
        keepExtensions: true,
        allowEmptyFiles: true,
        minFileSize: 0
    });

    myForm.parse(request, (err, fields, files) => {
        if (err) {    // Fehlerbehandlung
            console.log(err);
            response.json({
                status: 'err',
                err
            })
        } else {
            const content = (new classes.Content(
                fields.text[0],
                files.illu,
                fields.userId,
                fields.username
            ))
            // Leere Dateien löschen
            if (files.illu[0].size == 0) {
                fs.unlink(files.illu[0].filepath, (err) => {
                    if (err) {
                        console.log('Fehler beim Löschen des Files:', err);
                    }
                });
            }
            // Contents in Datenbank speichern
            let dbPosts = db.use(dbNames.posts);

            dbPosts.insert(content).then(
                () => dbPosts.list({
                    include_docs: true
                })
            ).then(
                res => response.json({
                    status: 'success',
                    data: content
                })
            ).catch(
                err => {
                    // Falls der Datensatz nicht geschrieben weden konnte
                    response.json({
                        status: 'err',
                        err
                    })
                    console.warn(err);
                }
            )

        }
    })
})
expressServer.post('/getUserInfo', (request, response) => {
    const userId = request.body.id;
    let dbUsers = db.use(dbNames.users);
    return dbUsers.find({
        selector: {
            id: {
                '$eq': +userId
            }
        }
    }).then(
        res => res.docs
    ).then(
        res => response.json({
            status: 'success',
            data: res
        })
    ).catch(
        err => {
            response.json({
                status: 'err',
                err
            })
            console.warn(err);
        }
    )
})
expressServer.get('/getAllUsers', (request, response) => {
    // Alles gut
    let dbUsers = db.use(dbNames.users);
    return dbUsers.list({
        include_docs: true
    }).then(
        res => res.rows.map(row => row.doc.username)
    ).then(res => {
        response.json({
            status: 'success',
            data: res
        })
    }
    )
        .catch(err => {
            response.json({
                status: 'error',
                message: err
            });
        });
})
//
const loadCredentials = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            './credentials.json',
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Anmeldedaten aus einer JSON-Datei laden, zu einem Objekt umwandeln
                    let credentials = JSON.parse(data.toString());
                    resolve(credentials);
                }
            }
        )
    })
}
const init = () => {
    // Funktion zum Laden der Credentials aufrufen
    loadCredentials().then(
        credentials => {
            // Verbindung zur Datenbank herstellen
            db = nano(`http://${credentials.user}:${credentials.password}@127.0.0.1:5984`).db;
        }
    ).then(
        // Liste aller DB laden
        () => db.list()
    ).then(
        res => {
            // Falls die gewünschte Datenbank nicht existiert, bitte anlegen
            if (!res.includes(dbNames.users)) {
                 db.create(dbNames.users)
            }
            if (!res.includes(dbNames.posts)) {
                 db.create(dbNames.posts)
            }
        }
    ).then(
        () => {
            httpServer.listen(80, err => console.log(err || 'Server läuft'));
        }
    )
}

init();