export const validateEmail = (email) => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Regex.test(email);
};  // A function to validate an email address using a regular expression.

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i < Math.min(words.length,2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};
