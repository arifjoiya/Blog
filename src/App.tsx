import React from 'react';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Blog from './Components/Blog';
import Dashboard from './Components/Dashboard';
import MainLayout from './Components/MainLayout';
import BlogView from './Components/BlogView';

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/dashboard', element: <Blog /> },
        { path: 'post/:id', element: <BlogView /> }
      ]
    }
  ])
  return (
    <div className="App" >
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </div >
  );
}

export default App;
