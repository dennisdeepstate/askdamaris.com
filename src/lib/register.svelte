<script>
    import { validateRegistrationForm } from '$lib/validateForm.js';
    import Loading from '$lib/loading.svelte';

    let email;
    let password;
    let loading = false;
   
    const submitForm = async() => {
        const newUser = {
            email,
            password
        }
        let messages = validateRegistrationForm(newUser);
        if(messages.length > 0){
            console.log(messages) 
            return
        };
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(newUser)
        };
        try{
            loading = true;
            const addUser = await fetch(`auth/add-user`, options);
            const response = await addUser.json();
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
<form on:submit|preventDefault={()=>submitForm()} action="auth/add-user" method="post">
    <label for="email">Email Address:</label>
    <input type="email" name="email" id="email" placeholder="mimi@example.com" bind:value={email} required/>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" bind:value={password} required/>
    <input type="submit" value="Register"/>
</form>