
import RiilPage from '../components/riilPage.jsx'
import Layout from '../components/layout.jsx'
import { useParams,Link,useNavigate, json } from 'react-router-dom'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { tabelData, Sekeleton } from '../components/components.jsx'
import { ErrorPage } from '../components/errorPage.jsx'
import { DataContext } from '../components/dataProvider.jsx'

function Tabel() {
  const [data, setData] = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const {tabelId} = useParams();
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const url = "https://seki-statx-api.vercel.app/"+tabelId
    axios.get(url)
      .then(response => {
        setData(JSON.parse(response.data));
        console.log(JSON.parse(response.data))
        setLoading(false)
        setLoaded(true)
      })
      .catch(error => {
        console.error(error);
        setError(true)
        setLoading(false)
      });
  }, []);

  if(loading){
    return (
      <Layout>
        <Sekeleton/>
      </Layout>
    )
  }
  if(error){
    return (
      <Layout>
        <ErrorPage/>
      </Layout>
      
    )
  }

  function handleCheckbox(event){
    if (event.target.checked) {
      setCheckedItems(prevItems => [...prevItems, event.target.dataset.key]);
    } else {
      setCheckedItems(prevItems => prevItems.filter(item => item !== event.target.dataset.key));
    }
    console.log(checkedItems)
  }

  function handleClick(event){
    console.log(event.target.dataset.key)
  }

  return (
    <Layout>
      <div>
        {loaded && (
          <div className='space-y-8'>
            <div className='flex justify-between'> 
              <p className='text-xl font-bold basis-2/3 leading-8'>{tabelData.find(item=>item.id==tabelId).title }</p>

              <input type="checkbox" id="drawer-right" className="drawer-toggle" />

              <label htmlFor="drawer-right" className="btn btn-primary">Buat Grafik</label>
              <label className="overlay " htmlFor="drawer-right"></label>
              <div className="drawer drawer-right ">
                <div className="drawer-content pt-10 flex flex-col h-full ">
                  <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                  <div>
                    <h2 className="text-xl font-medium">Pilih parameter</h2>
                    <div className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                      {data.index.map((item,index)=>{
                      return(
                        <div>
                          <label className="flex cursor-pointer gap-2 ">
                            <input onClick={handleCheckbox} data-key={index} type="checkbox" className="checkbox" />
                            <span className='text-xs'>{item}</span>
                          </label>
                        </div>
                      )
                      
                    })}
                      
                      
                    </div>
                    
                  </div>
                  <div className="h-full flex flex-row justify-end items-end gap-2">
                    <Link className='btn btn-primary ' to={'/stats/'}>Buat grafik</Link>
                    
                  </div>
                </div>
              </div>
              
            </div>
            
            <div class="flex w-full overflow-x-auto max-h-[70vh] overflow-y-auto">
              <table class="table  table-zebra table-compact">
                <thead className='sticky top-0 z-20'>
                  <tr className=''>
                    <th className='sticky left-0 ' rowSpan={2}>Keterangan</th>
                    {data && data.columns && (
                      <>
                        {Array.from(Array(Math.ceil(data.columns.length / 12)).keys()).map((index) => {
                          const year = 2010 + index;
                          return (
                            <th className='border left-[320px] sticky' key={year} colSpan={12}>{year}</th>
                          )
                        })}
                      </>
                    )}
                  </tr>
                  <tr className='rounded-none'>
                    {data && data.columns && (
                      <>
                        {data.columns.map((column) => {
                          const [, month] = column.split('-');
                          return (
                            <th className='rounded-none'>{month}</th>
                          )
                        })}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className=''>
                  {data.index.map((item,index)=>{
                    return(
                      <tr key={index}>
                        <th title={item} className='sticky left-0 bg-gray-100 max-w-xs whitespace-nowrap overflow-ellipsis overflow-hidden'>{item}</th>
                        {data.data[index].map((data, dataIndex)=>{
                          return(<td>{data}</td>)
                          
                        })}
                      </tr>
                    )
                    
                  })}
                  
                </tbody>
              </table>
            </div>

            
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Tabel

