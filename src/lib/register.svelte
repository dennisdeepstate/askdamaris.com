<script>
    import validateForm from '$lib/validateForm.js';
    import Loading from '$lib/loading.svelte';
    let phone;
    let password;
    let accountType;
    let loading = false;
   
    const submitForm = async() => {
        const newUser = {
            phone,
            password,
            accountType
        }
        let messages = validateForm(newUser);
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
            const addUser = await fetch(`register/add-user`, options);
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
<form on:submit|preventDefault={()=>submitForm()} action="register/add-user" method="post">
    <label for="phone_number">Phone Number:</label>
    <input type="tel" name="phone_number" id="phone_number" bind:value={phone}/>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" bind:value={password}/>
    <label for="account_type">Account Type:</label>
    <select name="account_type" id="account_type" bind:value={accountType}>
        <option value="user">Normal User</option>
        <option value="admin">Admin</option>
    </select>
    <input type="submit" value="Register" />
</form>