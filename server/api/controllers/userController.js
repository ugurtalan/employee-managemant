const fs = require('fs');
const path = require('path');
const { totalWorkHour, averageWorkHour, totalDay, MostWorkedTopic, lastAdded } = require('../../utils/utils.js');

const usersFilePath = path.join(__dirname, '../../users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8'); // 'utf-8' ekledim
    return JSON.parse(data) || [];  // Eğer JSON boşsa, boş dizi döndür
  } catch (error) {
    console.error("JSON dosyası okunurken hata oluştu:", error);
    return []; // Hata durumunda en azından boş dizi döndür
  }
};

const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};

const userRegister = (req, res) => {
  console.log("userRegister'a girdi");
  const { username, name, password } = req.body;

  let users = readUsers();
  if (!Array.isArray(users)) users = [];
  
  const user = users.find((user) => user.username === username);

  if (!user) {
    const newUser = {
      id: users.length + 1,
      name: name,
      role: 'employee',
      username: username,
      password: password,
      records: []
    };
    users.push(newUser);
    writeUsers(users);
    res.status(200).json({ msg: 'Kayıt başarılı', records: newUser.records });
  } else {
    res.status(400).json({ msg: 'Bu kullanıcı adı kullanılıyor' });
  }
};

const userRecords = (req, res) => {
  console.log("userRecords'a girdi.");
  const { id } = req.body;
  const users = readUsers();
  const user = users.find((user) => user.id === Number(id));

  if (user) {
    res.status(200).json({ msg: "Çekim başarılı", records: user.records, name: user.name });
  } else {
    res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  }
};

const userRecordsAdd = (req, res) => {
  console.log("userRecordsAdd'a Girdi.");
  const { id, record } = req.body;
  let users = readUsers();
  
  const userIndex = users.findIndex(user => user.id === Number(id));
  if (userIndex !== -1) {
    users[userIndex].records.push(record);
    console.log(users[userIndex]);
    writeUsers(users);
    res.status(200).json({ msg: "Eklendi", added: record,records: users[userIndex].records });
  } else {
    res.status(404).json({ msg: "Kullanıcı bulunamadı" });
  }
};

const userRecordsDelete = (req,res) =>{
  const{index,id} = req.body;
  const users= readUsers();
  const user = users.find(user=>user.id===Number(id));
  if(user){
    user.records.splice(index,1);
    writeUsers(users);
    console.log(users);
    res.status(200).json({msg:'silme işlemi başarılı',records:user.records});
  }
  else{
    res.status(500).json({msg:'silme işlemi başarısız'});
  }
}

const userLogin = (req, res) => {
  console.log("userLogin'e girdi");
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(record => record.username === username && record.password === password);

  if (user) {
    res.status(200).json({ msg: 'Giriş başarılı', id: user.id });
  } else {
    res.status(400).json({ msg: 'Geçersiz kullanıcı adı veya şifre' });
  }  // <-- Eksik süslü parantezi tamamladık
};  


const userAnalyze = (req, res) => {
  console.log("userAnalyze'a girdi.");
  const { id } = req.query;
  const users = readUsers();
  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
  }

  res.status(200).json({
    msg: 'Başarılı',
    totalWorkHour: totalWorkHour(user),
    averageWorkHour: averageWorkHour(user),
    totalDay: totalDay(user),
    MostWorkedTopic: MostWorkedTopic(user),
    lastAdded: lastAdded(user),
  });
};

module.exports = {
  userRegister,
  userLogin,
  userRecords,
  userAnalyze,
  userRecordsAdd,
userRecordsDelete,}