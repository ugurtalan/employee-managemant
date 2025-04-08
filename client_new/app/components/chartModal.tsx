"use client"
import Modal from "./modal";
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
    }
const ChartModal = ({employee}:Props)=>{


    

        useEffect(()=>{
                console.log("chart tooltip defaults   :   " , ChartJS.defaults.plugins.tooltip);
        },[]);
    
    const [type,setType] = useState<string>('chart');

    const labels = employee.records.map((record)=>(record.date))
    console.log('labellar : '+labels);
    const datas = employee.records.map((record) =>
        timeSubtraction({ start: record.startTime, end: record.endTime })
      );


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




    const datasets =[{
        label : 'Çalışma Süresi ',
        data:datas,
        borderColor:'amber',
        backgroundColor:choosenColors,
    }]



    return(
        <div  id="günlük-grafik" className="w-[500px] h-[500px] relative">
        <div id="butonlar" className=" justify-center flex flex-row space-x-10 mb-10">
            <div className="flex flex-col items-center justify-center" id="buton-chart">
            <h1 className="opacity-60">Chart</h1>
            <button onClick={()=>{setType('chart')}} className="cursor-pointer  opacity-60">
            <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill={type==='chart'?'black':'none'} stroke="black" strokeWidth="8" />
</svg>
            </button>
            </div>

            <div className="flex flex-col items-center justify-center" id="buton-Bar">
            <h1 className=" opacity-60">Bar</h1>
            <button onClick={()=>{setType('bar')}} className="cursor-pointer  opacity-60">
            <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill={type==='bar'?'black':'none'} stroke="black" strokeWidth="8" />
</svg>
            </button>
            </div>

            <div className="flex flex-col items-center justify-center" id="buton-Pie">
            <h1 className=" opacity-60">Pie</h1>
            <button onClick={()=>{setType('pie')}} className="cursor-pointer  opacity-60">
            <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill={type==='pie'?'black':'none'} stroke="black" strokeWidth="8" />
</svg>
            </button>
            </div>
        </div>


<div className=" h-96 w-96 m-auto " id="charts">
{
        type==='bar'&&
        <Bar options={options} data={data({ labels : labels, datasets:datasets })} width={600} height={600} />
}
{
    type==='chart'&&
    <Line options={{}} data={data({ labels, datasets })} width={600} height={600}></Line>
}

{
    type==='pie'&&
    <Pie options={{}} data={data({ labels, datasets })} width={600} height={600} ></Pie>
}
</div>
</div>
    );
}

export default ChartModal;
