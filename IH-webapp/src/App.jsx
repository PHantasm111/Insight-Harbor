import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);


function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
