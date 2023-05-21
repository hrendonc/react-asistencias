import { useState, useEffect } from "react";
import List from "./components/list"

function App() {

  const [data, setData] = useState([])

  useEffect(()=>{
      fetch('https://back-asistencias.onrender.com/check')
      .then((response)=>response.json())
      .then((data)=>setData(data.body))
  }, [])

  const time = new Date()

  const check = {
     year: time.getFullYear(),
     month: time.getMonth()+1,
     day: time.getDate(),
    //  hour: time.getHours(),
    //  min: time.getMinutes()
     hour: 15,
     min: 33
  } 

  return (
    <List data={data} check={check}/>
  )
}

export default App
