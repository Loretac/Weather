var apiKey = "8a96a0f7e95fd313f8c454107d8dc14d";

// when content is loaded, bind buttons
document.addEventListener("DOMContentLoaded",bindButtons);

document.getElementById("temp").textContent = "--";

function bindButtons(){

    // add event to the zipcode submit button
    document.getElementById("zipSubmit").addEventListener("click", function(event){
        var req = new XMLHttpRequest();

        // initialize ZipCode to null
        var payload = {ZipCode:null};

        // get zip code from text box
        payload.ZipCode = document.getElementById("ZipCode").value;

        // since default value is kelvins, add &units=imperial
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + payload.ZipCode + ",us&units=imperial&appid=" + apiKey, true);

        // asynchronous request
        req.addEventListener("load", function(){
            if(req.status >= 200 && req.status < 400){
                // retrieve info
                getInfo(req.responseText);
            }
            else{
                console.log("Error in network request: " + req.statusText);
            }
        });

        // send the request
        req.send(payload.ZipCode);

        // prevent submit button from refreshing page
        event.preventDefault();
    });

    document.getElementById("citySubmit").addEventListener("click", function(
        event){
        var req = new XMLHttpRequest();

        // initialize city to null
        var payload = {City:null};

        // get city from text box
        payload.City = document.getElementById("City").value;

        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + payload.City + ",us&units=imperial&appid=" + apiKey, true);

        // asynchronous request
        req.addEventListener("load", function(){
            if(req.status >= 200 && req.status < 400){
                //retrieve info
                getInfo(req.responseText);
            }
            else{
                console.log("Error in network request: " + req.statusText);
            }
        });

        // send the request
        req.send(payload.City);

        // prevent submit button from refreshing page
        event.preventDefault();
    });


}

// populate html spans with responseText
function getInfo(responseText){

    var response = JSON.parse(responseText);

    console.log(response);

    // set the temp in response to temp. add the degrees fahrenheit symbol
    document.getElementById("cityName").textContent = response.name;
    document.getElementById("temp").textContent = Math.round(response.main.temp) + "\u00B0F";
    document.getElementById("hilo").textContent = "H " + Math.round(response.main.temp_max) + "\u00B0 / L " + Math.round(response.main.temp_min) + "\u00B0";
    document.getElementById("icon").src = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
}