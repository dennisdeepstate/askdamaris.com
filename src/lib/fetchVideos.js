import { PUBLIC_DEV_URL, PUBLIC_NODE_ENV, PUBLIC_PROD_URL} from '$env/static/public';
import { writable } from 'svelte/store';
import { videoStore } from '$lib/videoStore.js';

const baseUrl = PUBLIC_NODE_ENV === "production" ? PUBLIC_PROD_URL : PUBLIC_DEV_URL;

function fetchAllVideos(){
    
    let videos = writable(new Promise(() => {}));
    let cache;
    
    videoStore.subscribe(val => cache = val);

    if(cache.length > 0) videos.set(Promise.resolve(cache));

    async function loadVideos(){

        const promiseOfNewVideos = await fetch(`${baseUrl}/videos/`,{
            method: 'POST'
        });
        const newVideos = await promiseOfNewVideos.json();
        videoStore.set(newVideos);
        videos.set(Promise.resolve(newVideos));
    }

    loadVideos();

    return videos;
}

export default fetchAllVideos;