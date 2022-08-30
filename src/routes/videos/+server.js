import connectToDatabase from '$lib/database.js';

class ClientSideVideo{
    constructor(title, caption, videoId){
        this.title = title;
        this.caption = caption;
        this.videoId = videoId;
    }
}

export async function POST(){

    let clientSideVideos = [];
    const rawVideos = await connectToDatabase(async (db) => await db.collection('videos').find().toArray());
    if(rawVideos) clientSideVideos = await rawVideos.map(video => new ClientSideVideo(video.title, video.caption, video.video));

    return new Response(JSON.stringify(clientSideVideos));

}