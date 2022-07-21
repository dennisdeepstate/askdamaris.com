<script>
    import VideoCard from "$lib/video_card.svelte";
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    let videos = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    let videosLinear = videos.slice(0,5);
    let viewWidth;
    let videoMargin = 42;
    let scrollY;
    let videoAtCenter = 0;
    let viewHeight;
    let videoWall;
    let wallOffset;
    
    
    const slideVideosRight = () => {
        let nextRight = videoRight * videoBounds;
        if(scrollOffset === nextRight) nextRight = scrollOffset - videoBounds;
        if(nextRight < moveStart) nextRight = 0;
        scrollY = nextRight + wallOffset;
    }
    const slideVideosLeft = () => {
        let nextLeft = videoLeft * videoBounds;
        if(scrollOffset === nextLeft) nextLeft = scrollOffset + videoBounds;
        if(nextLeft > (moveStart - moveEnd)) nextLeft = moveStart - moveEnd;
        scrollY = nextLeft + wallOffset;
    }

    const startVideoScroll = () => scrollY >= wallOffset;

    onMount(()=>{
        wallOffset = videoWall.offsetTop;
    });

    $:videoWidth = viewWidth > 900 ? 720 : 480;
    $:videoBounds = videoWidth + videoMargin;
    $:moveStart = ((viewWidth / 2) - (videoWidth / 2));
    $:moveEnd = moveStart - (videoBounds * (videosLinear.length - 1));
    $:scrollOffset = scrollY - wallOffset;
    $:wallPositionTop = startVideoScroll() ? 0 - wallOffset : 0 - scrollY;
    $:move = startVideoScroll() ? Math.min(moveStart, Math.max(moveEnd, moveStart - scrollOffset)) : moveStart;
    $:videoWallHeight = (videoBounds * videosLinear.length) + moveStart + wallOffset;
    $:videoAtCenter = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.round(scrollOffset/ videoBounds))):0;
    $:videoRight = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.floor(scrollOffset / videoBounds))):0;
    $:videoLeft = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.ceil(scrollOffset / videoBounds))):1;

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
        background-color: aqua;
        bottom: 0;
        display: grid;
        justify-items: center;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        min-height: 100vh;
        padding: 0 5rem;
        position: absolute;
        transform: translate(0, 100%);
        width: 100%;
        z-index: 5;
    }
    .video_caption{
        bottom: -4.5rem;
        font-size: 3rem;
        font-weight: bold;
        margin: 0;
        position: absolute;
        text-transform: lowercase;
        width: 100%;
        z-index: 3;
    }
    .video_navigation{
        background-color: white;
        height: 100%;
        opacity: 0.5;
        position: absolute;
        width: 5rem;
        z-index: 4;
    }
    .video_navigation.float_left{
        left: 0;
    }
    .video_navigation.float_right{
        right: 0;
    }
</style>
<svelte:window bind:innerHeight={viewHeight} bind:innerWidth={viewWidth} bind:scrollY={scrollY}></svelte:window>
<section class="video_wall" id="videos" style="height: {videoWallHeight}px; top:{wallPositionTop}px;" bind:this={videoWall}>
    <div class="video_wall_linear">
        <div class="video_container_linear" style="transform: translate({move}px, 0);">
            {#each videosLinear as video, i}
                <VideoCard isAtCenter={i===videoAtCenter} isGrid={false} width={videoWidth}/>
            {/each}
        </div>
        {#key videoAtCenter}
            <h1 class="video_caption" style="transform: translate(0, {-1 * ((viewHeight - (videoWidth * 0.5625))/2)}px);" transition:fly={{duration:600, y:40}}>{videosLinear[videoAtCenter]}</h1>
        {/key}
        <div class="video_navigation float_left" on:click={()=>{slideVideosRight()}}></div>
        <div class="video_navigation float_right" on:click={()=>{slideVideosLeft()}}></div>
    </div>
    <div class="video_wall_grid">
        {#each videos as video, i}
            <VideoCard isAtCenter={false} isGrid={true} width="400"/>
        {/each}
    </div>
</section>

