// Get the location after loading the page
// The use of arrow as function
// NEED to PULL Information from a Weather API, which might need an API key
// Get request using fetch method 

// API Key
const key = "appid=d94a1ab5ae233d5132d9e0acc8871b21";
// Constant variables
const KELVIN = 273;
// Creating a object literal to hold data 
const myWeather = {};

myWeather.temperature = {
  unit: "celsius"
}

// Select Elements
const place = document.querySelector(".location-timezone");
const temperature = document.querySelector(".degree");
const tempDes = document.querySelector(".temp-description");
const icon = document.querySelector(".icon");
const degreeSection = document.querySelector(".degree-section");

let longitude;
let latitude;

// Find the location of user by asking permission from the users 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    // GET API CALL which might need API KEY
    // Change the longitude and latitude 

    //Use alternative proxy to fix the local host access API error
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${key}`;
    // Fetch the API to get information (GET REQUEST)
    // Wait to get all the data from the API call using .then
    // After getting all the information, converting them into JSON using json()
    // Then use the data -> You might get the error of trying to access API from local host
    // To fix this issue, use another proxy      
    fetch(api).then(response => {
      console.log("API Call");
      let data = response.json();
      return data; // Object Data
    })
    .then(data => {
      /* One way BUT bad organization
      console.log(data);
      // Get information from JSON (object notation)
      const currTemp = data.main.temp;
      const currDes = data.weather[0].description;
      const currLocation = `${data.name}, ${data.sys.country}`;
      const currIcon = data.weather[0].icon;
      const iconLink = `http://openweathermap.org/img/wn/${currIcon}@2x.png`;

      temperature.textContent = currTemp;
      tempDes.textContent = currDes;
      location.textContent = currLocation;
      icon.innerHTML = `<img src="icons/${currIcon}.png"/>`;
      */
      myWeather.temperature.value = Math.floor(data.main.temp - KELVIN);
      myWeather.description = data.weather[0].description;
      myWeather.iconID = data.weather[0].icon;
      myWeather.city = data.name;
      myWeather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    })
  });

} else {
  // Show Error
}
function displayWeather() {
  degreeSection.innerHTML = `<h2>${myWeather.temperature.value}°</h2><span>C</span>`;
  tempDes.textContent = myWeather.description.charAt(0).toUpperCase() + myWeather.description.slice(1);
  place.textContent = `${myWeather.city}, ${myWeather.country}`;
  icon.innerHTML = `<img src="icons/${myWeather.iconID}.png"/>`;
}


// Conversion from C degree to F degree
function CToF(currTemp) {
  return (currTemp * 9 / 5) + 32;
}

// Check if users click degree section
degreeSection.addEventListener("click", function () {
  if (myWeather.temperature.unit === "celsius") {
    console.log("C TO F");
    let Fdegree = CToF(myWeather.temperature.value);
    Fdegree = Math.floor(Fdegree);
    degreeSection.innerHTML = `<h2>${Fdegree}°</h2><span>F</span>`;
    myWeather.temperature.unit = "fahren";
  } else {
    console.log("F TO C")
    degreeSection.innerHTML = `<h2>${myWeather.temperature.value}°</h2><span>C</span>`;
    myWeather.temperature.unit = "celsius";
  }
})
