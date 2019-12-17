//Wait for page to load fully before running
window.addEventListener("load", ()=> {
    let longitude;
    let latitude;
    let tempDesc = document.querySelector(".temp-desc");
    let tempDegree = document.querySelector(".temp-degree");
    let locTimezone = document.querySelector(".loc-timezone");
    let tempSection = document.querySelector(".temp");
    let tempSpan = document.querySelector(".temp span");

    //User needs to allow geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            //Get the latitude and longitude
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;

            //DarkSky.net API using literals and use PROXY to access localhost
            const PROXY = `https://cors-anywhere.herokuapp.com/`;
            const API = `${PROXY}https://api.darksky.net/forecast/6f0328b9267ef7ea1589f3f684a57d86/${latitude},${longitude}`;

            //fetch API with custom longitude and latitude
            fetch(API)
                .then(data => {
                    return data.json();
                })
                .then(info => {
                    console.log(info);
                    const { temperature, summary, icon } = info.currently;

                    //Set DOM Elements from the API
                    tempDegree.textContent = temperature;
                    tempDesc.textContent = summary;
                    locTimezone.textContent = info.timezone;

                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change Temperature from Fahrenheit to Celsius

                    //Formula for Fahrenheit to Celsius 
                    let celsius = (temperature - 32) * (5 / 9);

                    tempSection.addEventListener("click", () => {
                        celsiusTemp(celsius, temperature);
                    });

                });
            });
    }
    else{
        h1.textContent = "Hey, please enable geolocation";
    }

    //Function to Convert Fahrenheit to Celsius
    const celsiusTemp = (celsius, temperature) => {
        // Using Ternary
         //tempSpan.textContent == "F" ? tempSpan.textContent = "C" : tempSpan.textContent = "F";
                        
        if(tempSpan.textContent == "F"){
            tempSpan.textContent = "C";
            //Round to 2 Decimal Places
            tempDegree.textContent = +celsius.toFixed(2);
        }
        else{
            tempSpan.textContent = "F";
            tempDegree.textContent = temperature;
        }
    } 

    //Get Icon and Its ID from Skycon
    const setIcons = (icon, iconID) => {
        const skycons = new Skycons({color: "white"});

        //Use Regex to Replace All Dashes with Underscores
        const currIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play;
        return skycons.set(iconID, Skycons[currIcon]);
    }
});