<script>
    export let width;
</script>

<style>
    .video_card {
        border: 1px solid red;
        display: inline-block;
        height: 270px;
        margin: 0 20px 0 0;
        position: relative;
        width: 480px;
    }
</style>

<div class="video_card" style="height: {width * 0.5625}px; width: {width}px;"> </div>
