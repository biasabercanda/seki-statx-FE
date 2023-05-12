import { useState } from 'react'
import {Item,tabelData} from './components.jsx'

function RiilPage() {
  const [count, setCount] = useState(0)
  const riil = tabelData.filter(item=>item.category=='riil')

  

  return (
      <div className=''>
          <p className='font-bold text-4xl'>Sektor Riil</p>
          <div className='mt-8'>
            <p className='font-semibold'>Produk Domestik Bruto</p>
            <div className='py-4 flex flex-col gap-4'>
              <Item items={riil}></Item>            
            </div>
            
          </div>

        
        </div>
    
  )
}

export default RiilPage
