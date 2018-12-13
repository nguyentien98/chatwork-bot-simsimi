const fetch = require("node-fetch");
const apiKey = "4ccb6fc3e3f5f3fd895e5851cd13c552";

function sendMessage(roomId, message) {
    let url = `https://api.chatwork.com/v2/rooms/${roomId}/messages?body=${message}`;

    return fetch(url, {
        method: "POST",
        headers: {
            "X-ChatWorkToken": apiKey,
        },
    });
}

module.exports = sendMessage;
