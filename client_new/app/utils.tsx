
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
        backgroundColor: '#FEF3C7', 
        titleColor: 'rgb(0,0,0)', 
        bodyColor: 'rgb(0,0,0)', 
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1, 
        cornerRadius: 8,
        padding: 10, 

       
        
    },
  }
}
  