
const totalWorkHour = (user)=>{
    return user.records.reduce((total,record)=>{return total+timeSubtraction(record.startTime,record.endTime)},0)
}


const averageWorkHour = (user)=>{
    
  const dates = [];

  user.records.forEach(record => {
    if(dates.some(date => date === record.date)){

    }
    else{
      dates.push(record.date);
    }
  });

  console.log("dates length : " , dates.length);
  
  return totalWorkHour(user)/(dates.length===0?1:dates.length);
}



const timeSubtraction =(start,end)=>{

    const [startHour,startMinute] = start.split(':').map((a)=>Number(a));
    const [endHour,endMinute] = end.split(':').map((a)=>Number(a));

    return Math.round(((((endHour * 60) + endMinute)-((startHour*60)+startMinute))/60))+0;

}


const totalDay = (user)=>{

    return user.records.length;
}


const MostWorkedTopic = (user) => {
    if (user.records.length === 0) {
      return "No records available"; 
    }
    const counts = Array(user.records.length).fill(0);

    
    
  };
  
    
const lastAdded = (user) => {
    
    if (user.records.length === 0) {
      return "No records available"; 
    }
    return user.records[user.records.length - 1].topics;
  };
  

module.exports = {
totalDay,
averageWorkHour,
totalWorkHour,
MostWorkedTopic,
lastAdded,

};