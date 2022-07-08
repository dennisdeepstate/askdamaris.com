<script>
    import VideoCard from "$lib/video_card.svelte";
    import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';

    let viewWidth;
    let videoWidth = 720;
    let videos = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

    

    const videoAtCenter = tweened(1, {
		duration: 400,
		easing: expoOut
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

    $:videoWidth = viewWidth > 900 ? 720 : 480;
    $:centerPosition = ((viewWidth / 2) - (videoWidth / 2));
  

</script>

<style>
    .video_wall, .video_container, .video_navigation{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .video_wall{
        align-items: center;
        display: grid;
        height: 70vh;
        margin: 15vh 0;
        overflow: hidden;
        position: relative;
        width: 100%;
    }
    .video_container{
        position: absolute;
        white-space: nowrap;
        width: 100%;
    }
    .video_navigation{
        background-color: aqua;
        height: 100%;
        position: absolute;
        width: 50px;
        z-index: 3;
    }
    .video_navigation.float_left{
        left: 0;
    }
    .video_navigation.float_right{
        right: 0;
    }
</style>

<!-- <svelte:window bind:innerWidth={viewWidth} /> -->

<div class="video_wall" on:mousewheel={(e)=>scrollVideos(e)} bind:clientWidth={viewWidth}>
    <div class="video_container" style="margin-left:{centerPosition + ((videoWidth + 42) * (0 - $videoAtCenter))}px;">
        {#each videos as video, i}
            <VideoCard width={videoWidth} isAtCenter={i === $videoAtCenter}/>
        {/each}
    </div>
    <div class="video_navigation float_left" on:click={()=>{slideVideosRight()}}></div>
    <div class="video_navigation float_right" on:click={()=>{slideVideosLeft()}}></div>
</div>