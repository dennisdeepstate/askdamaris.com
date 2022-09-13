<script>
    import baseUrl from '$lib/baseUrl.js';
    
    export let width;
    export let isAtCenter;
    export let video;
</script>

<style>
    .video_card {
        border: none;
        display: inline-block;
        height: 225px;
        margin: 0;
        position: relative;
        width: 400px;
        transition: 200ms ease-out;
        z-index: 1;
    }
    .video_card img{
        width: 100%;
    }
</style>

<div class="video_card" style="height: {width * 0.5625}px; width: {width}px; {isAtCenter ? "transform: scale(1.2); z-index:2;" : "z-index:1;"}">
    <a href="{baseUrl}/tutorials/{video.videoId}" ><img src="https://vz-2a55d88c-1d4.b-cdn.net/{video.videoId}/thumbnail.jpg" alt={video.title} /></a>
</div>
