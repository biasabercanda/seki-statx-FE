import RiilPage from '../components/riilPage.jsx'
import Layout from '../components/layout.jsx'
import { useParams,Link,useNavigate, json } from 'react-router-dom'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { tabelData, Sekeleton } from '../components/components.jsx'
import { ErrorPage } from '../components/errorPage.jsx'
import { DataContext} from '../components/dataProvider.jsx'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import myTheme from '../components/theme';
import { calculateStatistics } from '../components/statFunction.js'

function Tabel() {
  const [data, setData] = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] =  useState(12)
  const [chartType, setChartType] = useState([])
  const [activeTab, setActiveTab] = useState('tab-6');

  const {tabelId} = useParams();
  const navigate = useNavigate();

  //chart
  const [checkedItems, setCheckedItems] = useState([]);
  
  const [forecastItems,setForecaastItems] = useState([])
  const [corelattionItems,setCorrelationItems] = useState([])

  //basic statistic
  const [statTitle,setStatTilte] = useState('[Pilih Parameter Lebih Dulu]')
  const [statItems,setStatItems] = useState({
    mean: '',
    median: '',
    mode: '',
    range: '',
    variance: '',
    standardDeviation: '',
    maxValue: '',
    minValue: '',
  });
  const [statCheck, setStatCheck] = useState()

  useEffect(() => {
    const url = "https://seki-statx-api.vercel.app/"+tabelId
    axios.get(url)
      .then(response => {
        let parsedData = JSON.parse(response.data)
        setData(parsedData);
        console.log(parsedData)

        if (parsedData.columns[0].includes("Jan")) {
          setType(12);
        } else {
          setType(4);
        }  

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
      setChartType(prevChartType => [...prevChartType, 'line']);
    } else {
      if(checkedItems.length==1){
        setCheckedItems([])
      }else{
        setCheckedItems(prevItems => prevItems.filter(item => item !== event.target.dataset.key));
      }
    }
    
  }
  

  //basicstat
  function handleStatItems(event){
    setStatCheck(event.target.dataset.key)
    
  }

  function handleStatCheck(){
    const stat = calculateStatistics(data.data[statCheck])
    setStatItems(stat)
    setStatTilte(data.index[statCheck])
  }

  function handleClick(event){
    console.log(event.target.dataset.key)
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

  function getQuarterTimestamp(quarterString) {
    var year = quarterString.split('-')[0];
    var quarter = quarterString.split('-')[1].slice(1);
    var month = (parseInt(quarter) - 1) * 3 + 1;
    return new Date(year, month - 1, 1).getTime();
  }
  

  function timestamp(column){
    let data
    if(column.includes('-Q')){
      data = getQuarterTimestamp(column)
    }
    else{
      data = convert(column)
    }

    return data
  }

  const seriesData = checkedItems.map((key,num) => {
    
    return {
      type: chartType[num],
      name: `${data.index[key]}`,
      data: data.data[key].map((elem, i) => {
        return [timestamp(data.columns[i]), elem];
      }),
    };
  });
  

  const options = {
    chart:{
        height: 600
    },
        
    rangeSelector: {
        selected: 5,
        buttons: [ {
          type: 'month',
          count: 6,
          text: '6m',
          title: 'View 6 months'
      }, {
          type: 'year',
          count: 1,
          text: '1y',
          title: 'View 1 year'
      }, {
          type: 'year',
          count: 2,
          text: '2y',
          title: 'View 2 year'
      },{
        type: 'year',
        count: 5,
        text: '5y',
        title: 'View 5 year'
    },{
      type: 'year',
      count: 10,
      text: '10y',
      title: 'View 10 year'
    }, {
            type: 'all',
            text: 'All',
            title: 'View all'
        }]
      },
      
      series: seriesData,

      legend: {
        enabled:true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        borderWidth: 0,
        itemStyle: {
          fontSize: '10px'
        },
        itemMarginBottom: 5,
        useHTML: true,
        labelFormatter: function () {
          return '<span style="width: 100px; display: inline-block">' + this.name + '</span>';
        }
      }
    
    
  }

  function changeChart(index,type){
    console.log('changing')
    const newChartType = [...chartType]
    newChartType[index]=type
    console.log(newChartType)
    console.log(index)
    setChartType(newChartType)
  }

  //HighchartsTheme(Highcharts)
  Highcharts.setOptions(myTheme)

  return (
    <Layout>
      <div>
        {loaded && (
          <div className='space-y-8'>
            <div className='flex justify-between'> 
              <p className='text-xl font-bold basis-2/3 leading-8'>{tabelData.find(item=>item.id==tabelId).title }</p>

              
              
            </div>
            
            <div class="flex w-full overflow-x-auto max-h-[70vh] overflow-y-auto">
              <table class="table  table-zebra table-compact">
                <thead className='sticky top-0 z-10'>
                  <tr className=''>
                    <th className='sticky left-0 z-20 min-w-[320px]' rowSpan={2}>Keterangan</th>
                    {data && data.columns && (
                      <>
                        {Array.from(Array(Math.ceil(data.columns.length / type)).keys()).map((index) => {
                          const year = 2010 + index;
                          return (
                            <th className='border z-0 left-[320px] sticky' key={year} colSpan={type}>{year}</th>
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
                <tbody className='z-1'>
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

            <div className='flex flex-col gap-y-2'>
              <div className='text-lg font-bold mt-4 mb-1'>Tools</div>
              <div className='card min-w-full p-2'>
                <div className="tabs tabs-underline">
                  <input type="radio" id="tab-6" name="tab-3" className="tab-toggle" defaultChecked onChange={()=>setActiveTab('tab-6')}/>
                  <label htmlFor="tab-6" className="tab px-6">Chart</label>

                  <input type="radio" id="tab-7" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-7')}/>
                  <label htmlFor="tab-7" className="tab px-6">Basic Statistic</label>

                  <input type="radio" id="tab-8" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-8')}/>
                  <label htmlFor="tab-8" className="tab px-6">Forecasting</label>

                  <input type="radio" id="tab-9" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-9')}/>
                  <label htmlFor="tab-9" className="tab px-6">Correlation Between Variable</label>
                </div>

                <div className='px-4 pb-4'>
                  {activeTab=='tab-6' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-4 items-center'>
                          <p className='text-md font-bold'>Chart</p>
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
                              <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" >Tutup</label> 
                              </div>
                            </div>
                          </div>

                        </div>
                        <p className='text-sm font-light'>Pilih parameter untuk membuat chart</p>
                      </div>
                      <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'stockChart'}
                            options={options}
                            
                        />
                      </div>

                      <div className='mt-2 flex flex-col gap-y-2'>
                        <div className='font-bold text-md'>Select chart type</div>
                        {checkedItems.map((elem,index)=>(
                          <div className='flex gap-x-4 items-center'>
                            <div className='text-xs'>{data.index[elem]}</div>
                            <div className="btn-group btn-group-scrollable">
                              <input type="radio" defaultChecked name={"options"+index} data-content="Line" className="btn btn-sm" onClick={()=>{changeChart(index,'line')}}/>
                              <input type="radio" name={"options"+index} data-content="Column" className="btn btn-sm" onClick={()=>{changeChart(index,'column')}}/>
                              <input type="radio" name={"options"+index} data-content="Area" className="btn btn-sm" onClick={()=>{changeChart(index,'area')}}/>
                              
                            </div>
                          </div>
                          
                        ))

                        }
                      </div>
                    </div>

                  }

                  {activeTab=='tab-7' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-4 items-center'>
                          <p className='text-md font-bold'>Basic Statistic</p>
                          <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                          <label htmlFor="drawer-right" className="btn btn-primary btn-sm">Pilih parameter</label>
                          <label className="overlay " htmlFor="drawer-right"></label>
                          <div className="drawer drawer-right ">
                            <div className="drawer-content pt-10 flex flex-col h-full ">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                              <div>
                                <h2 className="text-xl font-medium">Pilih parameter</h2>
                                <div id='group1' className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                                  {data.index.map((item,index)=>{
                                  return(
                                    <div>
                                      <label className="flex cursor-pointer gap-2 ">
                                        <input onClick={handleStatItems} data-key={index} type="radio" class="radio" name="group1" />
                                        
                                        <span className='text-xs'>{item}</span>
                                      </label>
                                    </div>
                                  )
                                })}   
                                </div>
                              </div>
                              <div className="h-full flex flex-row justify-end items-end gap-2">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" onClick={handleStatCheck}>Pilih</label>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className='text-sm font-light'>Melihat statistik dari dari<span className='mx-2 text-sky-500'>{statTitle}</span></p>
                        <div className='grid grid-cols-2 mt-4 gap-y-2'>
                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Mean </p>
                            <input className="input" value={statItems.mean} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Median </p>
                            <input className="input " value={statItems.median} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Range </p>
                            <input className="input " value={statItems.range} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Variance </p>
                            <input className="input " value={statItems.variance} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Max value </p>
                            <input className="input " value={statItems.maxValue} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm min-w-[20%]'>Min value </p>
                            <input className="input " value={statItems.minValue} disabled />
                          </div>

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm max-w-[20%]'>Standard Deviation </p>
                            <input className="input " value={statItems.standardDeviation} disabled />
                          </div>
                        </div>
                      </div> 
                    </div>
                  }

                  {activeTab=='tab-8' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-4 items-center'>
                          <p className='text-md font-bold'>Prediksi menggunakan regresi linear</p>
                          <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                          <label htmlFor="drawer-right" className="btn btn-primary btn-sm">Pilih parameter</label>
                          <label className="overlay " htmlFor="drawer-right"></label>
                          <div className="drawer drawer-right ">
                            <div className="drawer-content pt-10 flex flex-col h-full ">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                              <div>
                                <h2 className="text-xl font-medium">Pilih parameter</h2>
                                <div id='group1' className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                                  {data.index.map((item,index)=>{
                                  return(
                                    <div>
                                      <label className="flex cursor-pointer gap-2 ">
                                        <input data-key={index} type="radio" class="radio" name="group1" />
                                        
                                        <span className='text-xs'>{item}</span>
                                      </label>
                                    </div>
                                  )
                                })}   
                                </div>
                              </div>
                              <div className="h-full flex flex-row justify-end items-end gap-2">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" >Pilih</label>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div> 
                    </div>
                  }

                  {activeTab=='tab-8' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-4 items-center'>
                          <p className='text-md font-bold'>Prediksi menggunakan regresi linear</p>
                          <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                          <label htmlFor="drawer-right" className="btn btn-primary btn-sm">Pilih parameter</label>
                          <label className="overlay " htmlFor="drawer-right"></label>
                          <div className="drawer drawer-right ">
                            <div className="drawer-content pt-10 flex flex-col h-full ">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                              <div>
                                <h2 className="text-xl font-medium">Pilih parameter</h2>
                                <div id='group1' className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                                  {data.index.map((item,index)=>{
                                  return(
                                    <div>
                                      <label className="flex cursor-pointer gap-2 ">
                                        <input data-key={index} type="radio" class="radio" name="group1" />
                                        
                                        <span className='text-xs'>{item}</span>
                                      </label>
                                    </div>
                                  )
                                })}   
                                </div>
                              </div>
                              <div className="h-full flex flex-row justify-end items-end gap-2">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" >Pilih</label>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div> 
                    </div>
                  }
                </div>

                

              </div>
            </div>
            <button className='btn' onClick={()=>{console.log(calculateStatistics(data.data[0]))}}>tes </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Tabel

