import { useNavigate } from 'react-router-dom';


export function ErrorPage(){
    
    const navigate = useNavigate();

    return(
        <div className=' space-y-4 text-center'>
          <h1 className='text-4xl font-bold'>Oops !</h1>
          <p className='text-xs'>Terjadi kesalahan saat memuat halaman</p>
          <button className='btn btn-sm' onClick={()=>navigate(-1)} >Kembali</button>
        </div>
    )
}