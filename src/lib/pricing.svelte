<script>
    import scrollTransition from '$lib/scrollTransition.js';
    import { onMount } from 'svelte';

    let pricing;
    let viewHeight;
    let scrollY;
    let startTransition;
    let endTransition;
    onMount( () => {
        startTransition = pricing.offsetTop ;
        endTransition = startTransition + viewHeight * 1.5;
    });

</script>
<style>
    #pricing{
        box-sizing: border-box;
        border-top: 1px solid red;
        display: grid;
        justify-items: center;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        margin: 0;
        min-height: 100vh;
        padding: 0 5rem;
        position: relative;
        width: 100%;
        z-index: 1;
    }
</style>
<svelte:window bind:innerHeight={viewHeight} bind:scrollY={scrollY}></svelte:window>
<section id="pricing" style="opacity: {scrollTransition(1, startTransition, endTransition, scrollY)};" bind:this={pricing}>

</section>
