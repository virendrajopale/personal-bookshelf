import React from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookSearch from './Components/Book-search';
import BookShelf from './Components/Book-Shelf';
import Navbar from './Components/Navbar';

const router=createBrowserRouter([{
  element:<Navbar/>,
  children:[
    {
     path:"/",
     element:<BookSearch/>
  },
  {
    path:'/bookshelf',
    element:<BookShelf/>
  }
]
}]
)
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
