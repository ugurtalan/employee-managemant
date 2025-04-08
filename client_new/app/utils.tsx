import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import { color } from "framer-motion";

type dataType ={
    labels:string[];
    datasets:{
            label:string;
            data: number[];
            borderColor:string;
    }[];
}

export const data =({labels,datasets}:dataType)=>{
    return {
        labels:labels,
        datasets:datasets,
    }
} 
type time = {
    start:string;
    end:string;
}
export const timeSubtraction =({start,end}:time)=>{

    const [startHour,startMinute] = start.split(':').map((a)=>Number(a));
    const [endHour,endMinute] = end.split(':').map((a)=>Number(a));

    return Math.round(((((endHour * 60) + endMinute)-((startHour*60)+startMinute))/60))+0;

}

export const options = {
    plugins: {
      tooltip: {
        backgroundColor: '#FEF3C7', // Tooltip arka plan rengi
        titleColor: 'rgb(0,0,0)', // Başlık rengi
        bodyColor: 'rgb(0,0,0)', // Gövde metni rengi
        borderColor: 'rgba(255,255,255,0.3)', // Kenar rengi
        borderWidth: 1, // Kenar genişliği
        cornerRadius: 8, // Köşe yuvarlama
        padding: 10, // Padding

       
        
    },
  }
}
  