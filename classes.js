'use strict';

class Users {
    constructor(email, fullname, username, password, id) {
        Object.assign(this, { email, fullname, username, password, id });
        this.crDate = Date.now();
    }
}
class Content {
    constructor(text, illu,userId) {
        Object.assign(this, { text})
        if (illu[0].size > 0) {
            this.illu = illu[0].newFilename;
        }
this.userId=userId[0]
        this.crDate = Date.now();
    }
}
const classes = {
    Users,
    Content
}

export default classes;