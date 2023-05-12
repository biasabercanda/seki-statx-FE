import { useState } from 'react'
import {Item,tabelData} from './components.jsx'

function EksternalPage() {
  const [count, setCount] = useState(0)
  const neraca = tabelData.filter(item=>item.category=='eksternal')

  const  pinjaman = tabelData.filter(item=>item.category=='pinjaman')

  const  indikator = tabelData.filter(item=>item.category=='indikator')

  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Eksternal</p>
          <div className='mt-8'>
            <p className='font-semibold'>Neraca Pembayaran</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={neraca}></Item>            
            </div>
            
          </div>

          <div className='mt-8'>
            <p className='font-semibold'>Pinjaman Luar Negri</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={pinjaman}></Item>            
            </div>
            
          </div>

          <div className='mt-8'>
            <p className='font-semibold'>Indikator Ekonomi dan Moneter Indonesia</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={indikator}></Item>            
            </div>
            
          </div>
        </div>
    
  )
}

export default EksternalPage
