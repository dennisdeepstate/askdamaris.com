const patterns = {
    email: /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phone: /^254\d{9}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*()<>_=+'";:{},[.`~\]\-\/\\\|]).{8,}$/,
}
function validateWithRegex(pattern, field){
    return patterns[pattern].test(field);
}
function validateForm(form){
    let messages = [];
    if(!validateWithRegex('email', form.email))
        messages.push({ phone:'please enter a valid email address' });
    if(!validateWithRegex('password', form.password))
        messages.push({ password: 'password must contain a minimum of eight characters with at least one upper case letter, one lower case letter, one number and one special character' });
    return messages;
}
export default validateForm;