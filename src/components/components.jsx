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

export {SideMenu,Item}