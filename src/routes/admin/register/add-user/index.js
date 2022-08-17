import { createHash, randomUUID } from 'crypto';
import database from '$lib/database.js';
import * as cookie from 'cookie';
import validateForm from '$lib/validateForm.js';

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

    async function addUser(db) {
        const newUser = new User(form.phone, hashPassword(form.password), (form.accountType === 'admin'));
        if (await db.collection('users').findOne({ phone: newUser.phone })) {
            response.status = 403;
            response.body = { messages: [ { phone:"phone number is already registered please try to login instead" } ] };
            return;
        }
        if (await db.collection('users').insert(newUser)) {
            const cookieId = randomUUID();
            const userCookie = new UserCookie(cookieId, newUser.phone, event.clientAddress, event.request.headers.get('user-agent'));
            await db.collection('cookies').insert(userCookie);
            response.headers = {'Set-Cookie': cookie.serialize('session_id', cookieId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
                path: '/'
            })}
            response.status = 200;
            response.body = { messages: [ { success:"user added successfully" } ] };
            return;
        }
    }

    if(formErrors.length > 0) {
        response.status = 403;
        response.body = { messages: formErrors };
    }else{
        await database(addUser);   
    }

    return {
        headers: response.headers,
        status: response.status,
        body: JSON.stringify(response.body)
    }
}