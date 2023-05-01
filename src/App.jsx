import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StockOverViewPage } from './pages/StockOverviewPage'
import { StockDetailPage } from './pages/StockDetailPage'
import { WatchListContextProvider } from './context/WatchlistContext'

function App() {

  return (
    <>
      <div className="App">
        <WatchListContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<StockOverViewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </Router>
        </WatchListContextProvider>
      </div>
    </>
    
  )
}

export default App
