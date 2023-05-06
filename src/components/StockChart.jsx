import { useState } from 'react'
import Chart from 'react-apexcharts'

export const StockChart = ({chartData, symbol}) => {
    const { day, week, year } = chartData
    const [defineDate, setDefineDate] = useState("24h")

    const determineDate = () => {
        switch(defineDate){
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    }

    

    const options = {
        // colors: color,
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }

    const series = [{
        name: symbol,
        data: determineDate()
    }]

    return ( 
        <>
            <div className=" mt-5 p-4 bg-white shadow-sm w-4/6 m-auto">
                <Chart options={options} series={series} type="area" width="100%" />
            <div className='flex gap-2'>
                <button onClick={() => setDefineDate('24h')} className='border border-gray-500 px-2'>24h</button>
                <button onClick={() => setDefineDate('7d')} className='border border-gray-500 px-2'>7d</button>
                <button onClick={() => setDefineDate('1y')} className='border border-gray-500 px-2'>1y</button>
            </div>
            </div>
           
        </>
     );
}
 
export default StockChart;