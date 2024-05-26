import axios from 'axios';

export const getData = async ({ year, month}, {state, country }, setData, method = 3) => {
    

    const url = `
    https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${state}&country=${country}&method=${method}
    `;

    try {
        const response = await axios.get(url);
        setData((data)=>{
            return {...data, timeData: response.data}
        })
    } catch (error) {
        console.error(error);
    }
}

export const getStates = async (countryCode) => {

    const states = []
    const options = {
      method: 'GET',
      url: 'https://city-and-state-search-api.p.rapidapi.com/states',
      params: {country_code: countryCode},
      headers: {
        'X-RapidAPI-Key': '79f613fc02mshf0a77f9d18e8a23p126212jsnc0181ed7b654',
        'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        cities = response.data.forEach((state)=>{
            return state.name
        });
        return states
    } catch (error) {
        console.error(error);
    }
}

export const getCountriesList = async (setData)=>{
    const url = 'https://restcountries.com/v3.1/all'
    try{
        const response = await axios.get(url)
        const res = response.data.map(country => {return {name: country.name.common, code: country.cca2}})
        setData((data)=>{
            return {...data, countriesList: res}
        })
    }catch(error){
        console.error(error);
    }
}


export const setCurrentDate = (setData)=>{
    const now = new Date()
    setData(data => {
        return {...data, currentDate: {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
        }}
    })

}
