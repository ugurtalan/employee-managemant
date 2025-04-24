const { totalWorkHour, averageWorkHour, totalDay, MostWorkedTopic, lastAdded,readAdmins,readAssignments,writeAssignments,readUsers,writeUsers } = require('../utils/utils.js');






const userRegister = (req, res) => {
  console.log("userRegister'a girdi");
  const { username, name, password } = req.body;

  let users = readUsers();
  if (!Array.isArray(users)) users = [];
  
  const user = users.find((user) => user.username === username);
  const id = users?.[users.length-1]?.id+1;
  if (!user) {
    const newUser = {
      id: id?id:1,
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
  if(users[userIndex].records.some((r)=>r.date===record.date)){
    res.status(500).json({ msg:"Aynı Tarihli ekleme yapılamaz"});
    return;
  }
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
  const admins = readAdmins();
  const admin = admins.find(admin => admin.username === username && admin.password === password);

  if (user) {
    res.status(200).json({ msg: 'Giriş başarılı', id: user.id ,type:'employee'});
  } else {
    if(admin){
    res.status(200).json({msg: 'giriş başarılı', id:admin.id , type:'manager',name:admin.name});
    }
  else{
    res.status(400).json({ msg: 'Geçersiz kullanıcı adı veya şifre' });

  }  
  }  
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

const userAssignmentsSeen = (req,res) =>{
  console.log("userAS gitrdi");
  const{userId} = req.body;
  const allAssignments = readAssignments();
  const users = readUsers();
  const user = users.find((user)=>user.id===Number(userId));
  console.log(user);
  const newAssignments = allAssignments.map((assignment)=>{
    if(assignment.toWho===user.username){
     return newAssignment = {...assignment,seen:true};
    }
    return assignment;
  })

  writeAssignments(newAssignments);

  res.status(200).json({msg:'başarılı'});
}

const usersAssignments = (req,res)=>{
  console.log('userASsiignments girdi . ');
  const{id} = req.body;
  const allAssignments = readAssignments();
  const allUsers = readUsers();

  console.log('ALL ASSSİGNMENTS : ',allAssignments);
  console.log('ALL USERS' , allUsers);
  const user = allUsers.find((usr)=>usr.id===Number(id));
  console.log('USER : ', user);
  if(user){
    const assignments = allAssignments.filter((assignment)=>{
      return (assignment.toWho===user.username)&&!(assignment.isCompleted);
    });
    console.log('kurtis Assignments : ',assignments);
    if(assignments){
      res.status(200).json({msg:'çekim başarılı', assignments:assignments})
    }
    else{
      res.status(500).json({msg:'çekim başarısız'});
    }
  }
  else{
    res.status(500).json({msg:'çekim başarısız'});
  }

}

const completeAssignments = (req,res)=>{
  const {userId,taskId} = req.body;
  const allUsers = readUsers();
  const allAssignments= readAssignments();
  const assignment = allAssignments.find((assignment)=>Number(taskId)===assignment.id);
  const userIndex = allUsers.findIndex((user)=>user.id===Number(userId));
  const newAssignment = {...assignment,isCompleted:true};
  const newId = allAssignments?.[allAssignments.length-1]?.id+1
  const newAssignments = [...allAssignments.filter((assignment)=> (taskId!==assignment.id)),newAssignment];
  
console.log("newASsignments : ", newAssignments);
  
  writeAssignments(newAssignments);
  const userAssignments = newAssignments.filter((assignment)=>assignment.toWho===allUsers[userIndex].username);

  res.status(200).json({msg:'tamamlama işlemi başarılı',assignments:userAssignments});


}


module.exports = {
  userRegister,
  userLogin,
  userRecords,
  userAnalyze,
  userRecordsAdd,
userRecordsDelete,
usersAssignments,
completeAssignments,
userAssignmentsSeen
}