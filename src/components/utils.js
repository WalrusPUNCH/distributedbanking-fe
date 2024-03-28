export function formatNumber(number)
{
    return number?.toLocaleString(undefined, {maximumFractionDigits: 2}) ?? 0;
}

export function trim(number) {
    return parseFloat(number.replace(/,/g, '')) || 0;
}

export function findAccount(number) {
    const users = JSON.parse(localStorage.getItem('users'));

    for(const user of users) {
        if(user.number === number) {
            return user;
        }
    }

    return false;
}

export function capitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function saveBudgetToDB(accountNumber, newBudget)
{
    const user = findAccount(accountNumber);
    user.budget = newBudget;
    const filteredUsers = addUserToUsers(user);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
}



function addUserToUsers(user) {
    const users = JSON.parse(localStorage.getItem('users'));

    const filteredUsers = users.filter(dbUser => {
        return dbUser.number !== user.number;
    });

    filteredUsers.push(user);
    return filteredUsers;
}
