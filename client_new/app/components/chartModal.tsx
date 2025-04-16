"use client"
import { Bar, Line, Pie } from "react-chartjs-2";
import { options } from "../utils";
import { data , timeSubtraction } from '../utils';
import { Chart as ChartJS ,CategoryScale,LinearScale,
    Tooltip,
    Legend,
    BarElement,
    Title,
    LineElement,
    PointElement,
    ArcElement,
 } from "chart.js";
import { useEffect, useState } from "react";
import { employee } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
 ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    BarElement,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement,
 );

    type Props = {
        employee:employee;
        employees?:employee[];
    }
const ChartModal = ({employee,employees}:Props)=>{
const [emp1 , setEmp1] = useState<employee | undefined>(employees?.[0]);
const [isDropdown,setIsDropdown] = useState<boolean>(false);
    

        useEffect(()=>{
                console.log("chart tooltip defaults   :   " , ChartJS.defaults.plugins.tooltip);
        },[]);
    
    const [type,setType] = useState<string>('chart');

    const dailyDurations: { [date: string]: number } = {};
    const dailyDurations1: { [date: string]:{num_emp1:number,num_emp2:number}} = {};
    let labels : string[] =[];
    let datas : number[] = [];
    let datas1 : number[] = [];
if(!emp1){
  employee.records.forEach(record => {
    const duration = timeSubtraction({ start: record.startTime, end: record.endTime });
    if (dailyDurations[record.date]) {
      dailyDurations[record.date] += duration;
    } else {
      dailyDurations[record.date] = duration;
    }
  });
  
   labels = Object.keys(dailyDurations).sort();
   datas = labels.map(date => dailyDurations[date]);
}
else{
  const allRecords = [...employee.records,emp1.records];
  employee.records.forEach((record)=>{
    const duration= timeSubtraction({start:record.startTime,end:record.endTime});
    
    if(dailyDurations1[record.date]){
      const sum = duration + dailyDurations1[record.date].num_emp1;
      dailyDurations1[record.date] = {...dailyDurations1[record.date],num_emp1:sum} 
    }
    else{
      dailyDurations1[record.date] = {num_emp1:duration,num_emp2:0};
    }
  })

  emp1.records.forEach((record)=>{
    const duration= timeSubtraction({start:record.startTime,end:record.endTime});
    
    if(dailyDurations1[record.date]){
      const sum = duration + dailyDurations1[record.date].num_emp2;
      dailyDurations1[record.date] = {...dailyDurations1[record.date],num_emp2:sum} 
    }
    else{
      dailyDurations1[record.date] = {num_emp1:0,num_emp2:duration};
    }
  });

  labels = Object.keys(dailyDurations1).sort();
  datas = labels.map(date => dailyDurations1[date].num_emp1);
  datas1 = labels.map(date => dailyDurations1[date].num_emp2);


}






      const backgroundColors = [
        '#FF6384', // Pembe
        '#36A2EB', // Mavi
        '#FFCE56', // Sarı
        '#4BC0C0', // Turkuaz
        '#9966FF', // Mor
        '#FF9F40', // Turuncu
        '#8E44AD', // Eflatun
        '#2ECC71', // Yeşil
        '#E74C3C', // Kırmızı
        '#3498DB', // Açık Mavi
        '#F1C40F', // Altın Sarısı
        '#1ABC9C', // Su Yeşili
        '#9B59B6', // Lavanta
        '#34495E', // Koyu Gri-Mavi
        '#16A085', // Koyu Turkuaz
        '#27AE60', // Zümrüt Yeşili
        '#2980B9', // Deniz Mavisi
        '#D35400', // Yanık Turuncu
        '#C0392B', // Koyu Kırmızı
        '#BDC3C7', // Açık Gri
        '#7F8C8D', // Gri
        '#F39C12', // Portakal Sarısı
        '#D68910', // Hardal
        '#58D68D', // Açık Yeşil
        '#AF7AC5', // Lila
      ];

      const choosenColors = datas.map((_,index)=>(backgroundColors[index%backgroundColors.length]))




    const datasets =
    emp1?
    [
      {
        label : `${employee.name}`,
        data:datas,
        borderColor:'amber',
        backgroundColor:'red',
      },
      {
        label : `${emp1.name}`,
        data : datas1,
        borderColor : 'amber',
        backgroundColors : 'blue',
      },
  
    ]
    :
    [{
        label : 'Çalışma Süresi ',
        data:datas,
        borderColor:'amber',
        backgroundColor:choosenColors,
    },
  ];



  



    return(
        <div  id="günlük-grafik" className="lg:w-fit lg:h-fit relative    ">
          
        <div id="butonlar" className=" justify-center flex flex-row space-x-10 mb-10">
            <div className="flex flex-col items-center justify-center" id="buton-chart">
            <h1 className="opacity-60">Chart</h1>
            <button onClick={()=>{setType('chart')}} className="cursor-pointer  opacity-60">
            <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill={type==='chart'?'black':'none'} stroke="black" strokeWidth="8" />
</svg>
            </button>
            </div>

            <div className="flex flex-col items-center justify-center" id="buton-Bar">
            <h1 className=" opacity-60">Bar</h1>
            <button onClick={()=>{setType('bar')}} className="cursor-pointer  opacity-60">
            <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill={type==='bar'?'black':'none'} stroke="black" strokeWidth="8" />
</svg>
            </button>
            </div>

            
<div id="emp-picker relative">
  
{employees&&<div id='emp-picker-button' className="flex flex-col items-center justify-center">
              <h1 className=" opacity-60">Choose</h1>
              <button onClick={()=>setIsDropdown(!isDropdown)}  className="rleative cursor-pointer  opacity-60">
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          
            </button>
            {isDropdown&&<div className="absolute top-12 lg:top-16">
              <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8L8 0L16 8H0Z" fill="#ececf5"/>
    </svg>
              </div>}
  </div>     
  }
  {(employees&&isDropdown)&&
  <div id="dropdown-emp" className="absolute mt-1 rounded-lg z-50 w-32 h-48  bg-[#ececf5]">
    
    <ul>
      {employees?.map((emp,index)=>
      {
        if(employee!==emp){return(
          <li  key={index}>
          <button onClick={()=>{setEmp1(emp);setIsDropdown(false)}} className="p-1 px-2 border-b border-gray-300 text-sm cursor-pointer hover:bg-gray-300 w-full"> {emp.name}</button>
        </li>
        )}
      })}
    </ul>
    </div>}
    
  </div>
  
  </div>


<div className=" lg:h-[500px] lg:w-[750px] flex justify-center h-[250px] w-[375px]     " id="charts">
{
        type==='bar'&&
        <Bar options={options} data={data({ labels : labels, datasets:datasets })} width={600} height={600} />
}
{
    type==='chart'&&
    <Line options={options} data={data({ labels, datasets })} width={400} height={400}></Line>
}

</div>
</div>
    );
}

export default ChartModal;
