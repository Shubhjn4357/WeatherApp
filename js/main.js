import {Data} from "/Weather/city_coordinates.js"
const inputField=document.getElementById("Form-capture")
const copyright=document.getElementById("copyright")
const WeatherController=document.getElementById("weather-report")
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const AdWl=()=>{
        Data.map((i)=>{
        const Element=document.createElement("option");
        Element.classList.add("opt");
        Element.innerHTML=i.city
        Element.setAttribute("value",`lon=${i.longitude}&lat=${i.latitude}`)
        Element.setAttribute("id",i.city)
        inputField.appendChild(Element)
        copyright.innerHTML=`@Copyright ${new Date().getFullYear()}`;
    })
}
AdWl()

inputField.addEventListener("change",async(e)=>{
    const val=e.target.value;
    const id=e.target.selectedOptions[0].id;
    try{
        WeatherController.innerHTML=`<div class=d-center><div class=loader></div></div>`
        const res=await fetch(`http://www.7timer.info/bin/api.pl?${val}&product=civillight&output=json`)
        const wea=await res.json();
        const date=wea.dataseries[0].date;
        const year=date.toString().slice(0,4);
        const month=date.toString().slice(4,6);
        const currentDate=date.toString().slice(6,8);
        const d = new Date();
        d.setDate(currentDate);
        let day = weekday[d.getDay()];
        WeatherController.innerHTML=`
        <div class='card'>
            <h2>${id}</h2>
            <h2>${wea.dataseries[0].weather}<span class='text-xl'>Wind ${wea.dataseries[0].wind10m_max} km/h <span class='dot'>•</span>
            </span>${currentDate}/${month}/${year}   ${day}</h2>
            <div class='sky my-2'>
                <img src=/Weather/images/${wea.dataseries[0].weather}.png alt=${id}/>
                <h1>${wea.dataseries[0].temp2m.max}Deg/C</h1>
            </div>
        </div>
        <div class='d-flex'>    
                ${wea.dataseries.map((x,id)=>{
                    if(id>0){
                    const date=wea.dataseries[id].date;
                    // const year=date.toString().slice(0,4);
                    // const month=date.toString().slice(4,6);
                    const currentDate=date.toString().slice(6,9);
                    const d = new Date()
                    d.setDate(currentDate);
                    let curday = weekday[d.getDay()];
                    return `<div class='card d-center flex-col gap-2'><div class='text-xl'>${curday}</div><div>Max:${x.temp2m.max}</div><div>Min:${x.temp2m.min}</div></div>   `
                    }
                    return `<span></span>`
                })}
            
        </div>
        `
    }
    catch(error){
        console.log(error)
    }
});