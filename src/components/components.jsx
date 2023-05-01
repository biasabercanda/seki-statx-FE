import React,{useContext,useState, createContext} from "react";
import { NavLink,Link, useResolvedPath} from "react-router-dom";

export const SidebarContext = createContext();



export const SidebarProvider = ({ children }) => {
  const [active, setActive] = useState('moneter');

  return (
    <SidebarContext.Provider value={{ active, setActive }}>
      {children}
    </SidebarContext.Provider>
  );
};

function SideMenu(){
  const {active,setActive}= useContext(SidebarContext)

  const handleClick = (page)=>{
    setActive(page)
    console.log(active)
  }

  return (
    <nav className="menu bg-gray-100 p-4 rounded-md min-h-screen sticky top-0">
      <section className="menu-section gap-0">
        <span className="font-black text-2xl">SEKI</span>
        <span className="text-xs">Statistics Explorer</span>
      </section>
      <div className="divider my-0"></div>
      <section className="menu-section">
      <span className="menu-title font-semibold">Sektor</span>
        <ul className="menu-items">
          <li>
          <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/moneter">Moneter</NavLink>
          </li>
          
          <li>
            <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/keuangan-pemerintah">Keuangan dan Pemerintah</NavLink>
          </li>

          <li>
            <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/riil">Riil</NavLink>
          </li>

          <li>
            <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/eksternal">Eksternal</NavLink>
          </li>
          
          
        </ul>
      </section>
    </nav>
      
  )
}

function Item(props){
  const url = useResolvedPath("").pathname;
  const itemList = props.items.map((item)=>
    <Link className='link link-primary link-underline-hover text-xs'  to={'/tabel/'+item.id}>{item.title}</Link>
  )
  return itemList
}

export const tabelData = [
  {id:'TABEL1_1',title:'Uang Beredar dan Faktor-Faktor yang Mempengaruhinya', category:'uang dan bank'},
  {id:'TABEL1_3',title:'Neraca Analitis Bank Umum dan BPR', category:'uang dan bank'},
  {id:'TABEL1_26',title:'Suku Bunga Pinjaman Rupiah yang Diberikan Menurut Kelompok Bank dan Jenis Pinjaman', category:'uang dan bank'},
  {id:'TABEL1_27',title:'Suku Bunga Pinjaman yang Diberikan Us Dollar Menurut Kelompok Bank dan Jenis Pinjaman', category:'uang dan bank'},
  {id:'TABEL1_30',title:'Suku Bunga Tabungan Rupiah Menurut Kelompok Bank', category:'uang dan bank'},
  {id:'TABEL2_1',title:'Neraca Perusahaan Pembiayaan', category:'non bank'},
]

export function Sekeleton(){
  return(
    <div className='space-y-8'>
          <div class="skeleton w-128 h-8 rounded-md"></div>
          <table class="table w-full max-w-4xl">
            <thead>
              <tr>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <th><div class="skeleton h-5 rounded-md"></div></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
              </tr>
              <tr>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
              </tr>
              <tr>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
              </tr>
              <tr>
                <th><div class="skeleton h-5 rounded-md"></div></th>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
                <td><div class="skeleton h-5 rounded-md"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
  )
}

export {SideMenu,Item}