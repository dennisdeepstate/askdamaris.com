<script>
    import VideoCard from "$lib/video_card.svelte";
    import { fly } from 'svelte/transition';

    let videos = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    let videosLinear = videos.slice(0,5);
    let viewWidth;
    let videoMargin = 42;
    let scrollY;
    let videoAtCenter = 0;
    let viewHeight;

    const canSlideRight = () => videoAtCenter > 0;
    const canSlideLeft = () => videoAtCenter < videosLinear.length - 1;

    const slideVideosRight = () => {
        let nextRight = videoToRight * videoBounds;
        if(scrollY === nextRight) nextRight = scrollY - videoBounds;
        scrollY = nextRight;    
    }
    const slideVideosLeft = () => {
        let nextLeft = videoToLeft * videoBounds;
        if(scrollY === nextLeft) nextLeft = scrollY + videoBounds;
        scrollY = nextLeft;
    }

    $:videoWidth = viewWidth > 900 ? 720 : 480;
    $:videoBounds = videoWidth + videoMargin;
    $:centerPositionMargin = ((viewWidth / 2) - (videoWidth / 2));
    $:move = centerPositionMargin - scrollY;
    $:videoWallHeight = (videoBounds * videosLinear.length) + centerPositionMargin;
    $:videoAtCenter = Math.min(videosLinear.length - 1, Math.max(0, Math.round(scrollY / videoBounds)));
    $:videoToRight = Math.min(videosLinear.length - 1, Math.max(0, Math.floor(scrollY / videoBounds)));
    $:videoToLeft = Math.min(videosLinear.length - 1, Math.max(0, Math.ceil(scrollY / videoBounds)));

</script>

<style>
    .video_wall, .video_wall_linear, .video_container_linear, .video_wall_grid, .video_navigation{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .video_wall{
        height: 100vh;
        position: relative;
        width: 100%;
    }
    .video_wall_linear{
        align-items: center;
        display: grid;
        height: 100%;
        overflow: hidden;
        position: fixed;
        text-align: center;
        width: 100%;
    }
    .video_container_linear{
        position: absolute;
        white-space: nowrap;
        width: 100%;
    }
    .video_wall_grid{
        background-color: beige;
        bottom: 0;
        display: grid;
        justify-items: center;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        min-height: 100vh;
        position: absolute;
        transform: translate(0, 100%);
        width: 100%;
        z-index: 5;
    }
    .video_caption{
        bottom: 12rem;
        font-size: 4rem;
        font-weight: bold;
        margin: 0;
        position: absolute;
        text-transform: uppercase;
        width: 100%;
        z-index: 3;
    }
    .video_navigation{
        background-color: aqua;
        height: 100%;
        position: absolute;
        width: 50px;
        z-index: 4;
    }
    .video_navigation.float_left{
        left: 0;
    }
    .video_navigation.float_right{
        right: 0;
    }
    .hidden{
        display:none;
    }
</style>
<svelte:window bind:innerHeight={viewHeight} bind:innerWidth={viewWidth} bind:scrollY={scrollY}></svelte:window>
<div class="video_wall" style="height: {videoWallHeight}px">
    <div class="video_wall_linear">
        <div class="video_container_linear" style="transform: translate({move}px, 0);">
            {#each videosLinear as video, i}
                <VideoCard isAtCenter={i===videoAtCenter} isGrid={false} width={videoWidth}/>
            {/each}
        </div>
        {#key videoAtCenter}
            <h1 class="video_caption" transition:fly={{duration:400, y:40}}>{videosLinear[videoAtCenter]}</h1>
        {/key}
        <div class="video_navigation float_left" on:click={()=>{if(canSlideRight())slideVideosRight()}}></div>
        <div class="video_navigation float_right" on:click={()=>{if(canSlideLeft())slideVideosLeft()}}></div>
    </div>
    <div class="video_wall_grid">
        {#each videos as video, i}
            <VideoCard isAtCenter={false} isGrid={true} width="400"/>
        {/each}
    </div>
</div>

