// WeatherPopup.jsx
"use client";
import React from "react";
import axios from "axios";
export default function WeatherPopup({setData,setFirstVisited,setIsVisited}) {
     const key = `63aadc7631001ec07c9b49f545bb46cd`;

    const closePopup =()=>{
        setFirstVisited(false)
        setIsVisited(true)
        localStorage.setItem("visitedUser",true)
    }
    const fetchWeatherWithCurrentLocation =()=>{
        setIsVisited(true)
        setFirstVisited(false)
        localStorage.setItem("visitedUser",true)
        fetchWeather()

    }
    const fetchWeather = () =>{
         navigator.geolocation.getCurrentPosition((position)=>{
           const latitude = position.coords.latitude
           const longitude = position.coords.longitude
           axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
           ).then((response)=>{setData(response.data)
            console.log(response.data)
           }).catch((error)=>console.log(error))
         },(error)=>{
           console.log(error)
         })
    }
  return (
    <div className="fixed  -top-7 left-0 w-full h-[140vh] bg-black bg-opacity-40 flex justify-center items-start z-50 pt-[10vh] ">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-3">Welcome!</h2>
        <p className="mb-5">Would you like to fetch weather details for your city?</p>
        <div className="flex justify-center gap-4">
          <button className="bg-customGray text-black px-4 py-2 rounded-md hover:bg-gray-300" onClick={fetchWeatherWithCurrentLocation}>
            Fetch Weather
          </button>
          <button className="bg-customGray text-black px-4 py-2 rounded-md hover:bg-gray-300" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
