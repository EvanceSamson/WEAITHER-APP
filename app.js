const weatherForm = document.querySelector(".weatherForm");
const cityInput =document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "184cd8f3be7aec51dfc2cb0fc02d0d54";

weatherForm.addEventListener("submit", async _event => {

  _event.preventDefault();

   const city  = cityInput.value;
   
   if(city){
      try{
         const weatherData = await getWeatherData(city);
         displayWeatherInfo(weatherData);
      }
     catch(error){
        console.error(error);
        displayError(error);
     }
       
   }
   else{
    displayError("please enter a city");
   }

});

async function getWeatherData(_city){
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${_city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch wealther data");
    }
    return await response.json();
}

function displayWeatherInfo(_data){

    const{name: city,
        main: {temp,humidity},
        weather:[{description,id}]} =_data;

     card.textContent = "";
     card.style.display = "flex"; 
     
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity:${humidity}%`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("WeatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(_weatherId){

    /*switch(true){
        case (_weatherId >= 200 && _weatherId < 300):
            return "http://openweathermap.org/img/wn/11d@2x.png" ;
        
            case (_weatherId >= 300 && _weatherId < 400):
            return "http://openweathermap.org/img/wn/09d@2x.png" ;

            case (_weatherId >= 500 && _weatherId < 600):
                return "http://openweathermap.org/img/wn/10d@2x.png" ;
             
            case (_weatherId >= 600 && _weatherId < 700):
                    return "http://openweathermap.org/img/wn/13d@2x.png" ;

            case (_weatherId>= 700 && _weatherId < 800):
                        return "http://openweathermap.org/img/wn/50d@2x.png" ;

            case(_weatherId === 800):
               return "http://openweathermap.org/img/wn/01d@2x.png";
               
               case (weatherEmoji >= 801 && _weatherId < 810):
                return "http://openweathermap.org/img/wn/02d@2x.png" ;

                default:
                 return"";
            }*/

}

function displayError(_message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = _message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display =   "flex";
    card.appendChild(errorDisplay);


}