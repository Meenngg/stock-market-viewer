import { useEffect } from "react"
import { useParams } from "react-router-dom"
import finnhub from "../apis/finnhub"

export const StockDetailPage = () => {
    const {symbol} = useParams()

    useEffect(() => {
            const fetchData = async () => {
                const date = new Date()
                const currentTime = date.getTime()
                const oneDayAgo = currentTime - 24 * 60 * 60
                const response = await finnhub.get('/stock/candle', {
                    params: {
                        symbol,
                        resolution: 30,
                        from: oneDayAgo,
                        to: currentTime
                    }
                })
            }
    }, [])
    

    return (
        <>
            <div>
                <h1>Stock Detail Page of {symbol} </h1>
            </div>
        </>
    )
}