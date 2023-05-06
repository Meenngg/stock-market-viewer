import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import finnhub from "../apis/finnhub"
import StockChart from "../components/StockChart"
import StockData from "../components/StockData"

const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: data.c[index]
        }
    })
}

export const StockDetailPage = () => {
    const {symbol} = useParams()
    const [chartData, setChartData] = useState([])

    const navigate = useNavigate()

    const backToMenu = () => {
        navigate('/')
    }

    useEffect(() => {
            const fetchData = async () => {
                const date = new Date()
                const currentTime = Math.floor(date.getTime() / 1000)
                let setDay;
                if (date.getDay() === 6) { //SATURDAY
                    setDay = currentTime - 2 * 24 * 60 * 60
                }
                else if (date.getDay() === 0) { //SUNDAY
                    setDay = currentTime - 3 * 24 * 60 * 60
                }
                else { // WEEKDAYS
                    setDay = currentTime - 24 * 60 * 60
                }

                const oneWeek = currentTime - 7 * 24 * 60 * 60
                const oneYear = currentTime - 365 * 24 * 60 * 60

                try {
                    const responses = await Promise.all([
                        // Day Candles
                        finnhub.get('/stock/candle', {
                            params: {
                                symbol,                  
                                from: setDay,
                                to: currentTime,
                                resolution: 30,
                            }
                        }),
                        // Week Candles
                        finnhub.get('/stock/candle', {
                            params: {
                                symbol,                  
                                from: oneWeek,
                                to: currentTime,
                                resolution: 'D',
                            }
                        }),
                        // Year Candles
                        finnhub.get('/stock/candle', {
                            params: {
                                symbol,                  
                                from: oneYear,
                                to: currentTime,
                                resolution: 'W',
                            }
                        })
                    ])
                    // console.log(responses)  
                    
                    setChartData({
                        day: formatData(responses[0].data),
                        week: formatData(responses[1].data),
                        year: formatData(responses[2].data)
                    })

                } catch (err) {
                    console.log(err)
                }          
            }
            fetchData()
    }, [symbol])
    

    return (
        <>
            <button className="m-2 p-1 font-bold uppercase" onClick={backToMenu}>Back</button>

            <div>
                {chartData && <StockChart chartData={chartData} symbol={symbol} />}
            </div>
            <div>
                <StockData symbol={symbol}/>
            </div>
        </>
    )
}