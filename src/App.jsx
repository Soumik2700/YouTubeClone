import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="min-h-screen flex flex-1 transition-all duration-300">
        {/* Sidebar takes space instead of being fixed */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Home adjusts based on sidebar state */}
        <div className={`${isOpen ? "w-[calc(100%-15rem)]" : "w-full"} transition-all duration-300`}>
          <Outlet context={{ isOpen }} />
        </div>
      </div>
    </div>
  )
}

export default App;

