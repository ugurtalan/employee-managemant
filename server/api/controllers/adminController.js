const {generateRandomId,readAdmins,writeAdmins,readAssignments,writeAssignments,readUsers } = require('../utils/utils');



const adminAddAssign =(req,res)=>{
  const{adminId,employee,assign,date} = req.body;
  const allAssignments = readAssignments();
  const users = readUsers();
  const user = users.find((user)=>employee.id===user.id);
 
  const fromWho = readAdmins().find((admin)=>admin.id===Number(adminId))
  const newDate = date.replaceAll('.','-').slice(0,10).split('-').reverse().join('-');

const newAssignment = {
fromWho:fromWho.name,
toWho:employee.username,
assignmentDate:newDate,
topic:assign.topic,
details:assign.details,
isCompleted: false,
id: generateRandomId(),
seen:false
};
console.log(newAssignment);

  const newAssignments = [...allAssignments,newAssignment];
  writeAssignments(newAssignments);
  const userAssignments = newAssignments.filter((assignment)=>(assignment.toWho===user.username)&&(assignment.fromWho===fromWho.name));

  
  res.status(200).json({msg:"ekleme başarılı" , newAssignments:userAssignments});

  
}


const adminDeleteAssign = (req,res) =>{
      const {id,empId,adminId} = req.body;
      console.log('idler : ', id,' ', empId , ' ' , adminId );     

      const allAssignments = readAssignments();
      
      const assignment = allAssignments.find((assignment)=>Number(id)===assignment.id);
      console.log(assignment);
      const users = readUsers();
      const user = users.find((user)=>Number(empId)===user.id);
      const admins = readAdmins();
      const admin = admins.find((admin)=>Number(adminId)===admin.id);
      console.log(assignment?'var':'yok');
      if(assignment) {
        
      const newAssignments = allAssignments.filter((assignment)=>assignment.id!==Number(id))

      const userAssignments = newAssignments.filter((assignment)=>(assignment.toWho===user.username)&&(assignment.fromWho===admin.name));

      writeAssignments(newAssignments);
        res.status(200).json(({msg:'çekme işlemi başarılı',newAssignments:userAssignments}));
    }
    else{

      res.status(404).json (({msg:'çekim başarısız'}));
    }
      
};

const adminAssignTable = (req,res)=>{
  const {sender,receiver} = req.body;
  console.log("senderName : ", sender);
  console.log("receiver usernmane : ", receiver.username);

  

  const allAssignments = readAssignments();
console.log("all assignments : ",allAssignments);

  const assignments = allAssignments.filter((assignment)=>{
   return  assignment.toWho===receiver.username&&assignment.fromWho===sender

    
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



module.exports={adminLogin,adminWorkers,adminRegister,adminAssignTable,adminAddAssign,adminDeleteAssign};