import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,Navigate} from "react-router-dom"
import Moneter from './routes/moneter'
import KeuanganPemerintah from './routes/keuangan-pemerintah'
import Riil from './routes/riil'
import Eksternal from './routes/eksternal'
import Tabel from './routes/tabel'
import { getData } from './loader'
import { StatPage } from './routes/stats'
import { DataProvider } from './components/dataProvider'
import { ErrorPage } from './components/errorPage'

function loader(tabel){
  console.log(tabel)
  
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate to="/moneter" />
      ),
  },
  {
    path: "moneter",
    element: <Moneter />,
  },
  {
    path: "riil",
    element: <Riil />,
  },
  {
    path: "eksternal",
    element: <Eksternal />,
  },
  {
    path: "tabel/:tabelId",
    
    element: <Tabel/>
  },
  {
    path:"*",
    element: <ErrorPage/>
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider Classname="ripple-light-theme" router={router}>
      
      </RouterProvider>
    </DataProvider>
    
  </React.StrictMode>,
)
