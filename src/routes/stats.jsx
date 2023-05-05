import { useContext } from 'react';
import { DataContext,CheckedItemsContext } from '../components/dataProvider';
import Layout from '../components/layout';

export function StatPage() {
    const [data, setData] = useContext(DataContext);
    const [checkedItems, setCheckedItems] = useContext(CheckedItemsContext);
  
    return(
        <Layout>
            <button className='btn' onClick={()=>console.log(checkedItems)}>tes</button>
        </Layout>
    )
  }