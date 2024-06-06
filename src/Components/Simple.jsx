import React, { useState, useEffect, useCallback } from 'react';
import { FaCloud } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TbDirectionSignFilled } from "react-icons/tb";
import { BsMoon } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import axios from 'axios';

function Navbar() {
  const [textValue, setTextValue] = useState('');
  const [data, setData] = useState(null);

  // Memoize the getData function using useCallback
  const getData = useCallback(async () => {
    if (textValue) {
      try {
        const key = `63aadc7631001ec07c9b49f545bb46cd`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${textValue}&appid=${key}&units=metric`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const key = `63aadc7631001ec07c9b49f545bb46cd`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${key}&units=metric`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [textValue]);

  useEffect(() => {
    getData();
  }, [getData]); // Include getData in the dependency array

  // Your JSX and other code

  if (!data) {
    return <div>Loading...</div>;
  }
  const convertUnixTime = (set) => {
    return new Date(set * 1000).toLocaleString('en-US', {
      hour: '2-digit',
      hour12: true
    })
  }
  const today = new Date()
  const currentTime = (date) => {
    const dayOfMonth = date.toLocaleDateString('en-US', { month: 'long' });
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfDay = date.toLocaleDateString('en-US', { day: 'numeric' });
    return (`${dayOfDay} ${dayOfMonth} ${dayOfWeek}`)
  }

  const currenttimed = currentTime(today)
  return (
    <>
    <nav className='bg-red-700 flex lg:justify-evenly  sm:flex-col sm:items-center sm:justify-center sm:gap-2 p-8 lg:mx-[15vw] sm:w-full]'>
        <div className='bg-yellow-200 flex justify-evenly items-center lg:px-5  rounded-md lg:w-[10vw] sm:px-10 sm:py-2 '>
        <FaCloud className='lg:text-3xl  lg:mr-3 sm:mr-3' /> 
         <p className=''>weather</p>
        </div>
        <div className='bg-blue-200 flex ml-5 mr-2 lg:w-[30vw] sm:w-full rounded-md p-2'>
           <CiSearch className='text-2xl  mr-2'/> 
         <input className='border flex-1 placeholder:capitalize focus:outline-none '
         type="text"
         placeholder='ankara'
         value={textValue}
         onChange={(e)=>{setTextValue(e.target.value)}}
         />
        </div>
        <div className='bg-purple-200 lg:w-[5vw]  sm:w-[10vw] flex justify-center items-center rounded-md '>
        <TbDirectionSignFilled className='text-3xl' onClick={getData}/>
        </div>
        <div className='bg-pink-200 lg:w-[5vw] sm:w-[15vw] sm:py-2 flex justify-center items-center rounded-md'>
        <BsMoon className='lg:text-2xl '/>
        </div>
        <div className='bg-green-200 lg:w-[10vw] sm:w-[45vw] sm:py-3 flex justify-center items-center rounded-md'>
         <BsGithub className='text-2xl'/>
         <p className='text-white  capitalize ml-2'>support github</p>
        </div>
    </nav>
    {/* main section start */}
    <div className='flex '>
        <h1 className='text-3xl capitalize ml-[17vw]'>today overview</h1>
    </div>
    <div className='bg-orange-200 flex sm:flex-col sm:gap-6 lg:w-[67vw] ml-[17vw] mt-3 h-[65vh] sm:p-3 sm:w-full sm:ml-[0vw] sm:h-auto'>
        {/* first section */}
     <div className='bg-purple-300 lg:w-[17vw] sm:w-full flex pl-5 flex-col border  rounded-md border-black '>
       <img width="100px" 
        className="text-black  bg-red-300 w-[60%]"  alt='' src='https://weather-pekkiriscim.vercel.app/src/img/animated/50n.svg'/>
        <p className=' font-bold ml-3 text-3xl mt-3'>{data.main.temp}<sup className=''>0</sup><span className='uppercase'>c</span></p>
        <p className='capitalize text-7 m-3'>{data.weather[0].main}</p>
        <div className='h-1 lg:w-[13vw]  sm:w-[57vw] mt-3 mb-8 bg-black'></div>
        <div className='flex bg-red-200  items-center mb-4 lg:w-[10vw] sm:w-[30vw]'>
            <GrLocation className='text-2xl'/>
            <p className='capitalize ml-3'>{data.name}</p>
        </div>
        <div className='flex  items-center bg-red-200 lg:w-[15vw] sm:w-[35vw]'>
            <SlCalender className='text-2xl'/>
            <h1 className=' ]capitalize ml-3'>{currenttimed}</h1>
        </div>
     </div>
     {/* second section */}
     <div div className='bg-yellow-200 lg:w-[35vw]  sm:w-full grid sm:gap-2 grid-cols-2 lg:ml-3 sm:ml-0'>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center mb-2 rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px" alt='' src='https://weather-pekkiriscim.vercel.app/assets/wind-speed-2842a89a.svg'/>
        </div>
        <div className='bg-yellow-200 p-3'>
            <p className='capitalize sm:w-[22vw]'>wind speed</p>
            <h1 className='lg:text-2xl font-bold '>{data.wind.speed} km/h</h1>
        </div>
       </div>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center mb-2  rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px"  alt='' src='https://weather-pekkiriscim.vercel.app/assets/humidity-9967a3ee.svg'/>
        </div>
        <div className='bg-yellow-200 p-3'>
            <p className='capitalize'>humidty</p>
            <h1 className='lg:text-2xl font-bold '>{data.main.humidity}%</h1>
        </div>
       </div>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center mb-2 rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px" alt="" src='https://weather-pekkiriscim.vercel.app/assets/pressure-c40ee94f.svg'/>
        </div>
        <div className='bg-yellow-200 p-3 '>
            <p className='capitalize'>pressure</p>
            <h1 className='lg:text-2xl font-bold '>{data.main.pressure} hPa</h1>
        </div>
       </div>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center  mb-2 rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px" alt="" src='https://weather-pekkiriscim.vercel.app/assets/visibility-4640ec89.svg'/>
        </div>
        <div className='bg-yellow-200 p-3'>
            <p className='capitalize'>visibility</p>
            <h1 className='lg:text-2xl font-bold '>{data.visibility/1000} km</h1>
        </div>
       </div>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center mb-2 rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px"alt='' src='https://weather-pekkiriscim.vercel.app/assets/sunrise-b4af7bf6.svg'/>
        </div>
        <div className='bg-yellow-200 p-3'>
            <p className='capitalize'>sunrise</p>
            <h1 className='lg:text-2xl font-bold '>{convertUnixTime(data.sys.sunrise)}</h1>
        </div>
       </div>
       <div className="bg-red-700 p-3 lg:w-[15vw] sm:w-full flex justify-evenly items-center mb-2  rounded-md" >
        <div className='flex justify-center items-center bg-yellow-200'>
            <img heigth="50px" width="50px"alt='' src='https://weather-pekkiriscim.vercel.app/assets/sunset-c78c837e.svg'/>
        </div>
        <div className='bg-yellow-200 p-3'>
            <p className='capitalize'>sunset</p>
            <h1 className='lg:text-2xl font-bold '>{convertUnixTime(data.sys.sunset)}</h1>
        </div>
        </div>
        </div>
        {/* third section starts */}
        <div className='bg-red-500 flex justify-between  items-center flex-col w-[20vw] sm:w-full p-2 sm:gap-2  rounded-md'>
            <div className='bg-purple-200 flex justify-around p-3 w-[100%] ] '>
            <div className='flex justify-center flex-col bg-yellow-200 p-2 rounded-md sm:w-[50vw]'>
               <p className='text-3 capitalize'>saturday</p>
               <h1 className=''>20 :30</h1>
            </div>
            <div className='flex justify-center items-center '> 
            <p className=' text-2xl'>23<sup className=''>0</sup><span className='uppercase'>c</span></p>
            </div>
            </div>
            <div className='bg-purple-200 flex justify-around p-3 w-[100%] rounded-md '>
            <div className='flex justify-center flex-col bg-yellow-200 p-2 sm:w-[50vw]'>
               <p className='text-3 capitalize'>saturday</p>
               <h1 className=''>20 :30</h1>
            </div>
            <div className='flex justify-center items-center '> 
            <p className=' text-2xl'>23<sup className=''>0</sup><span className='uppercase'>c</span></p>
            </div>
            </div>
            <div className='bg-purple-200 flex justify-around p-3 w-[100%] rounded-md'>
            <div className='flex justify-center flex-col bg-yellow-200 p-2 sm:w-[50vw]'>
               <p className='text-3 capitalize'>saturday</p>
               <h1 className=''>20 :30</h1>
            </div>
            <div className='flex justify-center items-center '> 
              <p className=' text-2xl'>23<sup className=''>0</sup><span className='uppercase'>c</span></p>
            </div>
            </div>
            <div className='bg-purple-200 flex justify-around p-3 w-[100%] rounded-md'>
            <div className='flex justify-center flex-col bg-yellow-200 p-2 sm:w-[50vw]'>
               <p className='text-3 capitalize'>saturday</p>
               <h1 className=''>20 :30</h1>
            </div>
            <div className='flex justify-center items-center '> 
            <p className=' text-2xl'>23<sup className=''>0</sup><span className='uppercase'>c</span></p>
            </div>
            </div>
            <div className='bg-purple-200 flex justify-around p-3 w-[100%] rounded-md'>
            <div className='flex justify-center flex-col bg-yellow-200 p-2 sm:w-[50vw]'>
               <p className='text-3 capitalize'>saturday</p>
               <h1 className=''>20 :30</h1>
            </div>
            <div className='flex justify-center items-center '> 
            <p className=' text-2xl'>23<sup className=''>0</sup><span className='uppercase'>c</span></p>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Navbar
