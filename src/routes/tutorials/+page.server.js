import connectToDatabase from '$lib/database.js';

let clientSideData = {};

class ClientSideVideo{
    constructor(title, caption, video){
        this.title = title;
        this.caption = caption;
        this.video = video;
    }
}

export async function load() {
    const rawVideos = await connectToDatabase(async (db) => await db.collection('videos').find().toArray());
    if(rawVideos){
        const clientSideVideos = rawVideos.map(video => new ClientSideVideo(video.title, video.caption, video.video));
        clientSideData = {videos: clientSideVideos};
    }
    return clientSideData;
}