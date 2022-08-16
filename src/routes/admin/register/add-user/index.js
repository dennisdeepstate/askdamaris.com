import { createHash } from 'crypto';
import database from '$lib/database.js';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import validateForm from '$/lib/validateForm';

class User {
    constructor(phone, passwordHash, isAdmin = false){
      this.phone = phone;
      this.passwordHash = passwordHash;
      this.isAdmin = isAdmin
    }
}

class UserCookie {
    constructor(cookieId, phone, ip, userAgent){
        this.cookieId = cookieId;
        this.phone = phone;
        this.ip = ip;
        this.userAgent = userAgent
    }
}

const hashPassword = (pass) =>{
    return createHash('sha256').update(pass).digest('hex');
}

export async function post(event) {
    let response = {
        status:500,
        body: { messages: [ { error:"an error occured on the server please try again later" } ] }
    };

    let form = await event.request.json();
    let formErrors = validateForm(form);
    response.body = { messages: formErrors };

    async function addUser(db) {
        const newUser = new User(form.phone, hashPassword(form.password), (form.accountType === 'admin'));
        if (await db.collection('users').findOne({ phone: newUser.phone })) {
            response.status = 409;
            response.body = { messages: [ { phone:"phone number is already registered please try to login instead" } ] };
            return;
        }
        if (await db.collection('users').insert(newUser)) {
            const cookieId = uuidv4();
            const userCookie = new UserCookie(cookieId, newUser.phone, event.clientAddress, event.request.headers.get('user-agent'));
            await db.collection('cookies').insert(userCookie);
            response.headers = {'Set-Cookie': cookie.serialize('session_id', cookieId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 2,
                sameSite: 'lax',
                path: '/'
            })}
            response.status = 200;
            response.body = { messages: [ { success:"user added successfully" } ] };
            return;
        }
    }

    if(formErrors.length === 0) await database(addUser);

    return {
        headers: response.headers,
        status: response.status,
        body: JSON.stringify(response.body)
    }
}