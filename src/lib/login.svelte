<script>
    import Loading from '$lib/loading.svelte';

    let email;
    let password;
    let loading = false;
   
    const submitForm = async() => {
        const User = {
            email,
            password
        }
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(User)
        };
        try{
            loading = true;
            const login = await fetch(`auth/login`, options);
            const response = await login.json();
            loading = false;
            console.log(response);
        }catch(error){
            loading = false;
            console.log(error);
        }
    }
</script>
<style>

</style>
<Loading bind:display={loading} />
<form on:submit|preventDefault={()=>submitForm()} action="login/add-user" method="post">
    <label for="email">Email Address:</label>
    <input type="email" name="email" id="email" placeholder="mimi@example.com" bind:value={email} required/>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" bind:value={password} required/>
    <input type="submit" value="Login"/>
</form>