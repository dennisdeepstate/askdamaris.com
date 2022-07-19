<script>
    import Graphs from "$lib/graphs.svelte";
</script>
<style>
    .intro{
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 2fr;
        height: calc(100% - 5rem);
        position: relative;
        width: 100%;
    }
    h1{
        font-size: 3rem;
        line-height: 3rem;
        margin: 0;
    }
    .intro_info{
        padding: 10rem 0 0 0;
    }
    .intro_info > button{
        margin: 2rem 0 0 0;
    }
    .welcome_message{
        margin: 2rem 0 0 0;
    }
    .welcome_message > p{
        font-size: 1rem;
        margin: 0.5rem 0;
    }
</style>
<section class="intro">
    <div class="intro_info">
        <h1>This is your opportunity for self actualisation</h1>
        <div class="welcome_message">
            <p>Ask damaris is a platform that gives individuals an opportunity for self-actualisation and also supports businesses in their operations to achieve their desired outcomes.</p>
            <p>We offer one on one consultations sessions, training and workshops for teams and business process outsourcing.</p>
        </div>
        <button>Explore more</button>
    </div>
    <Graphs />
</section>