import React,{useContext,useState, createContext} from "react";
import { NavLink,Link, useResolvedPath} from "react-router-dom";
import githubImage from "../assets/github.png"
import sekiLogo from "../assets/SEKI-Logo.png"

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
    <nav className="menu light: bg-gray-100 dark:bg-[#1c1c1c] p-4 rounded-md min-h-screen sticky top-0">
      <div className="flex items-center gap-x-1">
          <img src={sekiLogo} alt="" className="max-h-[48px]"/>
          <section className="menu-section flex flex-col gap-y-0">
            <span className="font-black text-2xl">SEKI</span>
            <span className="text-xs">Statistics Explorer</span>
          </section>
      </div>
      
      <div className="divider my-0"></div>
      <section className="menu-section">
      <span className="menu-title font-semibold">Sektor</span>
        <ul className="menu-items">
          <li >
          <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/moneter">
          <div className="grid bg-pink-6 w-6 h-6 rounded-lg content-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-pink-11 opacity-50">
              <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
              <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
              <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
            </svg>
          </div>
          Moneter</NavLink>
          </li>
          

          <li>
            <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/riil">
              <div className="grid bg-purple-6 w-6 h-6 rounded-lg content-center justify-center">
            
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-purple-11 opacity-50">
                  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                </svg>

              </div>
              Riil</NavLink>
          </li>

          <li>
            <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/eksternal">
              <div className="grid bg-green-6 w-6 h-6 rounded-lg content-center justify-center">
              
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-green-11 opacity-50">
                  <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z" clipRule="evenodd" />
                  <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                </svg>


              </div>
              Eksternal</NavLink>
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
  {id:'TABEL4_4',title:'Posisi Surat Berharga Negara (SBN)',category:'keuangan pemerintah'},
  {id:'TABEL7_1',title:'Menurut Lapangan Usaha Atas Dasar Harga Berlaku',category:'riil'},
  {id:'TABEL7_3',title:'Menurut Jenis Pengeluaran Atas Dasar Harga Berlaku',category:'riil'},
  {id:'TABEL7_5',title:'Indeks Implisit Produk Domestik Bruto',category:'riil'},
  {id:'TABEL5_9',title:'Posisi Cadangan Devisa',category:'eksternal'},
  {id:'TABEL5_11',title:'Nilai Ekspor Menurut Negara Tujuan',category:'eksternal'},
  {id:'TABEL5_15',title:'Nilai Ekspor Nonmigas Menurut Negara Tujuan',category:'eksternal'},
  {id:'TABEL5_17',title:'Nilai Ekspor Migas Menurut Negara Tujuan',category:'eksternal'},
  {id:'TABEL5_20',title:'Nilai Impor Menurut Negara Asal',category:'eksternal'},
  {id:'TABEL5_24',title:'Nilai Impor Nonmigas Menurut Negara Asal',category:'eksternal'},
  {id:'TABEL5_26',title:'	Nilai Impor Migas Menurut Negara Asal',category:'eksternal'},
  {id:'TABEL5_28',title:'Jumlah Pelawat Mancanegara Menurut Pintu Masuk',category:'eksternal'},
  {id:'TABEL5_29',title:'Jumlah Pelawat Nasional Menurut Pintu Keluar',category:'eksternal'},
  {id:'TABEL5_30',title:'Jumlah Tenaga Kerja Indonesia (TKI ) Menurut Negara Penempatan',category:'eksternal'},
  {id:'TABEL5_33',title:'Investasi Langsung di Indonesia Menurut Negara Asal',category:'eksternal'},
  {id:'TABEL6_1',title:'Posisi Pinjaman Luar Negeri',category:'pinjaman'},
  {id:'TABEL6_2',title:'Posisi Pinjaman Luar Negeri Pemerintah dan Bank Indonesia Menurut Mata Uang Utama',category:'pinjaman'},
  {id:'TABEL6_5',title:'Posisi Pinjaman Luar Negeri Swasta (Bukan Bank) Menurut Sektor Ekonomi',category:'pinjaman'},
  {id:'TABEL9_1',title:'Produk Domestik Bruto Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_2',title:'Laju Inflasi Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_3',title:'Transaksi Berjalan Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_4',title:'Ekspor dan Impor Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_5',title:'Cadangan Devisa Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_6',title:'Nilai Tukar Dolar Amerika Serikat Terhadap Beberapa Mata Uang Utama Lainnya dan SDRs',category:'indikator'},
  {id:'TABEL9_7',title:'Suku Bunga Internasional',category:'indikator'},
  {id:'TABEL9_8',title:'Suku Bunga Kebijakan Bank Sentral Beberapa Negara/Kawasan',category:'indikator'},
  {id:'TABEL9_9',title:'Indeks Harga Beberapa Komoditas Penting di Pasar Dunia',category:'indikator'},
]

export function Sekeleton(){
  return(
    <div className='space-y-8'>
          <div class="skeleton w-128 h-8 rounded-md"></div>
          <table class="table w-full">
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

export function Navbar(){
  return(
    <div className="navbar navbar-glass navbar-bordered sticky top-0 z-50">
      <div className="navbar-start">
        <input type="checkbox" id="drawer-left" class="drawer-toggle md:hidden" />

        <label for="drawer-left" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </label>
        <label class="overlay" for="drawer-left"></label>
        <div class="drawer md:hidden">
          <div class="drawer-content pt-10 flex flex-col h-full">
            <label for="drawer-left" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div>
              <div className="flex items-center gap-x-1">
                  <img src={sekiLogo} alt="" className="max-h-[48px]"/>
                  <section className="menu-section flex flex-col gap-y-0">
                    <span className="font-black text-2xl">SEKI</span>
                    <span className="text-xs">Statistics Explorer</span>
                  </section>
              </div>
              
              <div className="divider my-0"></div>
              <section className="menu-section">
              <span className="menu-title font-semibold">Sektor</span>
                <ul className="menu-items">
                  <li >
                  <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/moneter">
                  <div className="grid bg-pink-6 w-6 h-6 rounded-lg content-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-pink-11 opacity-50">
                      <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                      <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                      <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                    </svg>
                  </div>
                  Moneter</NavLink>
                  </li>
                  

                  <li>
                    <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/riil">
                      <div className="grid bg-purple-6 w-6 h-6 rounded-lg content-center justify-center">
                    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-purple-11 opacity-50">
                          <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                        </svg>

                      </div>
                      Riil</NavLink>
                  </li>

                  <li>
                    <NavLink  className={({ isActive }) => isActive ? 'menu-item menu-active' : 'menu-item'} to="/eksternal">
                      <div className="grid bg-green-6 w-6 h-6 rounded-lg content-center justify-center">
                      
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-green-11 opacity-50">
                          <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z" clipRule="evenodd" />
                          <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                        </svg>


                      </div>
                      Eksternal</NavLink>
                  </li>
                  
                  
                </ul>
              </section>
            </div>
            <div class="h-full flex flex-row justify-end items-end gap-2">
              <button class="btn btn-ghost">Cancel</button>
              <button class="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        
        <a className="navbar-item text-sm" href="https://www.bi.go.id/id/statistik/ekonomi-keuangan/seki/Default.aspx" target="_blank">SEKI Bank Indonesia</a>
        <a className="navbar-item text-sm" href="https://www.bi.go.id/id/statistik/Metadata/SEKI/default.aspx" target="_blank">Metadata</a>
        <div className="divider divider-vertical h-8"></div>
        <a href="https://github.com/biasabercanda/seki-statx-FE" target="_blank">
         <img className="max-w-[20px] text-black" href="google.com" src={githubImage} alt="" />
        </a> 
      </div>
    </div>
  )
}

export {SideMenu,Item}