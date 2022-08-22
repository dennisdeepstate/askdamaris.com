import { createHash } from 'crypto';
import validateForm from '$lib/validateForm.js';
import connectToDatabase from '$lib/database';
import { UserCookie, createCookie} from '$lib/createCookie.js';

class User {
    constructor(email, passwordHash){
      this.email = email;
      this.passwordHash = passwordHash;
    }
}

const hashPassword = (pass) =>{
    return createHash('sha256').update(pass).digest('hex');
}

export async function POST(event) {
    let response = {
        status: 500,
        body: [ { error:"an error occured on the server please try again later" } ]
    };
    let form = await event.request.json();
    let formErrors = validateForm(form);

    async function addUser(db) {
        const newUser = new User(form.email, hashPassword(form.password));
        if (await db.collection('users').findOne({ email: newUser.email })) {
            response.status = 403;
            response.body = [ { email: "that email address is already registered. Please try to login instead" } ];
            return;
        }
        if (await db.collection('users').insertOne(newUser)) {
            const userCookie = new UserCookie(newUser.email, event.clientAddress, event.request.headers.get('user-agent'));
            const setCookie = await createCookie(userCookie);
            if(!setCookie) return;
            response.status = 200;
            response.body = [{success: 'Your account has been created successfully!'}];
            response.headers = setCookie;
        }
    }

    if(formErrors.length > 0) {
        response.status = 403;
        response.body = formErrors;
    }else{
        await connectToDatabase(addUser);   
    }
    
    return new Response(JSON.stringify(response.body),{status: response.status, headers: response.headers});

}