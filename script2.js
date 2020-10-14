let cityName = '';
let cityTemp = '';
let cityHumi = '';
let weatherRequest = '';
let icono;
    
    
    
    function searchCity(){

        const cityFromDom = document.getElementById('city').value;
        const country = 'es';

        const getWeatherData = () => {
            return new Promise((resolve,reject) => {
                const apiKey = '55e86f9d9518db551c1dcccd792dc068';
    
                weatherRequest = new XMLHttpRequest
    
                weatherRequest.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+cityFromDom+','+country+'&APPID=55e86f9d9518db551c1dcccd792dc068')
                setTimeout(() => weatherRequest.send(),3000);
    
                weatherRequest.onload = function() {
                    if(weatherRequest.status !== 200) {
                        console.log('ha ocurrido un error',status.value);
                        reject(weatherRequest.status)
                    } else {
                        const parsedResponse = JSON.parse(weatherRequest.response);
                        console.log('respuesta parseada',parsedResponse);
                        cityName = parsedResponse.name;
                        cityTemp = parsedResponse.main.temp;
                        cityHumi = parsedResponse.main.humidity;
                        icono = parsedResponse.weather[0].icon;
                        resolve(parsedResponse);
                    }
                };
            });
        }

        getWeatherData(cityFromDom)
            .then(response => console.log('RESPONSE IS', response))
            .then(function innerInfo(){
                console.log(cityName);
                let ciudad = document.getElementById('cityId')
                let temperatura = document.getElementById('tempId')
                let humedad = document.getElementById('humidityId')
                let iconoTiempo = document.getElementById('div-one')

                iconoTiempo.insertAdjacentHTML("afterbegin",`<img src="http://openweathermap.org/img/wn/${icono}@2x.png">`)
                cityTemp = (cityTemp-272).toFixed(1)
                ciudad.innerHTML = cityName
                temperatura.innerHTML = cityTemp+'º'
                humedad.innerHTML = cityHumi
            })
            .catch(error => console.log(error))
        }