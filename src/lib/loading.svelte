<script>
    export let display;
</script>
<style>
    .loading{
        background-color: white;
        height: 100vh;
        position: fixed;
        top: 0;
        width: 100vh;
        z-index: 10;
    }
</style>
<div class="loading" style="display: {display ? 'block':'none'};">
    loading....
</div>