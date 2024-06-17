import React from 'react'
import './TimeTable.css'
import { getDate } from '../../functions/getDate'

function TimeTable({preyerTimeList, tableHeadersList}) {
    const {date} = getDate()
  return (
    <section className="time-table">
        <table>
            <thead>
                <tr>
                    {tableHeadersList?.map((col, key)=>{
                        return <th key={key}>{col}</th>
                    })}
                </tr>
                
            </thead>
            <tbody>
                {
                    preyerTimeList?.map((dayPreyerTime, key)=>{
                        const highlighted = preyerTimeList.indexOf(dayPreyerTime) == date-1
                        return <TableRow key={key} highlighted={highlighted} rowData={dayPreyerTime} tableHeadersList={tableHeadersList}/>
                    })
                }
            </tbody>
        </table>
    </section>
  )
}


const TableRow = ({rowData, tableHeadersList, highlighted})=>{
    return (
        <tr className={highlighted && 'highlight'}>
            {
                tableHeadersList?.map((header, key) =>{
                    return <td key={key}>{rowData[header] || "..."}</td>
                })
            }
        </tr>
    )
}

export default TimeTable