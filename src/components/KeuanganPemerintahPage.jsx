import { useState } from 'react'
import {Item,tabelData} from './components.jsx'

function KeuanganPemerintahPage() {
  const [count, setCount] = useState(0)
  const keuanganPemerintah = [
    {id:'4_1',title:'Pendapatan Pemerintah'},
    {id:'4_3',title:'Belanja Pemerintah'},
    {id:'4_4',title:'Pembiayaan Pemerintah'},
    {id:'4_4',title:'Posisi Surat Berharga Negara (SBN)'},
  ]


  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Keuangan Pemerintah</p>
          <div className='mt-8'>
            <p className='font-semibold'>Kuangan Pemerintah</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={keuanganPemerintah}></Item>            
            </div>
            
          </div>

          
        </div>
    
  )
}

export default KeuanganPemerintahPage
