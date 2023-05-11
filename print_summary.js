// Prints a summary and write to a log file

import { VCSum } from './utils.js'
import fs from 'fs'

export const PrintSummary = () => {
   
    let data = `${String(stepCount).padStart(8)}   ${String(timeNow.toFixed(1)).padStart(8)}   ${String((VCSum(vSum)/nMol).toFixed(4)).padStart(8)}   ${String(totEnergy.sum.toFixed(4)).padStart(8)}   ${String(kinEnergy.sum.toFixed(4)).padStart(8)}   ${String(pressure.sum.toFixed(4)).padStart(8)}`
    let data_print = `${data} \n`

    console.log(data)

    fs.appendFile('./log.txt',data_print, err => {
        if(err) throw err
    })
}