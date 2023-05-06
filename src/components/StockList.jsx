import { useEffect, useState } from "react"
import finnhub from "../apis/finnhub"
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { WatchListContext } from "../context/WatchlistContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillBarChartFill, BsTrashFill } from 'react-icons/bs'


export const StockList = () => {
    const [stocks, setStocks] = useState([])
    const {watchList, setWatchList, deleteStock} = useContext(WatchListContext)
    const navigate = useNavigate()

    const renderIcon = (change) => {
        return change > 0 ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;
    }

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }
    
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchList.map((stock) => {
                        return finnhub.get("/quote", {
                            params: {
                                symbol: stock
                            }
                        })
                    })
                )
             
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })

                    // const responseP2 = await finnhub.get('/stock/profile2', {
                    //     params: {
                    //         symbol:symbol
                    //     }  
                    // })

                // Ask if response is mounted
                if(isMounted) {
                    setStocks(data)
                }

            } catch (err) {
                console.log(err)
            }
        }

        //Fetch Data
        fetchData()

        return () => (isMounted = false)
    }, [watchList]);

    return (
        <div>

            <div className="grid grid-cols-3 justify-between gap-5 my-2">
                {
                    stocks.map((stock) => {
                        return (
                            <section className="h-40 border rounded-sm flex" key={stock.symbol}>
                            <div className="bg-gray-100 w-1/4 flex items-center justify-center text-sm text-center">
                                {/* <img src={} /> */}
                                <span>{stock.symbol}</span>
                            </div>
                            <div className="bg-gray-200 w-9/12 py-2 px-4 flex flex-col justify-between">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handleStockSelect(stock.symbol)}><BsFillBarChartFill color="gray" size={18} /></button>
                                    <button onClick={() => deleteStock(stock.symbol)}><BsTrashFill color="gray" size={18} /></button>
                                </div>
                                <div className=" pb-1 border-b border-gray-400">
                                    <ul>
                                        <li>High: {stock.data.h}</li>
                                        <li>Low: {stock.data.l}</li>
                                        <li>Change: {stock.data.dp}</li>
                                    </ul>
                                </div>
                                <div className="flex justify-between items-center font-semibold">
                                    <span className="text-xl">Price: </span>
                                    <span className="text-2xl">{stock.data.c}</span>
                                </div>
                            </div>
                        </section>
                        )
                    })
                }
                    </div>
        </div>
    ) 
}