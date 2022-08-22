import { createHash, randomUUID } from 'crypto';
import * as cookie from 'cookie';
import connectToDatabase from '$lib/database';
import { connectToSessionDatabase, expiry } from '$lib/sessionDatabase';

const hashPassword = (pass) =>{
    return createHash('sha256').update(pass).digest('hex');
}

class UserCookie {
    constructor(email, ip, userAgent){
        this.email = email;
        this.ip = ip;
        this.userAgent = userAgent
    }
}

export async function POST(event) {
    let response = {
        status: 500,
        body: [ { error:"an error occured on the server please try again later" } ]
    };
    let form = await event.request.json();
    async function loginUser(db) {
        let user = await db.collection('users').findOne({ email: form.email });
        if (!user) {
            response.status = 403;
            response.body = [ { error: "email address or password is wrong please check and try again" } ];
            return;
        }
        if(user.passwordHash !== hashPassword(form.password)){
            response.status = 403;
            response.body = [ { error: "email address or password is wrong please check and try again" } ];
            return;
        }

        const cookieId = randomUUID();
        const userCookie = new UserCookie(user.email, event.clientAddress, event.request.headers.get('user-agent'));
        async function saveCookie(sdb){
            await sdb.SETEX(JSON.stringify(cookieId), expiry, JSON.stringify(userCookie))
        }
        await connectToSessionDatabase(saveCookie);

        response.status = 200;
        response.body = [{success: 'Logged in successfully!'}];
        response.headers = {'set-cookie': cookie.serialize('askdamaris_id', cookieId, {
            httpOnly: true,
            maxAge: expiry,
            sameSite: 'strict',
            path: '/'
            })
        };
    }

    await connectToDatabase(loginUser);   

    return new Response(JSON.stringify(response.body),{status: response.status, headers: response.headers});

}