<script>
    import Button from "$lib/button.svelte";
    import Graphs from "$lib/graphs.svelte";
</script>
<style>
    .intro{   
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 2fr 5fr;
        height: calc(100% - 5rem);
        padding: 7.5rem 0 0 0;
        position: relative;
        width: 100%;
    }
    h1{
        font-size: 2rem;
        line-height: 2rem;
        margin: 0;
    }
    .welcome_message{
        padding: 1rem 0;
    }
    .welcome_message > p{
        font-size: 1rem;
        margin: 0 0 0.5rem 0;
    }
</style>
<section class="intro" id="intro">
    <div class="intro_info">
        <h1>This is your opportunity for self actualisation</h1>
        <div class="welcome_message">
            <p>Ask damaris is a platform that gives individuals an opportunity for self-actualisation and also supports businesses in their operations to achieve their desired outcomes.</p>
            <p>We offer one on one consultations sessions, training and workshops for teams and business process outsourcing.</p>
        </div>
        <Button btnValue="Explore more"></Button>
    </div>
    <Graphs />
</section>