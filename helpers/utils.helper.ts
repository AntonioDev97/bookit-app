export const addCommasToAmount = (amount: string) => {
    amount = amount.toString();
    const parts = amount.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};