import { useState } from 'react'
import {Item} from './components.jsx'

function EksternalPage() {
  const [count, setCount] = useState(0)
  const uangDanBank = [
    {id:'1_1',title:'Uang Beredar dan Faktor-Faktor yang Mempengaruhinya'},
  ]

  const  nonBank = [
    {id:'2_1',title:'Neraca Perusahaan Pembiayaan'},
  ]

  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Eksternal</p>
          <div className='mt-8'>
            <p className='font-semibold'>Neraca Pembayaran</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={uangDanBank}></Item>            
            </div>
            
          </div>

          <div className='mt-8'>
            <p className='font-semibold'>Pinjaman Luar Negri</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={nonBank}></Item>            
            </div>
            
          </div>

          <div className='mt-8'>
            <p className='font-semibold'>Indikator Ekonomi dan Moneter Indonesia</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={nonBank}></Item>            
            </div>
            
          </div>
        </div>
    
  )
}

export default EksternalPage
