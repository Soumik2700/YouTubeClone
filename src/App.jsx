import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [hasChannelCreated, setHasChannelCreated] = useState(false);
  console.log("channel created", hasChannelCreated);
  // console.log(searchQuery);
  // console.log(isLogin);

  useEffect(() => {
    localStorage.getItem("user") ? setIsLogin(true) : setIsLogin(false);
  }, [])

  const contexts = { isOpen, setIsOpen, searchQuery, isLogin, setIsLogin, hasChannelCreated, setHasChannelCreated }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header setSearchQuery={setSearchQuery} isLogin={isLogin} />
      <div className="min-h-screen flex flex-1 transition-all duration-300">
        {/* Sidebar takes space instead of being fixed */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Home adjusts based on sidebar state */}
        <div onClick={() => window.innerWidth < 768 && setIsOpen(false)} className={`${isOpen ? "w-[calc(100%-15rem)]" : "w-full"} transition-all duration-300`}>
          <Outlet context={contexts} />
        </div>
      </div>
    </div>
  )
}

export default App;

