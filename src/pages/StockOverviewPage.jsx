import { SearchPage } from "../components/SearchPage"
import { StockList } from "../components/StockList"
import { BsFillBarChartFill, BsTrashFill } from 'react-icons/bs'

export const StockOverViewPage = () => {
    return (
        <>
            <div className="flex justify-between px-5 py-2 border-b"> {/*This is for Header/Navigation bar */}
                <div>Stock Market Viewer</div>
                <div>Github</div>
            </div>
            <div className="my-5 mx-20">
                <div>
                    <SearchPage />
                    
                    <StockList />   
                </div> 
            </div>
            
        </>
    )
}