import { useEffect, useState } from "react";
import finnhub from "../apis/finnhub";

const StockData = ({symbol}) => {
    
    const [detailsData, setDetailsData] = useState([])

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnhub.get('/stock/profile2', {
                    params: {
                        symbol:symbol
                    }  
                })
                
                if (isMounted) {
                    setDetailsData(response.data)
                }

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [symbol])


    return ( 
        <>
            {detailsData && <div className=" mt-2 p-4 bg-white shadow-sm w-4/6 m-auto">
                <p className="text-red-500 text-2xl">Stock Data</p>
                <ul className="mt-2 grid grid-cols-3 justify-around gap-1">
                    {/* <li><img src={detailsData.logo} alt="" srcset="" /></li> */}
                    <li>Name: <span className="font-semibold">{detailsData.name}</span></li>
                    <li>Country: <span className="font-semibold">{detailsData.country}</span></li>
                    <li>Ticker: <span className="font-semibold">{detailsData.ticker}</span></li>
                    <li>Exchange: <span className="font-semibold">{detailsData.exchange}</span></li>
                    <li>Industry: <span className="font-semibold">{detailsData.industry}</span></li>
                    <li>IPO: <span className="font-semibold">{detailsData.ipo}</span></li>
                    <li>Market Cap: <span className="font-semibold">{detailsData.marketCapitalization}</span></li>
                    <li>Shares Outstanding: <span className="font-semibold">{detailsData.shareOutstanding}</span></li>
                    <li>URL: <span className="font-semibold">{detailsData.weburl}</span></li>
                </ul>
            </div>}
        </>
     );
}
 
export default StockData;