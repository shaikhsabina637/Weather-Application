import { useState } from "react"
import MainPage from "./MainPage"

function WeatherApp() {
    const [firstVisited,setFirstVisited] = useState(true)
    const [isVisited ,setIsVisited] = useState(false)
    const allProps ={
      firstVisited,
      setFirstVisited,
      isVisited,
      setIsVisited
    }
  
  return (
    <>
    <MainPage {...allProps} />
    
    </>
  )
}

export default WeatherApp
