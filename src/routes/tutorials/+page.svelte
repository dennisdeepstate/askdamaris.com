<script>
    export let data;
</script>
{#if data.videos.length > 0}
    {#each data.videos as video}
        <img src="https://vz-2a55d88c-1d4.b-cdn.net/{video.video}/thumbnail.jpg" alt={video.title} />
    {/each}
{:else}
    <h3>there are currently no videos available</h3> 
{/if}