<script>
    let y;
    let viewHeight;
    $:scrollVal = Math.min(viewHeight,Math.max(0,y));
</script>
<style>
    .graphs{ 
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        height: 100%;
        margin: 0 auto;
        padding: 0 0 0 5rem;
        position: relative;
    }
    .chart{
        background-color: white;
        border: 0;
        border-radius: 3px;
        box-shadow: 4px 4px 12px rgba(25, 25, 25, 0.1);
        display: inline-block;
        height: 15rem;
        margin: 0;
        position: relative;
        width: 15rem;
        z-index: 1;
    }
</style>
<svelte:window bind:innerHeight={viewHeight} bind:scrollY={y}/>

<div class="graphs">
    <div class="chart" style="transform: translate(0, {0.3* scrollVal}px); z-index: 2;"></div>
    <div class="chart" style="transform: scale(1.2) translate(0, {0.25 * scrollVal}px); z-index: 4;"></div>
    <div class="chart" style="transform: scale(1.15) translate(0, {0.3 * scrollVal}px); z-index: 1;"></div>
    <div class="chart" style="transform: scale(1.05) translate(0, {0.25 * scrollVal}px);  z-index: 1;"></div>
    <div class="chart" style="transform: scale(1.175) translate(0, {0.3 * scrollVal}px); z-index: 3;"></div>
    <div class="chart" style="transform: scale(1.15) translate(0, {0.25 * scrollVal}px); z-index: 2;"></div>
</div>