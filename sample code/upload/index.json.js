import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();
    
const bunnyLibId = process.env['BUNNY_LIB_ID'];
const createVideoUrl = `https://video.bunnycdn.com/library/${bunnyLibId}/videos`;
const header = { Accept: 'application/json', 'Content-Type': 'application/*+json', AccessKey: process.env['BUNNY_KEY'] }

export async function get(event) {
    const body = JSON.stringify({title:"Just a test Video"})
    const options = {
        method: 'POST',
        headers: header,
        body: body,
    };
    const response = await fetch(`${createVideoUrl}`, options);
    console.log(await response.json());
    return {
        status: 200,
        body: {},
    }
}
export async function post(event) {
    const data = await event.request.formData();
    const video = await data.get('video');
    const file = await writeFile(`uploads/${video.name}`, video.stream());
    return {
        status: 200,
        body: {},
    }
}