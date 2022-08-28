import { BUNNY_LIB_ID, BUNNY_KEY} from '$env/static/private';
import { validateVideoUpload } from '$lib/validateForm.js';
import { createWriteStream, createReadStream } from 'fs';
import { writeFile } from 'fs/promises';
import connectToDatabase from '$lib/database.js'

export async function POST(event){

    const bunnyLogFile = 'errorlogs/bunny.txt';
    const bunnyLogStream = createWriteStream(bunnyLogFile,{flags: "a"});
    const url = `https://video.bunnycdn.com/library/${BUNNY_LIB_ID}/videos`;

    let response = {
        status: 500,
        body: [ { error:"an error occured on the server please try again later" } ]
    };

    const formData = await event.request.formData();
    const video = await formData.get('video');
    const videoFilePath = `uploads/${+new Date()}_${video.name}`;

    let form = {title: await formData.get('title'), caption: await formData.get('caption'), video: video};
    let formErrors = validateVideoUpload(form);

    async function createVideo(){
        await writeFile(videoFilePath, video.stream());
        const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/*+json',
              AccessKey: BUNNY_KEY
            },
            body: JSON.stringify({title: form.title})
        };

        try{
            const bunnyResponseJson = await fetch(url, options);
            const bunnyResponse = await bunnyResponseJson.json();
            if(!bunnyResponse.guid){
                bunnyLogStream.write(`${Math.round(+new Date()/1000)}: admin/add-video/+server.js: bunnyResponse: ${JSON.stringify(bunnyResponse)} \n`);
                return;
            }
            form.video = bunnyResponse.guid;
            form.videoPath = videoFilePath;
        }catch(err){
            bunnyLogStream.write(`${Math.round(+new Date()/1000)}: admin/add-video/+server.js: err:  ${err} \n`);
        }

        if(! await connectToDatabase(async function(db){ return await db.collection('videos').insertOne(form) })) return;

        const uploadOptions = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                AccessKey: BUNNY_KEY
            },
            body: createReadStream(videoFilePath)
        }
        
        try{
            const bunnyResponseJson = await fetch(`${url}/${form.video}`, uploadOptions);
            const bunnyResponse = await bunnyResponseJson.json();
            if(!bunnyResponse.success) return;
        }catch(err){
            bunnyLogStream.write(`${Math.round(+new Date()/1000)}: admin/add-video/+server.js: err:  ${err} \n`);
        }
        
        response.status = 200;
        response.body = [ { success: 'video uploaded successfully' }];

    }

    if( formErrors.length > 0 ){
        response.status = 403;
        response.body = formErrors;
    }else{
        await createVideo();
    }

    return new Response(JSON.stringify(response.body),{status: response.status});
}