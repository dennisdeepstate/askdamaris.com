<script>
    export let width;
    export let isAtCenter;
</script>

<style>
    .video_card {
        border: 1px solid red;
        display: inline-block;
        height: 225px;
        margin: 0;
        position: relative;
        width: 400px;
        transition: 200ms ease-out;
        z-index: 1;
    }
</style>

<div class="video_card" style="height: {width * 0.5625}px; width: {width}px; {isAtCenter ? "transform: scale(1.2); z-index:2;" : "z-index:1;"}">
</div>
