<script>
    import Loading from '$lib/loading.svelte';
    import Iframe from '$lib/iframe.svelte';

    export let data;
</script>
{#await data}
    <Loading />
{:then video}
    <Iframe videoId={video.videoId} title={video.title}/>
{/await}