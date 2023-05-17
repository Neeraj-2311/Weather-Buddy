const loc = document.querySelector('.current-details h3');
const curr_location = document.querySelector('.search-bar input');
const preloadeer = document.querySelector('.preloader');

document.querySelector('button').addEventListener('click', function () {
  preloadeer.style.display = 'flex';
  UpdateLive(curr_location);
})

fetchText();

async function fetchText() {
  preloadeer.style.display = 'flex';
  let url = 'https://ipinfo.io/json?token=8d516f791022d0';
  let response = await fetch(url);
  let data = await response.json();
  curr_location.value = data.city;
  UpdateLive(curr_location);
  document.querySelector('.current-details p').textContent = moment().format('dddd') + ', ' + moment().format('MMMM Do YYYY');
}

function UpdateLive(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=6fed26cbc5510bbe3eb54a31c98dc61e&lang=en`)
    .then((Response) => {
      return Response.json();
    })
    .then(data => {
      if (data.cod == 200) {
        
        console.log(data);
        console.log(data.weather[0].main)

        let timezone = data.timezone;
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        loc.textContent = data.name + ',' + data.sys.country;
        document.querySelector(".current-weather-img").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
        document.querySelector('.current-temp').textContent = Math.round(data.main.feels_like) + "°c";
        document.querySelector('.current-high-temp').textContent = Math.round(data.main.temp_max) + '°c';
        document.querySelector('.current-low-temp').textContent = Math.round(data.main.temp_min) + '°c';
        document.querySelector('.current-condition').textContent = data.weather[0].main;
        document.querySelector('.current-feelslike').textContent = Math.round(data.main.feels_like) + '°c';
        document.querySelector('.current-windspeed').textContent = Math.round(data.wind.speed) + 'mph';
        document.querySelector('.current-sunrise').textContent = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm');
        document.querySelector('.current-sunset').textContent = moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm');
        forecast(city);
      }
      else {
        alert(data.message)
      }
    })
}

function forecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=6fed26cbc5510bbe3eb54a31c98dc61e&lang=en`)
    .then(response => response.json())
    .then(data => {
      if (data.cod == '200') {
        let found = 0;
        let obj;
        for (let i = 1; i <= 7; i++) {
          if (data.list[i - 1].dt_txt.substring(11, 16) == '03:00') {
            obj = document.querySelectorAll('.todays-weather-details div div');
            found = i - 1;
            break;
          }
          document.querySelector('.today-time-' + i).textContent = data.list[i - 1].dt_txt.substring(10, 16);
          document.querySelector('.today-icon-' + i).setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[i - 1].weather[0].icon + "@2x.png");
          document.querySelector('.today-temp-' + i).textContent = Math.round(data.list[i - 1].main.temp) + '°c';
        }

        for (let j = found; j < 7; j++) {
          obj[j].style.display = 'none';
        }

        let a = 8;
        for (let i = 1; i <= 4; i++) {
          document.querySelector('.forecast-' + i + '-day').textContent = moment().add(i, 'days').format('ddd');
          document.querySelector('.forecast-' + i + '-date').textContent = data.list[a].dt_txt.substring(8, 10) + '/' + data.list[a].dt_txt.substring(5, 7);
          document.querySelector('.forecast-' + i + '-icon').setAttribute('src', "https://openweathermap.org/img/wn/" + data.list[a].weather[0].icon + "@2x.png");
          document.querySelector('.forecast-' + i + '-low-temp').textContent = Math.round(data.list[a].main.temp_min) + '°c';
          document.querySelector('.forecast-' + i + '-high-temp').textContent = Math.round(data.list[a].main.temp_max) + '°c';
          document.querySelector('.forecast-' + i + '-wind').textContent = Math.round(data.list[a].wind.speed) + 'mph';
          document.querySelector('.forecast-' + i + '-weather').textContent = data.list[a].weather[0].main;
          a += 8;
        }
        preloadeer.style.display = 'none';
      }
      else {
        alert(data.message);
      }
    })
}