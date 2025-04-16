
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../../users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8'); 
    return JSON.parse(data) ;  
  } catch (error) {
    console.error("JSON dosyası okunurken hata oluştu:", error);
    return []; }
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


const adminAddAssign =(req,res)=>{
  const{assign} = req.body;
  const allAssignments = readAssignments();

  const newAssignments = [...allAssignments,assign];
  writeAssignments(newAssignments);
  
  res.status(200).json({msg:"ekleme başarılı" , newAssignments:newAssignments});

  
}

const adminAssignTable = (req,res)=>{
  const {sender,receiver} = req.body;
  console.log("senderName : ", sender);
  console.log("receiver usernmane : ", receiver.username);

  

  const allAssignments = readAssignments();
console.log("all assignments : ",allAssignments);

  const assignments = allAssignments.map((assignment)=>{

    if(assignment.toWho===receiver.username&&assignment.fromWho===sender){
      return assignment;
    }
    else{

    };
  })

  console.log("assignments : " , assignments);
  if(assignments){
    res.status(200).json({msg:'atamalar çekim başarılı' , assignments : assignments})
  }
  else{
    res.status(404).json({msg:'atamalar çekim başarısız'});
  }

}




const adminRegister = (req,res) =>{
    console.log('adminRegistera girdi');
    const{name,username,password} = req.body;
    const admins = readAdmins();
console.log('admins length : ',admins.length);
   
    let admin =admins.find((adm)=>(adm.username===username))
    if(!admin){
     admin={
        id:admins.length+1,
        name:name,
        role:'manager',
        username:username,
        password:password,
    }
    admins.push(admin);
    writeAdmins(admins);
    res.status(200).json({msg:'başarılı'});
   }
   else{
   res.status(400).json({msg:'başarısız'});
  }
}
const adminLogin = (req, res) => {
    console.log("adminLogine'e girdi");
    const { username, password } = req.body;
    const admins = readAdmins();
    console.log("adminlogindeki admins :  " ,admins)
        const admin = admins.find(admin => ((admin.username === username) && (admin.password === password)));
  
    if (admin) {
        console.log('ifdeki ADMİN : ',admin);
      res.status(200).json({ msg: 'Giriş başarılı', id: admin.id,name:admin.name  });
    } else {
      res.status(400).json({ msg: 'Geçersiz kullanıcı adı veya şifre' });
    }  
  
}



const adminWorkers = (req,res) =>{
    console.log('adminWorkera girdi');
    const users = readUsers();
    res.status(200).json({msd:'çekim başarılı',workers:users})

} 



module.exports={adminLogin,adminWorkers,adminRegister,adminAssignTable,adminAddAssign};