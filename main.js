const api ={
    key :"4b41f8950ae8c224685edb07fc95ef92",
    base: "https://api.openweathermap.org/data/2.5/"

}

const searchbox=document.querySelector('.search_box');

searchbox.addEventListener('keypress',setQuery);

function setQuery(event){
    // console.log(searchbox.value);
    // console.log(evt.keypCode);
    var x =  event.keyCode;
    if(x==13){
        // console.log(searchbox.value);
        getResults(searchbox.value);
    }

}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then (weather=>{
        return weather.json();

    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather); 
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name} ${weather.sys.country}`;

    let now=new Date();
    let date =document.querySelector('.location .date');
    date.innerText=dateBuild(now);
    let temp=document.querySelector('.current_temp .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    let currWeather=document.querySelector('.current_temp .weather');
    currWeather.innerText=weather.weather[0].main
    let minmax=document.querySelector('.current_temp .hi-low');
    minmax.innerText=`${Math.round(weather.main.temp_max)}°c/${Math.round(weather.main.temp_min)}°c`;

}
function dateBuild(d){
let months = ["January", "February", "March", "April", "May", 
"June", "July", "August", "September", "October", "November", "December"];
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[d.getDay()];
let date =d.getDate();
let month=months[d.getMonth()];
let year=d.getFullYear();
return `${day} ${date} ${month} ${year}`;
}