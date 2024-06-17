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
    preyerTimeList: new Array(30).fill({
      "Date": null,
      "Fajr": null,
      "Churuk": null,
      "Dhuhr": null,
      "Asr": null,
      "Maghrib": null,
      "Isha": null
  }),
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
        const PreyerTimeRes = data.data.map(dayObject=>{
          return {
            Date: dayObject.date.readable,
            Fajr: dayObject.timings.Fajr.slice(0,5),
            Churuk: dayObject.timings.Sunrise.slice(0,5),
            Dhuhr: dayObject.timings.Dhuhr.slice(0,5),
            Asr: dayObject.timings.Asr.slice(0,5),
            Maghrib: dayObject.timings.Maghrib.slice(0,5),
            Isha:dayObject.timings.Isha.slice(0,5)
          }
        })
        setApiCallData(data =>{
          return {...data, preyerTimeList: PreyerTimeRes}
        })

      }
      getPrayerTimeCall()
    }
  }, [userInput.stateName])

  const tableHeadersList = ["Date","Fajr","Churuk","Dhuhr","Asr","Maghrib","Isha"]
  console.log(apiCallData.preyerTimeList);
  return (
    <div>
      <Context.Provider value={{setUserInput, 
        countriesList: apiCallData.countriesList, 
        countryName: userInput.countryName, 
        stateName: userInput.stateName,
        statesList: apiCallData.statesOfChosenCountry}}>
        <Header />
        <UserInput />
        <TimeTable tableHeadersList={tableHeadersList} preyerTimeList={apiCallData.preyerTimeList}/>
      </Context.Provider>
      
    </div>
  )
}

export default App