export const formatDateToPostgres = (date: any) => {
    const isoString = new Date(date).toISOString(); // Formata como "YYYY-MM-DDTHH:mm:ss.sssZ"
    return isoString.replace("T", " ").split(".")[0]; // Formata como "YYYY-MM-DD HH:mm:ss"
};