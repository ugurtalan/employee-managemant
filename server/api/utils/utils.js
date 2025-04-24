const fs = require('fs');
const path = require('path');

const totalWorkHour = (user) => {
  return user.records.reduce((total, record) => {
    return total + timeSubtraction(record.startTime, record.endTime);
  }, 0);
};

const averageWorkHour = (user) => {
  const dates = [];
  user.records.forEach(record => {
    if (!dates.includes(record.date)) {
      dates.push(record.date);
    }
  });
  return totalWorkHour(user) / (dates.length === 0 ? 1 : dates.length);
};

const timeSubtraction = (start, end) => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  return Math.round((((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60));
};

const totalDay = (user) => {
  return user.records.length;
};

const lastAdded = (user) => {
  if (user.records.length === 0) return null;
  return user.records[user.records.length - 1].topics;
};

const assignmentsPath = path.join(__dirname, '../../assignments.json');
const usersFilePath = path.join(__dirname, '../../users.json');
const adminsFilePath = path.join(__dirname, '../../admin.json');

const readAssignments = () => {
  try {
    const data = fs.readFileSync(assignmentsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("JSON dosyası okunurken hata oluştu:", error);
    return [];
  }
};

const writeAssignments = (data) => {
  try {
    fs.writeFileSync(assignmentsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Yazma hatası:", error);
  }
};

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Kullanıcı verisi okunamadı:", error);
    return [];
  }
};

const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Kullanıcı verisi yazılamadı:", error);
  }
};

const readAdmins = () => {
  try {
    const data = fs.readFileSync(adminsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Admin verisi okunamadı:", error);
    return [];
  }
};

const writeAdmins = (data) => {
  try {
    fs.writeFileSync(adminsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Admin verisi yazılamadı:", error);
  }
};

const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
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
  generateRandomId
};
