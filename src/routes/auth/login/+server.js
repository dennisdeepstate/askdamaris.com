import { createHash } from 'crypto';
import connectToDatabase from '$lib/database';
import { UserCookie, createCookie} from '$lib/createCookie.js';

const hashPassword = (pass) =>{
    return createHash('sha256').update(pass).digest('hex');
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

        const userCookie = new UserCookie(user.email, event.clientAddress, event.request.headers.get('user-agent'));
        const setCookie = await createCookie(userCookie);
        if(!setCookie) return;
        response.status = 200;
        response.body = [{success: 'Logged in successfully!'}];
        response.headers = setCookie;
        
    }

    await connectToDatabase(loginUser);   

    return new Response(JSON.stringify(response.body),{status: response.status, headers: response.headers});

}