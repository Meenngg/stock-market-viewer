import { SearchPage } from "../components/SearchPage"
import { StockList } from "../components/StockList"

export const StockOverViewPage = () => {
    return (
        <>
            <h1>StockOverview with Graph</h1>
            <SearchPage />
            <StockList />
        </>
    )
}