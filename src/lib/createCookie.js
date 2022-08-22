import { randomUUID } from 'crypto';
import { connectToSessionDatabase, expiry } from '$lib/sessionDatabase.js';
import * as cookie from 'cookie';

class UserCookie {
    constructor(email, ip, userAgent){
        this.email = email;
        this.ip = ip;
        this.userAgent = userAgent
    }
}

let setCookie;

async function saveCookie(sdb, userCookie){
    const cookieId = randomUUID();
    await sdb.SETEX(JSON.stringify(cookieId), expiry, JSON.stringify(userCookie));
    setCookie = {
        'set-cookie': cookie.serialize('askdamaris_id', cookieId, {
            httpOnly: true,
            maxAge: expiry,
            sameSite: 'strict',
            path: '/'
        })
    };
}
async function createCookie(userCookie){
    await connectToSessionDatabase(saveCookie, userCookie);
    return setCookie;
}

export { UserCookie, createCookie};