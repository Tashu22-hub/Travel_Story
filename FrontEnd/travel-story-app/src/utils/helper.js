export const validateEmail = (email) => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Regex.test(email);
};  // A function to validate an email address using a regular expression.