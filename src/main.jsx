import { createRoot } from 'react-dom/client';
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// Lazy Loading Components
const VideoDetails = lazy(() => import('./components/VideoDetails.jsx'));
const SignIn = lazy(() => import('./components/SignIn.jsx'));
const ViewChannel = lazy(() => import('./components/ViewChannel.jsx'));
const ChannelDetails = lazy(() => import('./components/ChannelDetails.jsx'));
const CreateChannel = lazy(() => import('./components/CreateChannel.jsx'));
const CreateVideo = lazy(() => import('./components/CreateVideo.jsx'));
const ErrorElement = lazy(() => import('./components/ErrorElement.jsx'));

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
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VideoDetails />
          </Suspense>
        )
      },
      {
        path: '/signIn',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SignIn />
          </Suspense>
        )
      },
      {
        path: '/viewChannel/:channelId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ViewChannel />
          </Suspense>
        )
      },
      {
        path: '/:user',
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'channelDetails',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ChannelDetails />
              </Suspense>
            )
          },
          {
            path: 'createChannel',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CreateChannel />
              </Suspense>
            )
          },
          {
            path: 'createVideo',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CreateVideo />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '/loading',
        element: <LoadingSpinner />
      }
    ],
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorElement />
      </Suspense>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
);
