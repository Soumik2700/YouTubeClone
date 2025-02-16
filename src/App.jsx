import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='flex flex-col h-screen'>
      <Header/>
      <div className="flex flex-1">
        <Sidebar />
      </div>

    </div>
  )
}

export default App
