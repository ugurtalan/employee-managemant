
const totalWorkHour = (user)=>{
    return user.records.reduce((total,record)=>{return total+timeSubtraction(record.startTime,record.endTime)},0)
}


const averageWorkHour = (user)=>{
    return totalWorkHour(user)/user.records.length;
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
      return "No records available"; // records boşsa, uygun bir mesaj döndür
    }
  
    return user.records.reduce((most, record) => {
      // Eğer startHour veya endHour geçerli değilse, o kaydı atla
      if (!record.startHour || !record.endHour) {
        return most;
      }
  
      const mostTime = timeSubtraction(most.startHour, most.endHour);
      const currentTime = timeSubtraction(record.startHour, record.endHour);
  
      // En fazla saat geçirilen kaydı döndür
      return currentTime > mostTime ? record : most;
    }, user.records[0]).topics;
  };
  
    
const lastAdded = (user) => {
    // Eğer records dizisi boşsa, undefined döndürür
    if (user.records.length === 0) {
      return "No records available"; // veya uygun bir default değer döndürebilirsiniz.
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