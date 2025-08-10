import { useState, useEffect, useCallback } from "react";
import { FaCloud } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TbDirectionSignFilled } from "react-icons/tb";
import { BsGithub } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import WeatherPopup from "./WeatherPopup";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import axios from "axios";

function MainPage(props) {
  const { darkTheme, setDarkTheme } = props;
  const [textValue, setTextValue] = useState("");
  const [data, setData] = useState(null);
  const visitedUserCheck = localStorage.getItem("visitedUser");

  const toggleIcon = () => setDarkTheme(!darkTheme);

  const getData = useCallback(async (searchText) => {
    try {
      const key = `63aadc7631001ec07c9b49f545bb46cd`;
      const city = searchText || "Mumbai";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      const response = await axios.get(url);
      setData(response.data);
      if (searchText) setTextValue("");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData("");
  }, [getData]);

  const keyWeatherHandler = (e) => {
    if (e.key === "Enter") getData(textValue);
  };

  if (!data) {
    return (
      <div
        className={`rounded-md h-22 w-25 flex justify-center items-center animate-spin absolute ${
          darkTheme
            ? "border-[3px] border-customGray bg-black"
            : "bg-customGray"
        }`}
      ></div>
    );
  }

  const convertUnixTime = (set) =>
    new Date(set * 1000).toLocaleString("en-US", {
      hour: "2-digit",
      hour12: true,
    });

  const today = new Date();
  const currentTime = (date) => {
    const dayOfMonth = date.toLocaleDateString("en-US", { month: "long" });
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayOfDay = date.toLocaleDateString("en-US", { day: "numeric" });
    return `${dayOfDay} ${dayOfMonth} ${dayOfWeek}`;
  };

  const currenttimed = currentTime(today);
  const handlerGithub = () =>
    window.open("https://github.com/shaikhsabina637/04-weatherApp");

  const weatherImages = {
    Clouds: "https://weather-pekkiriscim.vercel.app/src/img/animated/04d.svg",
    Rain: "",
    Mist: "https://weather-pekkiriscim.vercel.app/src/img/animated/50d.svg",
    Clear: "https://weather-pekkiriscim.vercel.app/src/img/animated/01d.svg",
    Haze: "https://weather-pekkiriscim.vercel.app/src/img/animated/50d.svg",
  };

  const weatherCondition = data.weather[0].main;
  const weatherImage = weatherImages[weatherCondition];

  return (
    <div
      className={`w-full max-w-[100vw] overflow-x-hidden px-4 min-h-screen ${
        darkTheme ? "bg-black text-customGray" : "bg-white text-black"
      }`}
    >
      {props.firstVisited && !visitedUserCheck && (
        <WeatherPopup {...props} setData={setData} />
      )}

      {/* Navbar */}
      <nav
        className={`flex flex-wrap gap-3 justify-evenly items-center p-4 w-full ${
          darkTheme ? "bg-black" : "bg-white"
        }`}
      >
        {/* Weather logo */}
        <div
          className={`flex items-center px-4 py-2 rounded-md min-w-[140px] mx-auto sm:mx-0 ${
            darkTheme
              ? "bg-black border-[3px] border-customGray"
              : "bg-customGray"
          }`}
        >
          <FaCloud
            className={`text-xl sm:text-2xl mr-2 ${
              darkTheme ? "text-customGray" : "text-black"
            }`}
          />
          <p
            className={`text-base sm:text-lg ${
              darkTheme ? "text-customGray" : "text-black"
            }`}
          >
            weather
          </p>
        </div>

        {/* Search input */}
        <div
          className={`flex w-full sm:w-auto sm:flex-1 min-w-[200px] rounded-md p-2 max-w-lg mx-auto sm:mx-2 order-2 sm:order-none ${
            darkTheme
              ? "bg-black border-[3px] border-customGray"
              : "bg-customGray"
          }`}
        >
          <CiSearch
            className={`text-xl sm:text-2xl mr-2 ${
              darkTheme ? "text-customGray" : "text-black"
            }`}
          />
          <input
            className={`flex-1 placeholder:capitalize focus:outline-none text-sm sm:text-base ${
              darkTheme
                ? "bg-black text-customGray placeholder-customGray"
                : "bg-customGray"
            }`}
            type="text"
            placeholder="mumbai"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => keyWeatherHandler(e)}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 w-full sm:w-auto order-3 sm:order-none">
          <div
            className={`flex justify-center items-center rounded-md p-2 w-[45px] sm:w-[50px] ${
              darkTheme
                ? "bg-black border-[3px] border-customGray"
                : "bg-customGray"
            }`}
          >
            <TbDirectionSignFilled
              className={`text-2xl sm:text-3xl ${
                darkTheme ? "text-customGray" : "text-black"
              }`}
              onClick={() => getData(textValue)}
            />
          </div>

          <div
            className={`flex justify-center items-center rounded-md px-3 sm:px-4 py-0 hover:scale-x-110 duration-1000 transition-all min-w-[140px] sm:min-w-[160px] ${
              darkTheme
                ? "bg-customGray text-black border-[3px] border-customGray"
                : "bg-black text-white"
            }`}
            onClick={handlerGithub}
          >
            <BsGithub className="text-lg sm:text-xl" />
            <p className="capitalize ml-2 text-sm sm:text-base">
              support github
            </p>
          </div>

          <div
            onClick={toggleIcon}
            className={`cursor-pointer p-2 rounded-md flex justify-center items-center ${
              darkTheme
                ? "bg-black border-[3px] border-customGray"
                : "bg-customGray"
            }`}
          >
            {darkTheme ? (
              <MdLightMode className="text-white text-xl sm:text-2xl" />
            ) : (
              <MdDarkMode className="text-gray-800 text-xl sm:text-2xl" />
            )}
          </div>
        </div>
      </nav>

      {/* Title */}
      <div
        className={`flex justify-center lg:justify-start mt-5 ${
          darkTheme ? "text-customGray" : "text-black"
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl capitalize ml-0 lg:ml-16">
          today overview
        </h1>
      </div>

      {/* Weather details */}
      <div className="flex flex-col lg:flex-row gap-6 mt-3 p-4 sm:p-8 lg:p-16 w-full h-auto max-w-[1800px] mx-auto">
        {/* Left box */}
        <div
          className={`flex flex-col rounded-md p-4 items-center lg:items-start w-full lg:w-[30%] ${
            darkTheme
              ? "bg-black border-[3px] border-customGray"
              : "bg-customGray"
          }`}
        >
          <div>
            <img
              className={`w-[50%] sm:w-[60%] max-w-[150px] ${
                darkTheme ? "brightness-0 invert" : ""
              }`}
              alt=""
              src={weatherImage}
            />
          </div>
          <p
            className={`font-bold text-2xl md:text-3xl mt-3 ${
              darkTheme ? "text-customGray" : "text-black"
            }`}
          >
            {data.main.temp}
            <sup>0</sup>
            <span className="uppercase">c</span>
          </p>
          <p
            className={`capitalize mt-2 text-base sm:text-lg ${
              darkTheme ? "text-customGray" : "text-black"
            }`}
          >
            {data.weather[0].main}
          </p>
          <div
            className={`h-1 w-full my-4 ${
              darkTheme ? "bg-customGray" : "bg-black"
            }`}
          ></div>
          <div className="flex items-center mb-2">
            <GrLocation
              className={`text-xl sm:text-2xl ${
                darkTheme ? "text-customGray" : "text-black"
              }`}
            />
            <p
              className={`capitalize ml-3 text-sm sm:text-base ${
                darkTheme ? "text-customGray" : "text-black"
              }`}
            >
              {data.name}
            </p>
          </div>
          <div className="flex items-center">
            <SlCalender
              className={`text-xl sm:text-2xl ${
                darkTheme ? "text-customGray" : "text-black"
              }`}
            />
            <h1
              className={`capitalize ml-3 text-sm sm:text-base ${
                darkTheme ? "text-customGray" : "text-black"
              }`}
            >
              {currenttimed}
            </h1>
          </div>
        </div>

        {/* Right info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-[70%]">
          {[
            {
              label: "wind speed",
              value: `${data.wind.speed} km/h`,
              icon: "https://weather-pekkiriscim.vercel.app/assets/wind-speed-2842a89a.svg",
            },
            {
              label: "humidity",
              value: `${data.main.humidity}%`,
              icon: "https://weather-pekkiriscim.vercel.app/assets/humidity-9967a3ee.svg",
            },
            {
              label: "pressure",
              value: `${data.main.pressure} hPa`,
              icon: "https://weather-pekkiriscim.vercel.app/assets/pressure-c40ee94f.svg",
            },
            {
              label: "visibility",
              value: `${data.visibility / 1000} km`,
              icon: "https://weather-pekkiriscim.vercel.app/assets/visibility-4640ec89.svg",
            },
            {
              label: "sunrise",
              value: convertUnixTime(data.sys.sunrise),
              icon: "https://weather-pekkiriscim.vercel.app/assets/sunrise-b4af7bf6.svg",
            },
            {
              label: "sunset",
              value: convertUnixTime(data.sys.sunset),
              icon: "https://weather-pekkiriscim.vercel.app/assets/sunset-c78c837e.svg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-3 flex justify-evenly items-center rounded-md ${
                darkTheme
                  ? "bg-black border-[3px] border-customGray"
                  : "bg-customGray"
              }`}
            >
              <div>
                <img
                  height="40px"
                  width="40px"
                  alt=""
                  src={item.icon}
                  className={darkTheme ? "brightness-0 invert" : ""}
                />
              </div>
              <div className="p-2">
                <p
                  className={`capitalize text-sm sm:text-base ${
                    darkTheme ? "text-customGray" : "text-black"
                  }`}
                >
                  {item.label}
                </p>
                <h1
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    darkTheme ? "text-customGray" : "text-black"
                  }`}
                >
                  {item.value}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
