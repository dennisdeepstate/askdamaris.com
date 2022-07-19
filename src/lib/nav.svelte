<style>
    .nav, .logo, ul, img{
        box-sizing: border-box;
        margin: 0;
        position: relative;
    }
    .nav{
        display: grid;
        grid-template-columns: 1fr 7fr;
        padding: 1.25rem 0rem;
        width: 100%;
    }
    .logo{
        height: 2.5rem;
        text-align: left;
        width: 100%;
    }
    .logo > img{
        height: 100%;
    }
    ul{
        height: 2.5rem;
        padding: 0.75rem 0;
        text-align: right;
    }
    ul > li{
        display: inline-block;
        margin: 0 0 0 0.75rem;
    }
</style>
<nav class="nav">
    <div class="logo">
        <img src="img_logo_askdamaris.png" alt="ask damaris logo"/>
    </div>
    <ul>
        <li>home</li>
        <li>about</li>
        <li>pricing</li>
        <li>videos</li>
    </ul>
</nav>