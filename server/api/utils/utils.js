const fs = require('fs');
const path = require('path');
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
  
    
const lastAdded = (user) => {
    
    if (user.records.length === 0) {
      return null; 
    }
    return user.records[user.records.length - 1].topics;
  };



  const assignmentsPath = path.join(__dirname,'../../assignments.json');
  const readAssignments = ()=>{
    try {
      const data = fs.readFileSync(assignmentsPath,'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("JSON dosyası okunurken hata oluştu:", error);
      return [];
    }
  }
  
  const writeAssignments = (data)=>{
    try {
       fs.writeFileSync(assignmentsPath,JSON.stringify(data,null,2));
    } catch (error) {
      console.error("JSON dosyası okunurken hata oluştu:", error);
      return [];
    
    }
  }
  
  
  
  
  const usersFilePath = path.join(__dirname, '../../users.json');
  
  const readUsers = () => {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf-8'); 
      return JSON.parse(data) || [];  
    } catch (error) {
      console.error("JSON dosyası okunurken hata oluştu:", error);
      return []; 
    }
  };
  
  const writeUsers = (data) => {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing users file:", error);
    }
  };
  
const adminsFilePath = path.join(__dirname, '../../admin.json');

const readAdmins = () => {
  try {
    const data = fs.readFileSync(adminsFilePath, 'utf-8'); 
    return JSON.parse(data) ;  
  } catch (error) {
    console.error("JSON dosyası okunurken hata oluştu:", error);
    return []; // 
  }
};

const writeAdmins = (data) => {
  try {
    fs.writeFileSync(adminsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};



export const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000); // örnek: 1713809812345
};




module.exports = {
totalDay,
averageWorkHour,
totalWorkHour,
lastAdded,
readAssignments,
writeAssignments,
readUsers,
writeUsers,
writeAdmins,
readAdmins,
generateRandomId,

};


