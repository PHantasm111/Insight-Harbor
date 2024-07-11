import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import './styles/home.scss'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/register",
        element:<Register/>
      },

    ]
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}



export default App
