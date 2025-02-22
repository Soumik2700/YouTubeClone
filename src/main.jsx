import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import VideoDetails from './components/VideoDetails.jsx'
import SignIn from './components/SignIn.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChannelDetails from './components/ChannelDetails.jsx'
import CreateChannel from './components/CreateChannel.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/videoDetails/:id',
        element: <VideoDetails />
      },
      {
        path:"/signIn",
        element:<SignIn/>
      },
      {
        path:"/viewChannel",
        element:<ChannelDetails/>
      },
      {
        path:"/createChannel",
        element:<CreateChannel/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRouter} />
)
