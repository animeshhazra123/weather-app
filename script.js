const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = documnet.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '14ed549be68cd0d1e290c00b154ab7c5';

setInterval(() =>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const ampm = hour >=12 ? 'PM' : 'Am'
    
    timeEl.innerHTML = hoursIn12HrFormat + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ',' +date+ ' '+ months[month]
}, 1000);


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let{latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${atitude}&lon={longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data =>{
            console.log(data)
            showWeatherData(data);
        })

    })

}
function showWeatherData(data){
    let {humdity,pressure,sunrise,sunset,wind_speed} = data.current;
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>

    </div>

    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>

    </div>

    <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>

    </div>
    
    <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>

    </div>

    <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>

    </div>`;
    
}