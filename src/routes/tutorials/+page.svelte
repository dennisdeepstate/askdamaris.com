<script>
    import { fetchAllVideos } from '$lib/fetchVideos.js';
    import Loading from '$lib/loading.svelte';

    const promiseOfVideos = fetchAllVideos();
</script>

{#await $promiseOfVideos}

  <Loading loading={true} />

{:then videos}

    {#if videos.length > 0}
        {#each videos as video}
            <img src="https://vz-2a55d88c-1d4.b-cdn.net/{video.videoId}/thumbnail.jpg" alt={video.title} /><br />
            <span>{video.title}</span><br/>
            <span>{video.caption}</span>
        {/each}
    {:else}
        <h3>there are currently no videos available</h3> 
    {/if}
    
{/await}