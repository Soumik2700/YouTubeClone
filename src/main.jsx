import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import VideoDetails from './components/VideoDetails.jsx'
import SignIn from './components/SignIn.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChannelDetails from './components/ChannelDetails.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import ErrorElement from './components/ErrorElement.jsx'
import CreateVideo from './components/CreateVideo.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'

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
        path:"/:user",
        element: <ProtectedRoutes />,
        children:[
          {
            path:"channelDetails",
            element:<ChannelDetails/>
          },
          {
            path: "createChannel",
            element: <CreateChannel />
          },
          {
            path:"createVideo",
            element:<CreateVideo/>
          }
        ]
      },
      {
        path:"/loading",
        element: <LoadingSpinner/>
      }
    ],
    errorElement:<ErrorElement/>
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRouter} />
)
