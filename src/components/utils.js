export function formatNumber(number)
{
    return number?.toLocaleString(undefined, {maximumFractionDigits: 2}) ?? 0;
}

export function trim(number) {
    return parseFloat(number.replace(/,/g, '')) || 0;
}

export function capitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}