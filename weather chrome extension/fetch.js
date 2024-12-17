const API_key='77951553f1fa58b2de881ba6c880af03';

window.onload=()=>{

    const fetchWeatherData=async(latitude,longitude)=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
        try{
            const response=await fetch(url);
            const weatherData=await response.json();
            return weatherData;

        }catch(error){
                console.log('Error fetching weather data:' + error);
        }
    
    }

    async function fetchWeatherIcon(iconCode){
        try {
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const response = await fetch(iconUrl);
            const iconBlob = await response.blob();
            return URL.createObjectURL(iconBlob);
        } catch (error) {
            console.error('Error fetching weather icon:', error);
        }
    }

    async function updateUi(data){
        if(!data)return;

        document.querySelector('.text_location').textContent = data.name;
        document.querySelector('.text_location_country').textContent = data.sys.country;
        document.querySelector('.text_temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.text_feelslike').textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        document.querySelector('.text_desc').textContent = data.weather[0].description;

        const iconURL = await fetchWeatherIcon(data.weather[0].icon);
        document.querySelector('#icon').src = iconURL;
    }
    
    const geoSuccess=async (position)=>{
        const {latitude,longitude}=position.coords;
        const fetchWeather= await fetchWeatherData(latitude,longitude);
        updateUi(fetchWeather);
    }


       
    
    navigator.geolocation.getCurrentPosition(
        geoSuccess,
        (error)=>console.error('Error getting location'),
        {enableHighAccuracy:true}    
    )

}