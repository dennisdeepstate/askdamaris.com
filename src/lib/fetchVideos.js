import baseUrl from '$lib/baseUrl.js';
import { writable } from 'svelte/store';
import { videoStore } from '$lib/videoStore.js';
import { error } from '@sveltejs/kit';

async function updateVideos(){

    const promiseOfNewVideos = await fetch(`${baseUrl}/videos/`,{
        method: 'POST'
    });

    const newVideos = await promiseOfNewVideos.json();
    videoStore.set(newVideos);

    return newVideos;
}

function fetchAllVideos(){
    
    let videos = writable(new Promise(() => {}));
    let cache = [];
    
    videoStore.subscribe(val => cache = val);

    if(cache.length > 0) videos.set(Promise.resolve(cache));

    async function loadVideos(){
        const newVideos = await updateVideos();
        videos.set(Promise.resolve(newVideos));
    }

    loadVideos();

    return videos;
}

async function fetchOneVideo(videoId){

    let video = {};
    let cache = [];
    let cachedVideo;
    
    videoStore.subscribe(val => cache = val);
    if(cache.length > 0) cachedVideo = cache.find(video => video.videoId === videoId);

    async function loadVideos(){
        const newVideos = await updateVideos();
        const newVideo = newVideos.find(video => video.videoId === videoId);
        video = newVideo;
    }

    cachedVideo ? video = cachedVideo : await loadVideos();
    
    if(!video) throw error(404);
    return video;

}

export { fetchAllVideos, fetchOneVideo };