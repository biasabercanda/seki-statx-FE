import RiilPage from '../components/riilPage.jsx'
import Layout from '../components/layout.jsx'
import { useParams,Link,useNavigate, json } from 'react-router-dom'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { tabelData, Sekeleton } from '../components/components.jsx'
import { ErrorPage } from '../components/errorPage.jsx'
import { DataContext} from '../components/dataProvider.jsx'
import Highcharts from 'highcharts/highstock'
import HCExporting from 'highcharts/modules/exporting';
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
  const [yearList,setYearList] = useState([])

  const {tabelId} = useParams();
  const navigate = useNavigate();

  //chart
  const [checkedItems, setCheckedItems] = useState([]);
  
  
  

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
  const [statFrom,setStatFrom] = useState(2010)
  const [statTo, setStatTo] = useState(2010)

  //corelation
  const [independetVar,setIndependentVar] = useState()
  const [independetCheck,setIndependentCheck] = useState([])
  const [dependetVar,setDependentVar] = useState()
  const [dependetCheck,setDependentCheck] = useState()
  const [yearFrom, setYearFrom] = useState(2010)
  const [yearTo, setYearTo] = useState(2010)
  const [corelationPlot, setCorelationPlot]=useState(null)
  const [corelationLoad, setCorelationLoad] = useState(true)

  //forecast
  const [forecastCheck,setForecastCheck] = useState()
  const [forecastItems,setForecaastItems] = useState([])
  const [forecastLoad, setForecastLoad] = useState(true)
  const [forecastPlot, setForecastPlot]=useState(null)

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

  HCExporting(Highcharts);

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
    const base = 2010

    const f = (statFrom-base)*type
    const t = f+type+(statTo-statFrom)*type

    const stat = calculateStatistics(data.data[statCheck].slice(f,t))

    setStatItems(stat)
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

  let yearArray = []

  //forecast function
  function handleForecastCheck(event){
    setForecastCheck(event.target.dataset.key)
  }

  function handleForecastVar(){
    setForecaastItems(forecastCheck)
    setForecastLoad(false)
    axios.post('https://seki-statx-sklearn.vercel.app/forecast',{
      "data":data.data[forecastCheck]
    })
    .then(function(response){
      const resJSON = JSON.parse(response["data"])
      setForecastLoad(true)
      setForecastPlot(resJSON)
      
    })
    .catch(function(error){
      console.log(error)
    })
  }

  const forecastData = forecastPlot? forecastPlot.x.map((elem,index)=>{
    return [elem,forecastPlot.y[index]]
  }) : []

  const forecastReg = forecastPlot ? forecastPlot.x.map((elem,index)=>{
    return [elem,forecastPlot.X[index]]
  }) : []

  const forecastPred = forecastPlot ? forecastPlot.future_x.map((elem,index)=>{
    return [elem[0],forecastPlot.predicted_y[index]]
  }) : []

  const forecastLine = forecastPlot ? `Regression Line:  Y = ${forecastPlot.slope.toFixed(2)} X+${forecastPlot.intercept.toFixed(2)}` : []

  const optionsForecast = {
    chart:{
      
      marginTop: 48
    },
    title:{
      text : undefined
    },
         
    series: [{
      type: 'scatter',
      name: 'Data',
      data: forecastData,
      marker: {
          radius: 4
      }
    },
    {
      type: 'line',
      name: forecastLine,
      data: forecastReg,
      lineWidth : 3
    },
    {
      type: 'scatter',
      name: 'Predicted Value',
      data: forecastPred,
      marker: {
        radius: 4
      }
    }
  ],
  legend:{
    enabled:false
  },
  exporting: {
    buttons: {
      contextButton: {
        // Customize the position of the export button
        align: 'right', // Available options: 'left', 'center', 'right'
        verticalAlign: 'top', // Available options: 'top', 'middle', 'bottom'
        x: 0, // Adjust the horizontal position
        y: 0, // Adjust the vertical position
      },
    },
  },
    
  }

  //corelation function
  function handleIndependent(event){
    if (event.target.checked) {
      setIndependentCheck(prevItems => [...prevItems, event.target.dataset.key]);
    } else {
      if(checkedItems.length==1){
        setIndependentCheck([])
      }else{
        setIndependentCheck(prevItems => prevItems.filter(item => item !== event.target.dataset.key));
      }
    }
    
  }

  function handleIndependentItems(){
    setIndependentVar(independetCheck)
  }

  function handleDependent(event){
    setDependentCheck(event.target.dataset.key)
  }

  function handleDependentItems(){
    setDependentVar(dependetCheck)
  }

  function handleYearFrom(event){
    setYearFrom(parseInt(event.target.dataset.key))
  }

  function handleYearTo(event){
    setYearTo(parseInt(event.target.dataset.key))
  }

  function handleStatFrom(event){
    setStatFrom(parseInt(event.target.dataset.key))
  }

  function handleStatTo(event){
    setStatTo(parseInt(event.target.dataset.key))
  }

  function handleHasil(){
    const body = {
      'data_type':type,
      'year_from':yearFrom,
      'year_to':yearTo,
      'data1':independetVar.map(function(index){return data.data[index]}),
      'data2':data.data[dependetVar]
    }


    setCorelationLoad(false)
    axios.post('https://seki-statx-sklearn.vercel.app/corelation',body)
    .then(function(response){
      const resJSON = JSON.parse(response["data"])
      console.log(resJSON)
      setCorelationPlot(resJSON)
      setCorelationLoad(true)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  const corelationData = corelationPlot ? corelationPlot.y.map((elem,index)=>{
    console.log(elem)
    return [elem,corelationPlot.X[index]]
  }) : []

  const regressionData = corelationPlot ? corelationPlot.X.map((elem,index)=>{
    return [elem,corelationPlot.X[index]]
  }) : []

  const regressionLine = corelationPlot ? `Regression Line:  Y = ${corelationPlot.slope.map(function(coeff,i){return coeff+"x"+(i+1)}).join("+")} X+${corelationPlot.intercept.toFixed(2)}` : []

  const optionsCorelation = {
    chart:{
      
      marginTop: 48
    },
    title:{
      text : undefined
    },
         
    series: [{
      type: 'scatter',
      name: 'Data',
      data: corelationData,
      marker: {
          radius: 4
      }
    },
    {
      type: 'line',
      name: regressionLine,
      data: regressionData,
      lineWidth : 3
    }
  ],
  legend:{
    enabled:false
  }
    
  }

  return (
    <Layout>
      <div>
        {loaded && (
          <div className='space-y-8'>
            <div className='flex justify-between'> 
              <p className='text-xl font-bold basis-2/3 leading-8'>{tabelData.find(item=>item.id==tabelId).title }</p>

              
              
            </div>
            
            <div class="flex w-full overflow-x-auto max-h-[70vh] overflow-y-auto">
              <table class="table table-zebra table-compact">
                <thead className='sticky top-0 z-10'>
                  <tr className=''>
                    <th className='md:sticky md:left-0 z-20 min-w-[320px] text-xs' rowSpan={2}>Keterangan</th>
                    {data && data.columns && (
                      <>
                        {Array.from(Array(Math.ceil(data.columns.length / type)).keys()).map((index) => {
                          const year = 2010 + index;
                          yearArray.push(year)
                          return (
                            <th className='border z-0 md:left-[320px] sticky left-0' key={year} colSpan={type}>{year}</th>
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
                        <th title={item} className='md:sticky left-0 light: bg-white dark:bg-[#161616] max-w-xs whitespace-nowrap overflow-ellipsis overflow-hidden'>{item}</th>
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
                  <label htmlFor="tab-6" className="tab px-6">Descriptive Analysis (Chart)</label>

                  <input type="radio" id="tab-7" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-7')}/>
                  <label htmlFor="tab-7" className="tab px-6">Descriptive Analysis (Basic Statistic)</label>

                  <input type="radio" id="tab-8" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-8')}/>
                  <label htmlFor="tab-8" className="tab px-6">Predictive Analysis</label>

                  <input type="radio" id="tab-9" name="tab-3" className="tab-toggle" onChange={()=>setActiveTab('tab-9')}/>
                  <label htmlFor="tab-9" className="tab px-6">Prescriptive Analysis</label>
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
                          <p className='text-md font-bold'>Descriptive Analysis</p>
                          <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                          <label htmlFor="drawer-right" className="btn btn-primary btn-sm">{statCheck ? data.index[statCheck] : 'Pilih parameter'}</label>
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
                                <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" >Pilih</label>
                                  
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <p className='text-sm'>Pilih periode :</p>
                            <select className="select select-ghost-primary select-md md:max-w-[10%]">
                              {yearArray.map((year)=>{
                                  return <option onClick={handleStatFrom} data-key={year}>{year}</option>
                                })

                                }
                            </select>
                            <p className='text-sm'>sampai</p>
                            <select className="select select-ghost-primary select-md md:max-w-[10%]" >
                              {yearArray.map((year)=>{
                                  return <option onClick={handleStatTo} data-key={year}>{year}</option>
                                })

                              }
                              
                            </select>
                            
                        </div>
                         <div>
                          <div className='btn btn-primary btn-sm' onClick={handleStatCheck}>Lihat Hasil</div>
                         </div>
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

                          <div className='flex items-center  gap-x-2'>
                            <p className='text-sm max-w-[20%]'>Coefficient of Variation </p>
                            <input className="input " value={statItems.coefVariation} disabled />
                          </div>
                        </div>
                      </div> 
                    </div>
                  }

                  {activeTab=='tab-8' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-4 items-center'>
                          <p className='text-md font-bold'>Predictive Analysis</p>
                          <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                          <label htmlFor="drawer-right" className="btn btn-primary btn-sm">{forecastCheck? data.index[forecastCheck] : 'Pilih parameter'}</label>
                          {forecastCheck? <div className='btn btn-outline-primary btn-sm'>Seasonal Decomposition </div>: <div></div>}
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
                                        <input data-key={index} onClick={handleForecastCheck} type="radio" class="radio" name="group1" />
                                        
                                        <span className='text-xs'>{item}</span>
                                      </label>
                                    </div>
                                  )
                                })}   
                                </div>
                              </div>
                              <div className="h-full flex flex-row justify-end items-end gap-2">
                              <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" onClick={handleForecastVar}>Pilih</label>
                                
                              </div>
                            </div>
                          </div>
                          {forecastLoad===false ? <div className="spinner-simple spinner-xs"></div> : <div></div> }
                          
                        </div>
                        
                      </div> 
                      <div>
                            <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsForecast}
                            modules={['exporting']}/>
                            
                          </div>

                        {forecastPlot ? <div className=' space-y-2'>
                          <div className="text-sm">RMSE : {forecastPlot.rmse}</div>
                          <div className="text-sm">Slope : {forecastPlot.slope}</div>
                          <div className="text-sm">Intercept : {forecastPlot.intercept}</div>
                  
                        </div> : <div></div> }
                    </div>
                  }

                  {activeTab=='tab-9' &&
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex flex-col gap-4 '>
                          <p className='text-md font-bold'>Prescriptive Analysis</p>
                          <div className='flex gap-x-2 items-center'>
                            <p className='text-sm'>Independet Variable :</p>

                            <input type="checkbox" id="drawer-right" className="drawer-toggle" />

                            <label htmlFor="drawer-right" className="btn btn-primary btn-sm">{independetVar ? independetVar.length + ' selected' : 'Pilih parameter'}</label>
                      
                            <label className="overlay " htmlFor="drawer-right"></label>
                            <div className="drawer drawer-right ">
                              <div className="drawer-content pt-10 flex flex-col h-full ">
                                <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                <div>
                                  <h2 className="text-xl font-medium">Pilih Variable</h2>
                                  <div id='options-1' className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                                    {data.index.map((item,index)=>{
                                    return(
                                      <div>
                                        <label className="flex cursor-pointer gap-2 ">
                                          <input data-key={index} onClick={handleIndependent} type="checkbox" class="checkbox" name="options-1" />
                                          
                                          <span className='text-xs'>{item}</span>
                                        </label>
                                      </div>
                                    )
                                  })}   
                                  </div>
                                </div>
                                <div className="h-full flex flex-row justify-end items-end gap-2">
                                <label htmlFor="drawer-right" className="btn btn-sm btn-block btn-primary" onClick={handleIndependentItems}>Pilih</label>
                                  
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='flex gap-x-2 items-center'>
                            <p className='text-sm'>Dependent Variable :</p>

                            <input type="checkbox" id="drawer-right-2" className="drawer-toggle" />

                            <label htmlFor="drawer-right-2" className="btn btn-primary btn-sm">{dependetVar ? data.index[dependetVar] : 'Pilih parameter'}</label>
                            <label className="overlay " htmlFor="drawer-right-2"></label>
                            <div className="drawer drawer-right ">
                              <div className="drawer-content pt-10 flex flex-col h-full ">
                                <label htmlFor="drawer-right-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                <div>
                                  <h2 className="text-xl font-medium">Pilih Variabel</h2>
                                  <div id='options-2' className='pt-8 flex flex-col gap-4 max-h-[80vh] overflow-hidden hover:overflow-auto'>
                                    {data.index.map((item,index)=>{
                                    return(
                                      <div>
                                        <label className="flex cursor-pointer gap-2 ">
                                          <input data-key={index} onClick={handleDependent} type="radio" class="radio" name="options-2" />
                                          
                                          <span className='text-xs'>{item}</span>
                                        </label>
                                      </div>
                                    )
                                  })}   
                                  </div>
                                </div>
                                <div className="h-full flex flex-row justify-end items-end gap-2">
                                <label htmlFor="drawer-right-2" className="btn btn-sm btn-block btn-primary" onClick={handleDependentItems}>Pilih</label>
                                  
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='flex gap-2 items-center'>
                            <p className='text-sm'>Pilih periode :</p>
                            <select className="select select-ghost-primary select-md md:max-w-[10%]">
                              {yearArray.map((year)=>{
                                  return <option onClick={handleYearFrom} data-key={year}>{year}</option>
                                })

                                }
                            </select>
                            <p className='text-sm'>sampai</p>
                            <select className="select select-ghost-primary select-md md:max-w-[10%]" >
                              {yearArray.map((year)=>{
                                  return <option onClick={handleYearTo} data-key={year}>{year}</option>
                                })

                              }
                              
                            </select>
                          </div>

                          <div className='flex gap-2 items-center'>
                            <button className='btn btn-primary' onClick={handleHasil}>Lihat Hasil</button>
                            {corelationLoad===false ? <div className="spinner-simple spinner-xs"></div> : <div></div> }
                          </div>
                          <div>
                            <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsCorelation}
                            />
                            
                          </div>
                          {corelationPlot ? <div className='space-y-2'>
                            <div className="text-sm">RMSE : {corelationPlot.rmse}</div> 
                            <div className="text-sm">Slope : {corelationPlot.slope.join(" , ")}</div> 
                            <div className="text-sm">Intercept : {corelationPlot.intercept}</div> 
                          </div> : <div></div> }
                          
                        </div>
                        
                      </div> 
                    </div>
                  }
                </div>

                

              </div>
            </div>
            <button className='btn' onClick={()=>{console.log(corelationPlot)}}>tes </button>
            
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Tabel

