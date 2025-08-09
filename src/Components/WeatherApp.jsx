import { useState } from "react"
import MainPage from "./MainPage"

function WeatherApp() {
    const [firstVisited,setFirstVisited] = useState(true)
    const [isVisited ,setIsVisited] = useState(false)
    const [darkTheme,setDarkTheme] = useState(false)
    const allProps ={
      firstVisited,
      setFirstVisited,
      isVisited,
      setIsVisited,
      darkTheme,setDarkTheme
    }
  
  return (
    <>
    <MainPage {...allProps} />
    
    </>
  )
}

export default WeatherApp
