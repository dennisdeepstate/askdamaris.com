<script>
    import Nav from "$lib/nav.svelte";
    import Intro from "$lib/intro.svelte";
</script>
<style>
    .home{
        box-sizing: border-box;
        margin: 0;
        padding: 0 5rem;
        min-height: 100vh;
        position: relative;
        width: 100%;
    }
</style>
<section class="home" id="home">
    <Nav />
    <Intro />
</section>