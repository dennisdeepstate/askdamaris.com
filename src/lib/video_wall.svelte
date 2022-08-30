<script>
    import scrollTransition from '$lib/scrollTransition.js';
    import VideoCard from "$lib/video_card.svelte";
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    export let videos = [];
    /**
    * @param {array}  videosLinear - array containing the first (5) videos. These videos are placed in the linear video container
    */
    let videosLinear = videos.slice(0,5);
    /**
    * @param {integer}  viewWidth - width of the client's window. Value is bound to svelte:window
    */
    let viewWidth;
    let videoMargin = 0;
    let scrollY;
    let videoAtCenter = 0;
    let viewHeight;
    let videoWall;
    let wallOffset;
    let startTransition;
    let endTransition;

    onMount(() => {
        wallOffset = videoWall.offsetTop;
    });
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
    

    $:startTransition = wallOffset + (videoBounds * (videosLinear.length - 1));
    $:endTransition = startTransition + viewHeight * 1.5;
    $:videoWidth = viewWidth > 900 ? 720 : 480;
    /**
    * @param {integer}  videoBounds - total width occupied by a video container
    */
    $:videoBounds = videoWidth + videoMargin;
    /**
    * @param {integer}  moveStart - max value of translateX position of linear video container
    */
    $:moveStart = ((viewWidth / 2) - (videoWidth / 2));
    /**
    * @param {integer}  moveEnd - min value of translateX position of linear video container
    */
    $:moveEnd = moveStart - (videoBounds * (videosLinear.length - 1));
    /**
    * @param {integer}  scrollOffset - value of vertical scroll beginning from when the video wall reaches the top of the page
    */
    $:scrollOffset = scrollY - wallOffset;
    /**
    * @param {integer}  wallPosition - value of top position of video wall.
    */
    $:wallPositionTop = startVideoScroll() ? 0 - wallOffset : 0 - scrollY;
    /**
    * @param {integer}  move - value of translateX position of linear video container.
    */
    $:move = startVideoScroll() ? Math.min(moveStart, Math.max(moveEnd, moveStart - scrollOffset)) : moveStart;
    /**
    * @param {integer}  videoWallHeight - height of video wall equal to total length of videos in horizontal scroll.
    */
    $:videoWallHeight = (videoBounds * videosLinear.length ) + videoWidth;
    /**
    * @param {integer}  videoAtCenter - array position of video at center of screen.
    */
    $:videoAtCenter = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.round(scrollOffset/ videoBounds))):0;
    /**
    * @param {integer}  videoRight - array position of video to the right of video at center of screen
    */
    $:videoRight = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.floor(scrollOffset / videoBounds))):0;
     /**
    * @param {integer}  videoRight - array position of video to the left of video at center of screen
    */
    $:videoLeft = startVideoScroll() ? Math.min(videosLinear.length - 1, Math.max(0, Math.ceil(scrollOffset / videoBounds))):1;

</script>

<style>
    .video_wall, .video_wall_linear, .video_container_linear, .video_navigation{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .video_wall{
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
    .video_title{
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
{#if videosLinear.length > 0}
<section class="video_wall" id="videos" style="height: {videoWallHeight}px; top:{wallPositionTop}px;" bind:this={videoWall}>
    <div class="video_wall_linear" style="transform: scale({1 - scrollTransition(0.4, startTransition, endTransition, scrollY)}) translate(0 ,{1 * scrollTransition(viewHeight * 0.4, startTransition, endTransition, scrollY)}px);">
        <div class="video_container_linear" style="transform: translate({move}px, 0);">
            {#each videosLinear as video, i}
                <VideoCard isAtCenter={i===videoAtCenter} width={videoWidth} video={video} />
            {/each}
        </div>
        {#key videoAtCenter}
            <h1 class="video_title" style="transform: translate(0, {-1 * ((viewHeight - (videoWidth * 0.5625))/2)}px);" transition:fly={{duration:600, y:40}}>{videosLinear[videoAtCenter].title}</h1>
        {/key}
        <div class="video_navigation float_left" on:click={()=>{slideVideosRight()}}></div>
        <div class="video_navigation float_right" on:click={()=>{slideVideosLeft()}}></div>
    </div>
</section>
{:else}
<h1>amazing things are coming</h1>
{/if}


