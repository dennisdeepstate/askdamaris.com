const patterns = {
    email: /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phone: /^254\d{9}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*()<>_=+'";:{},[.`~\]\-\/\\\|]).{8,}$/,
    video: /^video\/[a-zA-Z0-9.-]{2,}$/
}
function validateWithRegex(pattern, field){
    return patterns[pattern].test(field);
}
function validateRegistrationForm(form){
    let messages = [];
    if(!validateWithRegex('email', form.email))
        messages.push({ email:'please enter a valid email address' });
    if(!validateWithRegex('password', form.password))
        messages.push({ password: 'password must contain a minimum of eight characters with at least one upper case letter, one lower case letter, one number and one special character' });
    return messages;
}
function validateVideoUpload(form){
    let messages = [];
    if(!form.title || form.title.trim().length < 1 || form.title.length > 50)
        messages.push({title: 'the title should not be blank and cannot exceed 50 characters'});
    if(!form.caption || form.caption.trim().length < 1)
        messages.push({caption: 'the caption cannot be blank'});
    if(!form.video || !validateWithRegex('video', form.video.type) || form.video.size > 1073741824)
        messages.push({video: 'you can only upload video files and they should not exceed 1GB'});
    return messages;
}
export { validateRegistrationForm, validateVideoUpload };