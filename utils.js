const fs = require('fs')

const getAllClients = () => {
    let clients = [];
    try {
        clients = JSON.parse(fs.readFileSync('./clients.json'));
        return clients;
    } catch (err) {
        return clients;
    }

}

const getClientById = (id) => {
    const clients = getAllClients();
    const found = clients.find(cli => cli.id === id);
    return found?found:"client not found";
}

const createClient = (client) => {
    const clients = getAllClients();
    clients.push(client);
    fs.writeFileSync('./clients.json', JSON.stringify(clients));
    return clients;
}

const despositCash = (id, amount) => {
    const clients = getAllClients();
    clients.find((client, i) => {
        if (client.id === id) {
            let newCash = Number(clients[i].cash) + Number(amount);
            clients[i].cash = `${newCash}`;
        }
    })
    fs.writeFileSync('./clients.json', JSON.stringify(clients));
    return clients;
}

const updateCredit = (id, amount) => {
    const clients = getAllClients();
    clients.find((client, i) => {
        if (client.id === id) {
            let newCredit = Number(clients[i].credit) + Number(amount);
            clients[i].credit = `${newCredit}`;
        }
    })
    fs.writeFileSync('./clients.json', JSON.stringify(clients));
    return clients;
}

const withdrawMoney = (id, amount) => {
    clients = getAllClients();
    amount = Math.abs(Number(amount))
    let isSucced = true;
    clients.find((client, i) => {
        if (client.id === id) {
            cash = Number(client.cash);
            credit = Number(client.credit);
            if (cash - amount >= credit * -1) {
                clients[i].cash = `${cash-amount}`
            } else {
                isSucced = false
            }
        }
    })
    fs.writeFileSync('./clients.json', JSON.stringify(clients));
    return isSucced ? clients : 'not enough funds';
}

const transferMoney = (fromID, toID, amount) => {
    const clients = getAllClients();
    const fromClient = getClientById(fromID);
    const toClient = getClientById(toID);
    amount = Math.abs(Number(amount));
    let isValid = false;
    let clientHits = 0;
    let i = 0;

    if (Number(fromClient.cash) - amount >= Number(fromClient.credit) * -1) isValid = true;

    if (isValid) {
        while (clientHits !== 2) {
            if (clients[i].id === fromClient.id) {
                fromClient.cash = Number(fromClient.cash) - amount;
                clients[i] = fromClient
                clientHits++;
            }
            if (clients[i].id === toClient.id) {
                toClient.cash = Number(toClient.cash) + amount;
                clients[i] = toClient;
                clientHits++;
            }
            i++;
        }
    }
    fs.writeFileSync('./clients.json', JSON.stringify(clients));
    return isValid ? clients : 'cant transform the money';
}

module.exports = {
    getAllClients,
    createClient,
    despositCash,
    updateCredit,
    getClientById,
    withdrawMoney,
    transferMoney,
}
