import { useEffect, useState, useContext } from "react"
import finnhub from "../apis/finnhub"
import { WatchListContext } from "../context/WatchlistContext"

export const SearchPage = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const { addStock, deleteStock } = useContext(WatchListContext)

    const renderDropdown = () => {
        const dropdown = search ? 'block' : 'hidden'
        return(
            <ul className={`absolute bg-white px-1 h-96 overflow-x-hidden overflow-y-scroll cursor-pointer ${dropdown}`}>
                {
                    results.map((result) => {
                        return (
                            <li key={result.symbol} onClick={() => {addStock(result.symbol); setSearch("")}}>
                                {result.description} ({result.symbol})
                            </li>
                        )
                    })
                }
            </ul>
        )
    }   

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnhub.get('/search', {
                    params: {
                        q: search
                    }
                }) 

                if(isMounted) {
                    setResults(response.data.result)
                }

            } catch (error) {
                console.log(error)
            }
        }

        if(search.length > 0){
            fetchData()
        } else {
            setResults([])
        }
        
        return () => (isMounted = false)
    }, [search])

    return (
        <div>
            <div className=" mx-auto">
                <input type="text" id="searchInput" placeholder="Search" autoComplete="off" onChange={(e) => {setSearch(e.target.value)}} />
                {renderDropdown()}
                
            </div>
            
        </div>
    )
}