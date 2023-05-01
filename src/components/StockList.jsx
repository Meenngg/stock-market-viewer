import { useEffect, useState } from "react"
import finnhub from "../apis/finnhub"
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { WatchListContext } from "../context/WatchlistContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

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
        <div className="flex items-center flex-col">
            <h4>Stock List</h4>
            <table className="w-9/12">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Price</th>
                        <th>Change</th>
                        <th>Change %</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>PClose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks.map((stock) => {
                            return <tr key={stock.symbol}>
                                <th>{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={stock.data.d > 0 ? "text-green-700 flex justify-center items-center" : "text-red-700 flex justify-center items-center"}>
                                    {stock.data.d} {renderIcon(stock.data.d)}
                                </td>
                                <td className={stock.data.dp > 0 ? "text-green-700" : "text-red-700"}>
                                    {stock.data.dp} {renderIcon(stock.data.dp)}
                                </td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                                <td>
                                    <button  onClick={() => deleteStock(stock.symbol)}>Remove</button>
                                    <button className="pl-1" onClick={() => handleStockSelect(stock.symbol)}>Details</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    ) 
}