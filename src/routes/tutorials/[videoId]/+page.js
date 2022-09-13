import { fetchOneVideo } from "$lib/fetchVideos";

export async function load({ params }) {
    let data = {};

    data = await fetchOneVideo(params.videoId);

    return data;

}