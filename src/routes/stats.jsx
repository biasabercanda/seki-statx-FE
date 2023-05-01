import { useContext } from 'react';
import { DataContext } from '../components/dataProvider';
import Layout from '../components/layout';

export function StatPage() {
    const [data, setData] = useContext(DataContext);
  
    return(
        <Layout>
            <button className='btn' onClick={()=>console.log(data)}>tes</button>
        </Layout>
    )
  }