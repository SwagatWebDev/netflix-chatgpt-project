export const checkValidLoginData = (email, password, fullName) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(fullName) {
        const isFullNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName);
        if(!isFullNameValid) return "Full name is not valid";
    }
    
    if(!isEmailValid) return "Email Id is not valid";

    if(!isPasswordValid) return "Password not valid";

    return null;
}