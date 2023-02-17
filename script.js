// searchBar value
let loc = document.getElementById("city-value");

//lat long
let lat;
let long;

fetchText();


let btn = document.querySelector(".search-btn");

btn.addEventListener("click", function () {

  btn.classList.add("search-btn-click");

  setTimeout(function () {
    btn.classList.remove("search-btn-click");
  }, 200)

})

//function to get current city and forecast on the basis of that
async function fetchText() {
  let url = 'https://ipinfo.io/json?token=8d516f791022d0';
  let response = await fetch(url);
  let data = await response.json();
  let obj = data.loc.split(',');
  lat = obj[0];
  long = obj[1];
  document.getElementById("city").setAttribute("value", data.city);
  loc.innerHTML = data.city;

  UpdateLive();

  forecastByCoords();

}

// function to update data according to the searched place
function UpdateValues() {

  UpdateLive();

  forecastByCity();
}



function forecastByCoords() {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=781388e6fe3541f8b2e122014231402&q=${lat},${long}&days=6&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {
      let iter = 0;
      for (let i = 0; i < 5; i++) {
        document.getElementById("date-" + (i + 1)).innerHTML = data.forecast.forecastday[i + 1].date.slice(8, 10) + "/" + data.forecast.forecastday[i + 1].date.slice(5, 7) + "/" + data.forecast.forecastday[i + 1].date.slice(0, 4);
        for (let j = 0; j < 4; j++) {
          if (j == 0) iter = 5;
          else if (j == 1) iter = 12;
          else if (j == 2) iter = 18;
          else iter = 23;
          document.getElementById("icon-" + (i + 1) + "-" + (j + 1)).setAttribute("src", data.forecast.forecastday[i + 1].hour[iter].condition.icon)
          document.getElementById("detail-" + (i + 1) + "-feels-like-" + (j + 1)).innerHTML = Math.round(data.forecast.forecastday[i + 1].hour[iter].temp_c) + "°C";
          document.getElementById("detail-" + (i + 1) + "-condition-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].condition.text;
          document.getElementById("detail-" + (i + 1) + "-windspeed-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].wind_kph;
          document.getElementById("detail-" + (i + 1) + "-humidity-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].humidity;
          document.getElementById("detail-" + (i + 1) + "-pressure-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].pressure_in;

        }
      }
    })
}

function forecastByCity() {
  const city = document.getElementById("city").value;
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=781388e6fe3541f8b2e122014231402&q=${city.trim()}&days=6&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {
      let iter = 0;
      for (let i = 0; i < 5; i++) {
        document.getElementById("date-" + (i + 1)).innerHTML = data.forecast.forecastday[i + 1].date.slice(8, 10) + "/" + data.forecast.forecastday[i + 1].date.slice(5, 7) + "/" + data.forecast.forecastday[i + 1].date.slice(0, 4);
        for (let j = 0; j < 4; j++) {
          if (j == 0) iter = 5;
          else if (j == 1) iter = 12;
          else if (j == 2) iter = 18;
          else iter = 23;
          document.getElementById("icon-" + (i + 1) + "-" + (j + 1)).setAttribute("src", data.forecast.forecastday[i + 1].hour[iter].condition.icon)
          document.getElementById("detail-" + (i + 1) + "-feels-like-" + (j + 1)).innerHTML = Math.round(data.forecast.forecastday[i + 1].hour[iter].temp_c) + "°C";
          document.getElementById("detail-" + (i + 1) + "-condition-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].condition.text;
          document.getElementById("detail-" + (i + 1) + "-windspeed-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].wind_kph;
          document.getElementById("detail-" + (i + 1) + "-humidity-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].humidity;
          document.getElementById("detail-" + (i + 1) + "-pressure-" + (j + 1)).innerHTML = data.forecast.forecastday[i + 1].hour[iter].pressure_in;

        }
      }
    })
}

function UpdateLive() {
  const city = document.getElementById("city").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=6fed26cbc5510bbe3eb54a31c98dc61e&lang=en`)
    .then((Response) => {
      return Response.json();
    })
    .then(data => {
      console.log(data)
      if (data.cod == 200) {
        loc.innerHTML = city;
        document.getElementById("climate-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
        document.getElementById("temp-value").textContent = Math.round(data.main.feels_like) + " °C";
        document.getElementById("climate").textContent = data.weather[0].main;
        document.getElementById("windspeed").textContent = data.wind.speed;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("pressure").textContent = data.main.pressure;
      }
      else {
        alert(data.message)
      }
    })
}


// javaScript for SearchBar
let names = [
  "Afghanistan",
  "Kabul",
  "Albania",
  "Tirana",
  "Algeria",
  "Algiers",
  "Andorra",
  "Andorra la Vella",
  "Angola",
  "Luanda",
  "Antigua and Barbuda",
  "Saint John's",
  "Argentina",
  "Buenos Aires",
  "Armenia",
  "Yerevan",
  "Australia",
  "Canberra",
  "Austria",
  "Vienna",
  "Azerbaijan",
  "Baku",
  "The Bahamas",
  "Nassau",
  "Bahrain",
  "Manama",
  "Bangladesh",
  "Dhaka",
  "Barbados",
  "Bridgetown",
  "Belarus",
  "Minsk",
  "Belgium",
  "Brussels",
  "Belize",
  "Belmopan",
  "Benin",
  "Porto-Novo",
  "Bhutan",
  "Thimphu",
  "Bolivia",
  "La Paz (administrative); Sucre (judicial)",
  "Bosnia and Herzegovina",
  "Sarajevo",
  "Botswana",
  "Gaborone",
  "Brazil",
  "Brasilia",
  "Brunei",
  "Bandar Seri Begawan",
  "Bulgaria",
  "Sofia",
  "Burkina Faso",
  "Ouagadougou",
  "Burundi",
  "Gitega (changed from Bujumbura in December 2018)",
  "Cambodia",
  "Phnom Penh",
  "Cameroon",
  "Yaounde",
  "Canada",
  "Ottawa",
  "Cape Verde",
  "Praia",
  "Central African Republic",
  "Bangui",
  "Chad",
  "N'Djamena",
  "Chile",
  "Santiago",
  "China",
  "Beijing",
  "Colombia",
  "Bogota",
  "Comoros",
  "Moroni",
  "Congo",
  " Republic of the",
  "Brazzaville",
  "Congo",
  " Democratic Republic of the",
  "Kinshasa",
  "Costa Rica",
  "San Jose",
  "Cote d'Ivoire",
  "Yamoussoukr0",
  "Abidjan (de facto)",
  "Croatia",
  "Zagreb",
  "Cuba",
  "Havana",
  "Cyprus",
  "Nicosia",
  "Czech Republic",
  "Prague",
  "Denmark",
  "Copenhagen",
  "Djibouti",
  "Djibouti",
  "Dominica",
  "Roseau",
  "Dominican Republic",
  "Santo Domingo",
  "East Timor (Timor-Leste)",
  "Dili",
  "Ecuador",
  "Quito",
  "Egypt",
  "Cairo",
  "El Salvador",
  "San Salvador",
  "Equatorial Guinea",
  "Malabo",
  "Eritrea",
  "Asmara",
  "Estonia",
  "Tallinn",
  "Ethiopia",
  "Addis Ababa",
  "Fiji",
  "Suva",
  "Finland",
  "Helsinki",
  "France",
  "Paris",
  "Gabon",
  "Libreville",
  "The Gambia",
  "Banjul",
  "Georgia",
  "Tbilisi",
  "Germany",
  "Berlin",
  "Ghana",
  "Accra",
  "Greece",
  "Athens",
  "Grenada",
  "Saint George's",
  "Guatemala",
  "Guatemala City",
  "Guinea",
  "Conakry",
  "Guinea-Bissau",
  "Bissau",
  "Guyana",
  "Georgetown",
  "Haiti",
  "Port-au-Prince",
  "Honduras",
  "Tegucigalpa",
  "Hungary",
  "Budapest",
  "Iceland",
  "Reykjavik",
  "India",
  "New Delhi",
  "Indonesia",
  "Jakarta",
  "Iran",
  "Tehran",
  "Iraq",
  "Baghdad",
  "Ireland",
  "Dublin",
  "Israel",
  "Jerusalem",
  "Italy",
  "Rome",
  "Jamaica",
  "Kingston",
  "Japan",
  "Tokyo",
  "Jordan",
  "Amman",
  "Kazakhstan",
  "Nur-Sultan",
  "Kenya",
  "Nairobi",
  "Kiribati",
  "Tarawa Atoll",
  "Korea",
  " North",
  "Pyongyang",
  "Korea",
  " South",
  "Seoul",
  "Kosovo",
  "Pristina",
  "Kuwait",
  "Kuwait City",
  "Kyrgyzstan",
  "Bishkek",
  "Laos",
  "Vientiane",
  "Latvia",
  "Riga",
  "Lebanon",
  "Beirut",
  "Lesotho",
  "Maseru",
  "Liberia",
  "Monrovia",
  "Libya",
  "Tripoli",
  "Liechtenstein",
  "Vaduz",
  "Lithuania",
  "Vilnius",
  "Luxembourg",
  "Luxembourg",
  "Macedonia",
  "Skopje",
  "Madagascar",
  "Antananarivo",
  "Malawi",
  "Lilongwe",
  "Malaysia",
  "Kuala Lumpur",
  "Maldives",
  "Male",
  "Mali",
  "Bamako",
  "Malta",
  "Valletta",
  "Marshall Islands",
  "Majuro",
  "Mauritania",
  "Nouakchott",
  "Mauritius",
  "Port Louis",
  "Mexico",
  "Mexico City",
  "Micronesia",
  " Federated States of",
  "Palikir",
  "Moldova",
  "Chisinau",
  "Monaco",
  "Monaco",
  "Mongolia",
  "Ulaanbaatar",
  "Montenegro",
  "Podgorica",
  "Morocco",
  "Rabat",
  "Mozambique",
  "Maputo",
  "Myanmar (Burma)",
  "Rangoon (Yangon)",
  "Naypyidaw or Nay Pyi Taw (administrative)",
  "Namibia",
  "Windhoek",
  "Nauru",
  "no official capital",
  "government offices in Yaren District",
  "Nepal",
  "Kathmandu",
  "Netherlands",
  "Amsterdam",
  "The Hague (seat of government)",
  "New Zealand",
  "Wellington",
  "Nicaragua",
  "Managua",
  "Niger",
  "Niamey",
  "Nigeria",
  "Abuja",
  "Norway",
  "Oslo",
  "Oman",
  "Muscat",
  "Pakistan",
  "Islamabad",
  "Palau",
  "Melekeok",
  "Panama",
  "Panama City",
  "Papua New Guinea",
  "Port Moresby",
  "Paraguay",
  "Asuncion",
  "Peru",
  "Lima",
  "Philippines",
  "Manila",
  "Poland",
  "Warsaw",
  "Portugal",
  "Lisbon",
  "Qatar",
  "Doha",
  "Romania",
  "Bucharest",
  "Russia",
  "Moscow",
  "Rwanda",
  "Kigali",
  "Saint Kitts and Nevis",
  "Basseterre",
  "Saint Lucia",
  "Castries",
  "Saint Vincent and the Grenadines",
  "Kingstown",
  "Samoa",
  "Apia",
  "San Marino",
  "San Marino",
  "Sao Tome and Principe",
  "Sao Tome",
  "Saudi Arabia",
  "Riyadh",
  "Senegal",
  "Dakar",
  "Serbia",
  "Belgrade",
  "Seychelles",
  "Victoria",
  "Sierra Leone",
  "Freetown",
  "Singapore",
  "Singapore",
  "Slovakia",
  "Bratislava",
  "Slovenia",
  "Ljubljana",
  "Solomon Islands",
  "Honiara",
  "Somalia",
  "Mogadishu",
  "South Africa",
  "Pretoria (administrative)",
  "Cape Town (legislative)",
  "Bloemfontein (judiciary)",
  "South Sudan",
  "Juba ",
  "Spain",
  "Madrid",
  "Sri Lanka",
  "Colombo",
  "Sri Jayewardenepura Kotte (legislative)",
  "Sudan",
  "Khartoum",
  "Suriname",
  "Paramaribo",
  "Swaziland",
  "Mbabane",
  "Sweden",
  "Stockholm",
  "Switzerland",
  "Bern",
  "Syria",
  "Damascus",
  "Taiwan",
  "Taipei",
  "Tajikistan",
  "Dushanbe",
  "Tanzania",
  "Dar es Salaam",
  "Dodoma (legislative)",
  "Thailand",
  "Bangkok",
  "Togo",
  "Lome",
  "Tonga",
  "Nuku'alofa",
  "Trinidad and Tobago",
  "Port-of-Spain",
  "Tunisia",
  "Tunis",
  "Turkey",
  "Ankara",
  "Turkmenistan",
  "Lusaka",
  "Zimbabwe",
  "Harare"
];
//Sort names in ascending order
let sortedNames = names.sort();

//reference
let input = document.getElementById("city");

//Execute function on keyup
input.addEventListener("keyup", (e) => {
  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    //convert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});
function displayNames(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}
