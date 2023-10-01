// https://unsplash.com/photos/2E_dT65fyxo SUNNY
// https://unsplash.com/photos/pbxwxwfI0B4 CLOUDY
// https://unsplash.com/photos/1cJXplTxrmI STORM


const input = document.getElementById('input');
const form = document.getElementById('form');
const place = document.getElementById('place');
const condition = document.getElementById('condition');
const temp = document.getElementById('temp');
const tempMin = document.getElementById('temp-min');
const tempMax = document.getElementById('temp-max');


const api = {
    key: 'afa3acb6f62f9d7626f0cdb3d04ea074',
    urlBase: 'https://api.openweathermap.org/data/2.5/'
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadData(input.value);
    input.value = '';
});

async function queryServer(query) {
    try {
        const request = await fetch (`${api.urlBase}weather?q=${query}&units=imperial&appid=${api.key}`);

        if (!request.ok) {
            console.error(`HTTP error! Status ${request.status}`);
            return;
        }

        const data = await request.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error!', error);
    }
};

async function loadData(query) {
    const weather = await queryServer(query);

    place.innerText = `${weather.name}, ${weather.sys.country}`;

    //Update weather condition.
    condition.querySelector('i').className = updateIcon(weather.weather[0].main);
    condition.querySelector('p').innerText = weather.weather[0].main;

    //Update temperatures.
    temp.querySelector('p').innerText = `${Math.round(weather.main.temp)}° F`;
    tempMax.querySelector('p').innerText = `${Math.round(weather.main.temp_max)}° F`;
    tempMin.querySelector('p').innerText = `${Math.round(weather.main.temp_min)}° F`;
}

function updateIcon(weather) {
    const icons = {
        clear: 'fa-regular fa-sun',
        clouds: 'fa-solid fa-cloud',
        rain: 'fa-solid fa-cloud-showers-heavy',
        storm: 'fa-solid fa-cloud-bolt',
        snow: 'fa-regular fa-snowflake',
        wind: 'fa-solid fa-wind',
        partlycloudy: 'fa-solid fa-cloud-sun',
        scatteredshowers: 'fa-solid fa-cloud-sun-rain'
    }

    let result = 'fa-solid fa-question';

    Object.keys(icons).forEach(icon => {
        if (icon === weather.toLowerCase()) {
            result = icons[icon];
        }
    });

    return result;
}