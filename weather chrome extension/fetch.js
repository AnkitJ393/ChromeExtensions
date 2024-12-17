const API_key='77951553f1fa58b2de881ba6c880af03';

window.onload=()=>{
    const geoSuccess=(position)=>{
        const {latitude,longitude}=position.coords;
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;

        fetch(url)
        .then(res=>res.json())
        .then(jsonData=>{
            
            fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
            .then(res=>res.blob())
            .then((result)=>{
                document.querySelector('.text_location').innerHTML=jsonData.name;
                document.querySelector('.text_location_country').innerHTML=jsonData.sys.country;

                document.querySelector('.text_temp').innerHTML=Math.round(jsonData.main.temp);
                document.querySelector('.text_feelslike').innerHTML=`  ${Math.round(jsonData.main.feels_like)}`;

                document.querySelector('.text_desc').innerHTML=jsonData.weather[0].description;

                const imageObjectURL=URL.createObjectURL(result);
                document.querySelector('#icon').innerHTML=imageObjectURL;


            })
        })
    }
    
    navigator.geolocation.getCurrentPosition(geoSuccess)

}