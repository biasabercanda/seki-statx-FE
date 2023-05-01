import { useState } from 'react'
import {Item,tabelData} from './components.jsx'

function MoneterPage() {
  const [count, setCount] = useState(0)
  const uangDanBank = tabelData.filter(item=>item.category=='uang dan bank')

  const  nonBank = tabelData.filter(item=>item.category=='non bank')

  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Moneter</p>
          <div className='mt-8'>
            <p className='font-semibold'>Uang dan Bank</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={uangDanBank}></Item>            
            </div>
            
          </div>

          <div className='mt-8'>
            <p className='font-semibold'>Kegiatan Usaha Lembaga Keuangan Non Bank</p>
            <div className='py-4 flex flex-col gap-4 text-left'>
              <Item items={nonBank}></Item>            
            </div>
            
          </div>
        </div>
    
  )
}

export default MoneterPage
