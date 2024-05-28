import axios from "axios";

export const getStatesOfChosenCountry = async (countryCode)=>{
    const options = {
        method: 'GET',
        url: 'https://city-and-state-search-api.p.rapidapi.com/states',
        params: {country_code: countryCode},
        headers: {
          'X-RapidAPI-Key': '79f613fc02mshf0a77f9d18e8a23p126212jsnc0181ed7b654',
          'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
        }
      }; 
      try{
        const response = await axios.request(options)
        return response.data
      }catch(error){
        console.error(error);
      }
}