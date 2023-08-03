export function validation(userData) {
    const regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const regexNumber = /.*\d+.*/
    const errors = {}
    
    if(userData.email ==='') errors.email = "Email can't be empty"
    if(!regexEmail.test(userData.email)) errors.email = "Input must have email format"
    if(userData.email.length > 35) errors.email = "Email must have a maximum of 35 characters"

    if (!regexNumber.test(userData.password)) errors.password = "Password must contain at least one number"
    if (userData.password.length < 6 || userData.password.length > 10) errors.password = "Password must have between 6 an 10 characters"
    return errors
}