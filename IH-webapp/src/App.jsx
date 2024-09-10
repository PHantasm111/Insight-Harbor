import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Questions from "./pages/Questions";
import Tools from "./pages/Tools";
import History from "./pages/History";
import FinalRes from "./pages/FinalRes";


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
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/questions",
        element:<Questions/>
      },
      {
        path:"/tools",
        element:<Tools/>
      },
      {
        path:"/history",
        element:<History />
      },
      {
        path:"/finalres",
        element:<FinalRes />
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
