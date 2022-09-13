<script>
    import Home from "$lib/home.svelte";
    import About from "$lib/about.svelte";
    import VideoWall from "$lib/video_wall.svelte";
    import Pricing from "$lib/pricing.svelte";
    import { fetchAllVideos } from '$lib/fetchVideos.js';
    import Loading from '$lib/loading.svelte';

    const promiseOfVideos = fetchAllVideos();
</script>


{#await $promiseOfVideos}
  <Loading display={true} />
{:then videos}
    <Home />
    <About />
    <VideoWall videos={videos}/> 
    <Pricing />
{/await}

