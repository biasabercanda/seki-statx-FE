import { useState } from 'react'
import {Item,tabelData} from './components.jsx'

function KeuanganPemerintahPage() {
  const [count, setCount] = useState(0)
  const keuanganPemerintah = tabelData.filter(item=>item.category=='keuangan pemerintah')


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
