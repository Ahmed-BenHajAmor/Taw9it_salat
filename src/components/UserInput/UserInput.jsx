import React, { useContext } from 'react'
import { Context } from '../../App'
import './UserInput.css'

function UserInput() {
    const {countriesList, countryName, statesList, stateName} = useContext(Context)
  return (
    <section className="user-input">
        <div>
            <InputField fieldName={"country"} optionsList={countriesList}  value={countryName}/>
            <InputField fieldName={"state"} optionsList={statesList} value = {stateName}/>
        </div>
        
    </section>
  )
}


const InputField = ({fieldName, optionsList, value})=>{
    const {setUserInput} = useContext(Context)
    const mapCountryNameToCode = (name)=>{
        let i = 0
        let j = optionsList.length-1
        let m = Math.floor((i+j)/2)
        while(optionsList[m].name != name){
            if(optionsList[m].name > name){
                j = m-1
            }else{
                i = m+1
            }
            m = Math.floor((i+j)/2)
        }
        return optionsList[m].code

    }
    const handelInputFieldChange = (event)=>{
        
        const fieldsToChange = {
            [`${fieldName=='country' ? 'countryName' : 'stateName'}`]: event.target.value,

        }
        if(fieldName == 'country'){
            fieldsToChange.countryCode = mapCountryNameToCode(event.target.value)
        }

        setUserInput(data => {
            return {...data, ...fieldsToChange}
        })
    }
    return (
        <div className="input-field">
            <span>{fieldName} : </span>
            <select value={value} onChange={handelInputFieldChange} name={fieldName}>
                {
                    optionsList?.map((op, key)=>{
                        return <option key = {key} value={op?.name}>{op?.name}</option>
                    })
                }
            </select>
        </div>
    )
}
export default UserInput