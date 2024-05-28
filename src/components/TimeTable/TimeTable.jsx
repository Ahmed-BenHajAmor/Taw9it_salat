import React from 'react'
import './TimeTable.css'

function TimeTable({preyerTimeList, tableHeadersList}) {
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
                        return <TableRow key={key} rowData={dayPreyerTime} tableHeadersList={tableHeadersList}/>
                    })
                }
            </tbody>
        </table>
    </section>
  )
}


const TableRow = ({rowData, tableHeadersList})=>{
    console.log(rowData);
    return (
        <tr>
            {
                tableHeadersList?.map((header, key) =>{
                    return <td key={key}>{rowData[header]}</td>
                })
            }
        </tr>
    )
}

export default TimeTable