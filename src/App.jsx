import React, { useEffect, useState } from 'react'
import {getData, getCountriesList, setCurrentDate} from './api/getData';
import { createContext } from 'react';
// import components 
import { TimeTable, GetInput } from './components';

export const dataContext = createContext()

function App() {
  const [data, setData] = useState({
    currentLocation: {
      country: 'tunisia',
      state: 'tunis'
    }
  })

  
  useEffect(()=>{
    setCurrentDate(setData)
    
    getCountriesList(setData);
  }, [])

  useEffect(() => {
    if (data.currentDate) {
      getData(data.currentDate, data.currentLocation, setData);
    }
  }, [data.currentDate, data.currentLocation]);
  console.log(data);
  return (
    <dataContext.Provider value={{data, setData}}>
      <GetInput />
    
    </dataContext.Provider>
  )
}

export default App;