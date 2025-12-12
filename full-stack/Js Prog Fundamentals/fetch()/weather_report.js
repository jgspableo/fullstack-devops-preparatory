function showWeatherDetailsCity(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '45d96049570d7e38bcad09d9ac9cb8f9'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
    })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherInfo').innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
    });
}

function showWeatherDetailsLongLat(event) {
    event.preventDefault();
    const long = document.getElementById('long').value;
    const lat = document.getElementById('lat').value;
    const apiKey = '45d96049570d7e38bcad09d9ac9cb8f9'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
    })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherInfo').innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
    });
}

document.getElementById('weatherForm').addEventListener('submit',showWeatherDetailsLongLat );