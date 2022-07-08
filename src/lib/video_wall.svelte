<script>
    import VideoCard from "$lib/video_card.svelte";
    import { tweened } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

    let viewWidth;
    let videoWidth = 600;
    let videos = ["one", "two", "three", "four", "five"];

    

    const videoAtCenter = tweened(1, {
		duration: 400,
		easing: backOut
	});

    const slideVideosRight = () => {
        if($videoAtCenter > 0) {
            videoAtCenter.set(Math.ceil($videoAtCenter) - 1);
            
        }
        return;
    }

    const slideVideosLeft = () => {
        if($videoAtCenter < videos.length - 1) {
            videoAtCenter.set(Math.floor($videoAtCenter) + 1);
        }
        return;
    }

    const scrollVideos = (e) => {
        e.wheelDeltaY > 0 ? slideVideosRight() : slideVideosLeft();
    }

    $:centerPosition = ((viewWidth / 2) - (videoWidth / 2));
  

</script>

<style>
    .video_wall, .video_container, .video_navigation{
        box-sizing: border-box;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .video_wall{
        height: 100vh; /* remember to remove */
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
    }
    .video_container{
        position: absolute;
        white-space: nowrap;
        width: 100%;
    }
    .video_navigation{
        background-color: aqua;
        position: fixed;
        top: 0;
        width: 50px;
        z-index: 2;
    }
    .video_navigation.float_left{
        left: 0;
    }
    .video_navigation.float_right{
        right: 0;
    }
</style>

<svelte:window bind:innerWidth={viewWidth} />

<div class="video_wall" on:mousewheel={(e)=>scrollVideos(e)}>
    <div class="video_container" style="margin-left:{centerPosition + (videoWidth * (0 - $videoAtCenter))}px;">
        {#each videos as video}
            <VideoCard width={videoWidth} />
        {/each}
        <div class="video_navigation float_left" on:click={()=>{slideVideosLeft()}}></div>
        <div class="video_navigation float_right" on:click={()=>{slideVideosRight()}}></div>
    </div>
</div>