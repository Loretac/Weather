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
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + payload.input + "&units=imperial&appid=" + apiKey, true);
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

    document.body.style.transition = "all 2s";

    var code = response.weather[0].icon;

    if(code == "01d"){
        document.body.style.backgroundColor = "#00BFFF"; // clear blue sky
        document.body.style.color = "white";
    }
    else if(code == "02d"){
        document.body.style.backgroundColor = "#99e6ff"; // day with some clouds
        document.body.style.color = "black";
    }
    else if(code == "03d"){
        document.body.style.backgroundColor = "#e6f0ff"; // cloudy day
        document.body.style.color = "black";
    }
    else if(code == "04d"){
        document.body.style.backgroundColor = "#cccccc"; // broken clouds
        document.body.style.color = "black";
    }
    else if(code == "09d" || code == "10d" || code == "11d"){
        document.body.style.backgroundColor = "#666666"; // rain or thunderstorm
        document.body.style.color = "black";
    }
    else if(code == "13d"){
        document.body.style.backgroundColor = "#e6f2ff"; // day snow
        document.body.style.color = "black";
    }
    else if(code == "13n"){
        document.body.style.backgroundColor = "#666699"; // night snow
        document.body.style.color = "black";
    }
    else if(code == "50d"){
        document.body.style.backgroundColor = "#e0e0eb"; // day mist
        document.body.style.color = "black";
    }
    else if(code == "01n" || code == "02n"){
        document.body.style.backgroundColor = "#28283e"; // night clear sky
        document.body.style.color = "white";
    }
    else{
        document.body.style.backgroundColor = "#262626"; // night other counditions
        document.body.style.color = "white";
    }

}