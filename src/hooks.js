import * as cookie from 'cookie';
import { connectToSessionDatabase } from '$lib/sessionDatabase.js';

export async function handle({ event, resolve }) {

    const Cookies = cookie.parse(event.request.headers.get('cookie') || '');

    event.locals.user = {
        authenticated: false,
        email: '',
        userAgent: ''
    };

    async function getCookie(sdb){
        const getSession = await sdb.get(JSON.stringify(Cookies.askdamaris_id));
        const userSession = JSON.parse(getSession);
        if (userSession && userSession.userAgent === event.request.headers.get('user-agent')) {
            event.locals.user = {
                authenticated: true,
                email:userSession.email,
                userAgent: userSession.userAgent
            }
        }
    }

    if(Cookies.askdamaris_id) await connectToSessionDatabase(getCookie);

    const response = await resolve(event);
    return response;
}