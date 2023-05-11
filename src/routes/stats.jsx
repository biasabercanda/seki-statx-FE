import { useContext } from 'react';
import { useParams,Link,useNavigate, json } from 'react-router-dom'
import { DataContext} from '../components/dataProvider';
import Layout from '../components/layout';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import HighchartsTheme from 'highcharts/themes/sunset'
import myTheme from '../components/theme';


export function StatPage() {
  const [data, setData] = useContext(DataContext);
  const [checkedItems, setCheckedItems] = useContext(CheckedItemsContext);
  

  const datok = data.data[0].map((elem,index)=>{
    return [convert(data.columns[index]),elem]
  })

  const seriesData = checkedItems.map((index) => {
    return {
      name: `Series ${index}`,
      data: data.data[index].map((elem, i) => {
        return [convert(data.columns[i]), elem];
      }),
    };
  });

  const options = {
        
    rangeSelector: {
        selected: 1
    },
    
    series: seriesData,
    
  }


function handleCheckbox(event){
  if (event.target.checked) {
    setCheckedItems(prevItems => [...prevItems, event.target.dataset.key]);
  } else {
    setCheckedItems(prevItems => prevItems.filter(item => item !== event.target.dataset.key));
  }
  console.log(checkedItems)
}

// Function to get month number from month string
function getMonthNumber(monthString) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.indexOf(monthString);
}

// Funtion to convert to unix timestamp
function convert(column) {
  var parts = column.split('-');
  var year = parseInt(parts[0]);
  var month = getMonthNumber(parts[1]);
  var dateObj = new Date(Date.UTC(year, month, 1));
  return Math.floor(dateObj.getTime());
}

//HighchartsTheme(Highcharts)
Highcharts.setOptions(myTheme)



return(
    <Layout>

<div className='flex flex-col gap-2 pt-4'>
              <div className='flex gap-4'>
                <p className='text-lg font-bold'>Chart</p>
                <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                <label htmlFor="drawer-right" className="btn btn-primary btn-sm">Pilih parameter</label>
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
              <p className='text-sm font-light'>Pilih parameter untuk membuat chart</p>
            </div>

            <button className='btn' onClick={()=>console.log(
              seriesData
            )}>tes</button>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                    
                />
            </div>
        </Layout>
    )
  }