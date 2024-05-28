import React, { createContext, useEffect, useState } from 'react'
import { Header, TimeTable, UserInput } from './components'
import { getCountries } from './api/countriesApi'
import { getStatesOfChosenCountry } from './api/statesOfChosenCountryList'
import { getPrayerTime } from './api/PrayerTimeApi'

export const Context = createContext({})

function App() {
  const [userInput, setUserInput] = useState({
    countryName: 'Tunisia', // for the adhen api
    countryCode: 'TN', // for the states of the country api
    stateName: '' // for the adhen api
  })

  const [apiCallData, setApiCallData] = useState({
    preyerTimeList: [],
    countriesList: [],
    statesOfChosenCountry: []
  })

  useEffect(()=>{
    const getCountriesCall = async ()=>{
      const countries = await getCountries()
      setApiCallData((data)=>{
        return {...data, countriesList: countries.map((country)=>{
          return {name: country.name.common, code: country.cca2}
        }).sort((c1, c2)=>{
          return c1.name < c2.name ? -1 : 1
        })}
      })
    }
    getCountriesCall()
  }, [])

  useEffect(()=>{
    const getStatesOfChosenCountryCall = async ()=>{
      
      const states = await getStatesOfChosenCountry(userInput.countryCode)
      const res = states.map(state => {
        return {name: state.name}
      }).sort((s1,s2)=>{
        return s1?.name < s2?.name ? -1 : 1
      })
      setApiCallData(data=>{
        return {...data, statesOfChosenCountry: res}
      })
      setUserInput(data=>{
        return {...data, stateName: res[0]?.name}
      })
    }
    getStatesOfChosenCountryCall()
  }, [userInput.countryCode])
  
  useEffect(()=>{
    
    if(userInput.stateName != ''){
      const getPrayerTimeCall = async ()=>{
        const data = await getPrayerTime(userInput.countryName, userInput.stateName)
        console.log(data);
        const res = data.data.map(dayObject=>{
          return {
            date: dayObject.date.readable,
            fajr: "5:40",
            chourouk: "6:00",
            dohr: "12:30",
            aser: "16:00",
            moghreb: "17:15",
            ishaa: "20:00"
          }
        })
      }
      getPrayerTimeCall()
    }
  }, [userInput.stateName])

  const tableHeadersList = ["date", "fajr", "chourouk", "dohr", "aser", "moghreb", "ishaa"]
  const preyerTimeList = [
    {
      date: "01/01/2024",
      fajr: "5:40",
      chourouk: "6:00",
      dohr: "12:30",
      aser: "16:00",
      moghreb: "17:15",
      ishaa: "20:00"
    },
    {
      date: "01/01/2024",
      fajr: "5:40",
      chourouk: "6:00",
      dohr: "12:30",
      aser: "16:00",
      moghreb: "17:15",
      ishaa: "20:00"
    },
    {
      date: "01/01/2024",
      fajr: "5:40",
      chourouk: "6:00",
      dohr: "12:30",
      aser: "16:00",
      moghreb: "17:15",
      ishaa: "20:00"
    },
    {
      date: "01/01/2024",
      fajr: "5:40",
      chourouk: "6:00",
      dohr: "12:30",
      aser: "16:00",
      moghreb: "17:15",
      ishaa: "20:00"
    },
  ]
  return (
    <div>
      <Context.Provider value={{setUserInput, 
        countriesList: apiCallData.countriesList, 
        countryName: userInput.countryName, 
        stateName: userInput.stateName,
        statesList: apiCallData.statesOfChosenCountry}}>
        <Header />
        <UserInput />
        <TimeTable tableHeadersList={tableHeadersList} preyerTimeList={preyerTimeList}/>
      </Context.Provider>
      
    </div>
  )
}

export default App