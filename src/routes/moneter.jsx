import { useState } from 'react'
import {Item} from '../components/components.jsx'
import Layout from '../components/layout.jsx'
import MoneterPage from '../components/moneterPage.jsx'

function Moneter() {
  const [count, setCount] = useState(0)
  const uangDanBank = [
    {id:'1_1',title:'Uang Beredar dan Faktor-Faktor yang Mempengaruhinya'},
    {id:'1_3',title:'Neraca Analitis Bank Umum dan BPR'},
    {id:'1_26',title:'Suku Bunga Pinjaman Rupiah yang Diberikan Menurut Kelompok Bank dan Jenis Pinjaman'},
    {id:'1_27',title:'Suku Bunga Pinjaman yang Diberikan Us Dollar Menurut Kelompok Bank dan Jenis Pinjaman'},
    {id:'1_30',title:'Suku Bunga Tabungan Rupiah Menurut Kelompok Bank'}
  ]

  const  nonBank = [
    {id:'2_1',title:'Neraca Perusahaan Pembiayaan'},
  ]

  return (
    <Layout>
      <MoneterPage />
    </Layout>
    
  )
}

export default Moneter
