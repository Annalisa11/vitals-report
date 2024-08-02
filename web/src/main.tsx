import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './providers/ThemeContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import CreateAccountPage from './pages/CreateAccountPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

// https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <App />,
  },
  {
    path: '/create-account',
    element: <CreateAccountPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
