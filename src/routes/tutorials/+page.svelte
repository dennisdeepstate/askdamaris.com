<script>
    export let data;
</script>
{#if data.videos.length > 0}
    {#each data.videos as video}
        <img src="https://vz-2a55d88c-1d4.b-cdn.net/{video.videoId}/thumbnail.jpg" alt={video.title} /><br />
        <span>{video.title}</span><br/>
        <span>{video.caption}</span>
    {/each}
{:else}
    <h3>there are currently no videos available</h3> 
{/if}