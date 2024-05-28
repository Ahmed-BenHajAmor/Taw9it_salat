import axios from "axios"
import { getDate } from "../../functions/getDate"

export const getPrayerTime = async (country, state ,method = 3)=>{
    const {year, month} = getDate()
    const url = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${state}&country=${country}&method=${method}`
    try{
        const response = await axios.get(url)
        
        return response.data
    }catch(error){
        console.error(error);
    }
}