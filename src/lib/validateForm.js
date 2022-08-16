const patterns = {
    phone: /^254\d{9}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*()<>_=+'";:{},[.`~\]\-\/\\\|]).{8,}$/,
    accountType: ['admin', 'user']
}
function validateWithRegex(pattern, field){
    return patterns[pattern].test(field);
}
function validateWithIncludes(pattern, field){
    return patterns[pattern].includes(field);
}
function validateForm(form){
    let messages = [];
    if(!validateWithRegex('phone', form.phone)) messages.push({ phone:'the phone number must begin with 254 followed by 9 digits' });
    if(!validateWithIncludes('accountType', form.accountType)) messages.push({ accountype:'the account type can either be admin or user' });
    if(!validateWithRegex('password', form.password)) messages.push({ password: 'password must contain a minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character' });
    return messages;
}
export default validateForm;