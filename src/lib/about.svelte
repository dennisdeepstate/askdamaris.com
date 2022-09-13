<style>
    .about{
        box-sizing: border-box;
        margin: 0;
        padding: 5rem 5rem 0 5rem;
        position: relative;
        width: 100%;
    }
    article{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        margin: 0;
        padding: 0;
    }
    .left{
        grid-column: 1/2;
    }
    .right{
        grid-column: 2/3;
    }
    @media only screen and (max-width: 576px){
        article{
            grid-template-columns: 1fr;
        }
        .right{
            grid-column: 1/2;
        }
   
    }
    @media only screen and (max-width: 768px){
        
    }
    @media only screen and (max-width: 1024px){
    }

    @media only screen and (min-width: 1408px){
    }
</style>
<section class="about" id="about">
    <h1>About Us</h1>
    <article>
        <div class="left">
            <img alt="one on one consultations" class="picture" src="#" />
        </div>
        <div class="right">
            <img alt="icon" class="icon" src="#" />
            <h3>One on one consulations</h3>
            <p>we provide lessons and work closely with you to attain your desired level when it comes to your:</p>
            <ul>
                <li>professional development</li>
                <li>business etiquette</li>
                <li>personal branding</li>
            </ul>
        </div>
    </article>
</section>