$(document).ready(function(){

    const api = "ae48aa7d95920be05c640cea1737ac21";

    let city = "Lahti";

    let tempYksikko = "C";
    let paineYksikko = "hPa";
    let nopeusYksikko = "m/s";
    
    $(".f").css("color", "#DCDCDC");
    $(".mph").css("color", "#DCDCDC");
    $(".inhg").css("color", "#DCDCDC");

    const Lahti = {
        "lat": "60.98267",
        "lon": "25.66151"
    }
    const Heinola = {
        "lat": "61.20564",
        "lon": "26.03811"
    }
    const Asikkala = {
        "lat": "61.21667",
        "lon": "25.5"
    }
    const Orimattila = {
        "lat": "60.80487",
        "lon": "25.72964"
    }
    const Hartola = {
        "lat": "61.58333",
        "lon": "26.01667"
    }

    async function getWeather() {
        let cityLocation;
        switch(city){
            case "Lahti":
                cityLocation = Lahti;
                break;
            case "Heinola":
                cityLocation = Heinola;
                break;
            case "Asikkala":
                cityLocation = Asikkala;
                break;
            case "Orimattila":
                cityLocation = Orimattila;
                break;
            case "Hartola":
                cityLocation = Hartola;
                break;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${api}`);
        const weather = await response.json();
        return weather;
      }
    
    async function getTime() {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/Helsinki");
        const time = await response.json();
        return time;
    }

    var serverTime = new Date();

    async function updateTime() {
        let time = await getTime();
        let currentTimeUnix = time.unixtime;
        let weather = await getWeather(city);
        let sunrise = weather.sys.sunrise;
        let sunset = weather.sys.sunset;
        let sunriseToSunset = sunset - sunrise;
        let dayTime = sunriseToSunset * 2/3;
        let dayTimeChange = sunriseToSunset * 1/6;
        let sunsetToSunrise = 86400 - sunriseToSunset;
        let nightTime = sunsetToSunrise * 2/3;
        let nightTimeChange = sunsetToSunrise * 1/6;

        let nightA = sunrise - nightTimeChange;
        let nightB = sunset + nightTimeChange;
        let dayA = sunrise + dayTimeChange;
        let dayB = sunset - dayTimeChange;

        if(currentTimeUnix <= nightA || currentTimeUnix >= nightB){
            console.log(1);
            $("body").css("background", "linear-gradient(0deg, rgba(12,0,59,1) 0%, rgba(15,0,75,1) 50%, rgba(8,0,40,1) 100%)");
        }else if(nightA < currentTimeUnix && sunrise > currentTimeUnix){
            console.log(2);
            let gradientA = [[12,0,59],[15,0,75],[8,0,40]]; //night gradient
            let gradientB = [[28,181,181],[29,84,148],[26,68,179]]; //morning gradient
            let gradientPercentage = (currentTimeUnix - nightA) / nightTimeChange;
            console.log(gradientPercentage);
            let gradientResult = [
                [
                    (gradientPercentage * (gradientB[0][0] - gradientA[0][0])) + gradientA[0][0],
                    (gradientPercentage * (gradientB[0][1] - gradientA[0][1])) + gradientA[0][1],
                    (gradientPercentage * (gradientB[0][2] - gradientA[0][2])) + gradientA[0][2],
                ],
                [
                    (gradientPercentage * (gradientB[1][0] - gradientA[1][0])) + gradientA[1][0],
                    (gradientPercentage * (gradientB[1][1] - gradientA[1][1])) + gradientA[1][1],
                    (gradientPercentage * (gradientB[1][2] - gradientA[1][2])) + gradientA[1][2],
                ],
                [
                    (gradientPercentage * (gradientB[2][0] - gradientA[2][0])) + gradientA[2][0],
                    (gradientPercentage * (gradientB[2][1] - gradientA[2][1])) + gradientA[2][1],
                    (gradientPercentage * (gradientB[2][2] - gradientA[2][2])) + gradientA[2][2],
                ]
            ];
            $("body").css("background", "linear-gradient(0deg, rgba("+gradientResult[0][0]+","+gradientResult[0][1]+","+gradientResult[0][2]+",1) 0%, rgba("+gradientResult[1][0]+","+gradientResult[1][1]+","+gradientResult[1][2]+",1) 50%, rgba("+gradientResult[2][0]+","+gradientResult[2][1]+","+gradientResult[2][2]+",1) 100%)");
        }else if(currentTimeUnix == sunrise){
            console.log(3);
            $("body").css("background", "linear-gradient(0deg, rgba(28,181,181,1) 0%, rgba(29,84,148,1) 50%, rgba(26,68,179,1) 100%)");
        }else if(sunrise < currentTimeUnix && currentTimeUnix < dayA){
            let gradientA = [[28,181,181],[29,84,148],[26,68,179]]; //morning gradient
            let gradientB = [[0,161,231],[40,131,237],[23,130,175]]; //day gradient
            let gradientPercentage = (currentTimeUnix - sunrise) / dayTimeChange;
            let gradientResult = [
                [
                    (gradientPercentage * (gradientB[0][0] - gradientA[0][0])) + gradientA[0][0],
                    (gradientPercentage * (gradientB[0][1] - gradientA[0][1])) + gradientA[0][1],
                    (gradientPercentage * (gradientB[0][2] - gradientA[0][2])) + gradientA[0][2],
                ],
                [
                    (gradientPercentage * (gradientB[1][0] - gradientA[1][0])) + gradientA[1][0],
                    (gradientPercentage * (gradientB[1][1] - gradientA[1][1])) + gradientA[1][1],
                    (gradientPercentage * (gradientB[1][2] - gradientA[1][2])) + gradientA[1][2],
                ],
                [
                    (gradientPercentage * (gradientB[2][0] - gradientA[2][0])) + gradientA[2][0],
                    (gradientPercentage * (gradientB[2][1] - gradientA[2][1])) + gradientA[2][1],
                    (gradientPercentage * (gradientB[2][2] - gradientA[2][2])) + gradientA[2][2],
                ]
            ];
            $("body").css("background", "linear-gradient(0deg, rgba("+gradientResult[0][0]+","+gradientResult[0][1]+","+gradientResult[0][2]+",1) 0%, rgba("+gradientResult[1][0]+","+gradientResult[1][1]+","+gradientResult[1][2]+",1) 50%, rgba("+gradientResult[2][0]+","+gradientResult[2][1]+","+gradientResult[2][2]+",1) 100%)");
            console.log(4);
        }else if(currentTimeUnix >= dayA && currentTimeUnix <= dayB){
            console.log(5);
            $("body").css("background", "linear-gradient(0deg, rgba(0,161,231,1) 0%, rgba(40,131,237,1) 50%, rgba(23,130,175,1) 100%)");
        }else if(dayB < currentTimeUnix && currentTimeUnix < sunset){
            let gradientA = [[0,161,231],[40,131,237],[23,130,175]]; //day gradient
            let gradientB = [[0,20,197],[0,43,154],[127,23,175]]; //evening gradient
            let gradientPercentage = (currentTimeUnix - dayB) / dayTimeChange;
            let gradientResult = [
                [
                    (gradientPercentage * (gradientB[0][0] - gradientA[0][0])) + gradientA[0][0],
                    (gradientPercentage * (gradientB[0][1] - gradientA[0][1])) + gradientA[0][1],
                    (gradientPercentage * (gradientB[0][2] - gradientA[0][2])) + gradientA[0][2],
                ],
                [
                    (gradientPercentage * (gradientB[1][0] - gradientA[1][0])) + gradientA[1][0],
                    (gradientPercentage * (gradientB[1][1] - gradientA[1][1])) + gradientA[1][1],
                    (gradientPercentage * (gradientB[1][2] - gradientA[1][2])) + gradientA[1][2],
                ],
                [
                    (gradientPercentage * (gradientB[2][0] - gradientA[2][0])) + gradientA[2][0],
                    (gradientPercentage * (gradientB[2][1] - gradientA[2][1])) + gradientA[2][1],
                    (gradientPercentage * (gradientB[2][2] - gradientA[2][2])) + gradientA[2][2],
                ]
            ];
            $("body").css("background", "linear-gradient(0deg, rgba("+gradientResult[0][0]+","+gradientResult[0][1]+","+gradientResult[0][2]+",1) 0%, rgba("+gradientResult[1][0]+","+gradientResult[1][1]+","+gradientResult[1][2]+",1) 50%, rgba("+gradientResult[2][0]+","+gradientResult[2][1]+","+gradientResult[2][2]+",1) 100%)");
            console.log(6);
        }else if(currentTimeUnix == sunset){
            console.log(7);
            $("body").css("background", "linear-gradient(0deg, rgba(0,20,197,1) 0%, rgba(0,43,154,1) 50%, rgba(123,23,175,1) 100%)");
        }else if(sunset < currentTimeUnix && currentTimeUnix < nightB){
            console.log(8);
            let gradientA = [[0,20,197],[0,43,154],[127,23,175]]; //evening gradient
            let gradientB = [[12,0,59],[15,0,75],[8,0,40]]; //night gradient
            let gradientPercentage = (currentTimeUnix - sunset) / nightTimeChange;
            let gradientResult = [
                [
                    (gradientPercentage * (gradientB[0][0] - gradientA[0][0])) + gradientA[0][0],
                    (gradientPercentage * (gradientB[0][1] - gradientA[0][1])) + gradientA[0][1],
                    (gradientPercentage * (gradientB[0][2] - gradientA[0][2])) + gradientA[0][2],
                ],
                [
                    (gradientPercentage * (gradientB[1][0] - gradientA[1][0])) + gradientA[1][0],
                    (gradientPercentage * (gradientB[1][1] - gradientA[1][1])) + gradientA[1][1],
                    (gradientPercentage * (gradientB[1][2] - gradientA[1][2])) + gradientA[1][2],
                ],
                [
                    (gradientPercentage * (gradientB[2][0] - gradientA[2][0])) + gradientA[2][0],
                    (gradientPercentage * (gradientB[2][1] - gradientA[2][1])) + gradientA[2][1],
                    (gradientPercentage * (gradientB[2][2] - gradientA[2][2])) + gradientA[2][2],
                ]
            ];
            $("body").css("background", "linear-gradient(0deg, rgba("+gradientResult[0][0]+","+gradientResult[0][1]+","+gradientResult[0][2]+",1) 0%, rgba("+gradientResult[1][0]+","+gradientResult[1][1]+","+gradientResult[1][2]+",1) 50%, rgba("+gradientResult[2][0]+","+gradientResult[2][1]+","+gradientResult[2][2]+",1) 100%)");
        }
        $("body").css("background-attachment","fixed");
    }
    
    async function updateWeather() {
        let weather = await getWeather(city);

        let weatherIcon = weather.weather[0].icon;

        $(".kaupunki-nimi-otsikko").html(city);

        $(".kaupunki-banneri").css("background-image", "url('../img/"+city+"-day.jpg")

        let date = new Date((await getTime()).unixtime*1000);

        let viikonpaiva;

        switch((await getTime()).day_of_week){
            case 1:
                viikonpaiva = "Maanantai"
                break;
            case 1:
                viikonpaiva = "Tiistai"
                break;
            case 1:
                viikonpaiva = "Keskiviikko"
                break;
            case 1:
                viikonpaiva = "Torstai"
                break;
            case 1:
                viikonpaiva = "Perjantai"
                break;
            case 1:
                viikonpaiva = "Lauantai"
                break;
            case 1:
                viikonpaiva = "Sunnuntai"
                break;
        }

        var day = (date.getDate() < 10 ? '0' : '') + date.getDate(); //adding leading 0 if date less than 10 for the required dd format
        var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); //adding leading 0 if month less than 10 for mm format. Used less than 9 because javascriptmonths are 0 based.
        var year = date.getFullYear(); //full year in yyyy format

        var hours = ((date.getHours()) < 10 ? '0' : '') + (date.getHours() % 12 || 12); //converting 24h to 12h and using 12 instead of 0. also appending 0 if hour less than 10 for the required hh format
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(); //adding 0 if minute less than 10 for the required mm format

        var formattedDate = viikonpaiva +', klo ' + hours + '.' + minutes + ', ' + day + '.' + month + '.' + year;

        $(".paivitetty").html(formattedDate);

        $("#condition").attr("src", "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png");

        let lampotila;
        let feels;

        if(tempYksikko === "C"){
            lampotila = Math.round(weather.main.temp - 273.15)
            feels = Math.round(weather.main.feels_like - 273.15)
        }else if(tempYksikko === "F"){
            lampotila = Math.round((weather.main.temp - 273.15)*1.8 + 32)
            feels = Math.round((weather.main.feels_like - 273.15)*1.8 + 32)
        }
        
        $("#lampotila").html(lampotila+" &deg;"+tempYksikko);
        $("#tuntuu").html("Tuntuu kuin "+feels+" &deg;"+tempYksikko);
        
        $("#tuuli-suunta-kuvake").css("transform", "rotate("+weather.wind.deg+"deg)");

        let tuuli;
        let puska;

        if(nopeusYksikko === "m/s"){
            speed = Math.round(weather.wind.speed)
            gust = Math.round(weather.wind.gust)
        }else if(nopeusYksikko === "mph"){
            speed = Math.round(weather.wind.speed * 2.24)
            gust = Math.round(weather.wind.gust * 2.24)
        }

        $("#tuuli").html(weather.wind.deg+"&deg; "+speed+" "+nopeusYksikko);
        $("#tuulen-puska").html("Tuulen puska "+gust+" "+nopeusYksikko);

        $("#kosteus").html(weather.main.humidity+"%");

        let paine;

        if(paineYksikko === "hPa"){
            paine = Math.round(weather.main.pressure)
        }else if(paineYksikko === "inHg"){
            paine = Math.round(29.92 * (weather.main.pressure / 1013.2))
        }

        $("#paine").html(paine+" "+paineYksikko);

        $("#nakyvyys").html(weather.visibility+" m");
        if(weather.rain){
            $(".sade-hide").show();
            $("#sade").html(weather.rain["1h"]+" mm");
        }else{
            $(".sade-hide").hide();
            $("#sade").html("Ei sadetta");
        }
        

        if(weather.snow){
            $(".lumensyvyys-hide").show();
            $("#lumensyvyys").html(weather.snow["1h"]+" mm");
        }else{
            $("#lumensyvyys").html("Ei lunta");
            $(".lumensyvyys-hide").hide();
        }
    }

    $(".kaupunki").on("click", function(e){
        e.preventDefault();
        city = $(this).attr("kaupunki");
        $(".kaupunki").removeClass("kaupunki-active");
        $(this).addClass("kaupunki-active");
        updateWeather();
    })

    $("#temperature-switch").change(function(){
        if(this.checked){
            // Fahrenheit 
            tempYksikko = "F";
            $(".c").css("color", "#DCDCDC");
            $(".f").css("color", "#FFFFFF");
        }else{
            // Celsius 
            tempYksikko = "C";
            $(".f").css("color", "#DCDCDC");
            $(".c").css("color", "#FFFFFF");
        }
        updateWeather();
    })

    $("#nopeus-switch").change(function(){
        if(this.checked){
            // mph 
            nopeusYksikko = "mph";
            $(".ms").css("color", "#DCDCDC");
            $(".mph").css("color", "#FFFFFF");
        }else{
            // m/s 
            nopeusYksikko = "m/s";
            $(".mph").css("color", "#DCDCDC");
            $(".ms").css("color", "#FFFFFF");
        }
        updateWeather();
    })

    $("#paine-switch").change(function(){
        if(this.checked){
            // inHg 
            paineYksikko = "inHg";
            $(".hpa").css("color", "#DCDCDC");
            $(".inhg").css("color", "#FFFFFF");
        }else{
            // hPa 
            paineYksikko = "hPa";
            $(".inhg").css("color", "#DCDCDC");
            $(".hpa").css("color", "#FFFFFF");
        }
        updateWeather();
    })

    updateWeather();
    updateTime(city);
    setInterval(updateTime, 10000);
});