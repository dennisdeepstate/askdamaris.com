<style>
    .about{
        box-sizing: border-box;
        margin: 0;
        padding: 5rem 5rem 0 5rem;
        position: relative;
        width: 100%;
        z-index: 5;
    }
    article{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        margin: 2rem 0 0 0;
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
            <h3>One on One consulations</h3>
            <p>we provide lessons and work closely with you to attain your desired level when it comes to your:</p>
            <ul>
                <li>professional development</li>
                <li>business etiquette</li>
                <li>personal branding</li>
            </ul>
        </div>
    </article>
    <article>
        <div class="right">
            <img alt="training and workshops" class="picture" src="#" />
        </div>
        <div class="left">
            <img alt="icon" class="icon" src="#" />
            <h3>Training & Workshops</h3>
            <p>Get customized training sessions for your team</p>
            <p>Our model is designed to cater to your needs by creating innovative solutions, conducting writing sessions and value based review and evaluation.</p>
            <p>We specialize in:</p>
            <ul>
                <li>customer service</li>
                <li>email etiquette</li>
                <li>effective communication</li>
                <li>public speaking</li>
            </ul>
        </div>
    </article>
    <article>
        <div class="left">
            <img alt="business process outsourcing" class="picture" src="#" />
        </div>
        <div class="right">
            <img alt="icon" class="icon" src="#" />
            <h3>Business Process Outsourcing</h3>
            <p>Our team of highly qualified personel are determined in making your business productive. Partner with us today and let us take care of your operations.</p>
            <p>We offer services in:</p>
            <ul>
                <li>data entry</li>
                <li>email handling</li>
                <li>customer support</li>
                <li>internet and web research</li>
            </ul>
        </div>
    </article>
</section>