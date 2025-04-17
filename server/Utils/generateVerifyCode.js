export const generateVerificationCode = () => {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    return code;    
}