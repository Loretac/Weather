var apiKey = "8a96a0f7e95fd313f8c454107d8dc14d";

// when content is loaded, bind buttons
document.addEventListener("DOMContentLoaded",bindButtons);

document.getElementById("temp").textContent = "--";

function bindButtons(){

    // add event to the input submit button
    document.getElementById("submit").addEventListener("click", function(event){
        var req = new XMLHttpRequest();

        // initialize input to null
        var payload = {input:null};

        // get zip code from text box
        payload.input = document.getElementById("userInput").value;

        if(!isNaN(payload.input)){
                    // since default value is kelvins, add &units=imperial
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + payload.input + ",us&units=imperial&appid=" + apiKey, true);
        }
        else{
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + payload.input + ",us&units=imperial&appid=" + apiKey, true);
        }



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
        req.send(payload.input);

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