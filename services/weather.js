const fetch = require("node-fetch");

const apiKey = "d8e9bfa86f552bf4fabdbfa0ec3cf020";

function weather() {
    let url = `https://api.openweathermap.org/data/2.5/find?q=Hanoi&units=metric&appid=${apiKey}`;

    return fetch(url)
    .then(weather => weather.json());
}