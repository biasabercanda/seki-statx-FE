import { useState } from 'react'
import {Item} from './components.jsx'

function RiilPage() {
  const [count, setCount] = useState(0)
  const uangDanBank = [
    {id:'7_1',title:'Menurut Lapangan Usaha Atas Dasar Harga Berlaku'},
    {id:'7_3',title:'Menurut Jenis Pengeluaran Atas Dasar Harga Berlaku'},
    {id:'7_5',title:'Indeks Implisit Produk Domestik Bruto'},
  ]

  

  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Riil</p>
          <div className='mt-8'>
            <p className='font-semibold'>Produk Domestik Bruto</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={uangDanBank}></Item>            
            </div>
            
          </div>

        
        </div>
    
  )
}

export default RiilPage
