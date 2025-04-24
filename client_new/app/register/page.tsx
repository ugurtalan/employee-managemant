"use client"
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


 
 const RegisterPage = ()=>{
 const [name,setName] = useState<string>('');
 const [username,setUsername] = useState<string>('');
 const [password,setPassword] = useState<string>('');
 const [registerMessage,setRegisterMessage]=useState<string>('');
 
 const handleSubmitRegister = async(e:React.FormEvent)=>{
    e.preventDefault();

    if(username.length===0||name.length===0||password.length===0){
        setRegisterMessage("Lütfen Hiçbir Alanı Boş Bırakmayınız");
        setTimeout(() => {
            setRegisterMessage("");
        }, 3000);
        return;
    }


try {
                const response = await axios.post('http://localhost:5000/user/register',{
                        name:name,
                        username:username,
                        password:password,
                });
    
                    console.log(response.data);
        setRegisterMessage("Kayıt Başarılı");

        setName('');
        setUsername('');
        setPassword('');
        
        setTimeout(() => {
            setRegisterMessage("");


        },3000);
            }catch(error) {
                console.error('Hata:' + error);
              setRegisterMessage("Kayıt Başarısız");
        
              setTimeout(() => {
                setRegisterMessage("");
              }, 3000);
            }

}


 
 
 
 return(

<div  style={{backgroundImage: "url('/view.jpg')"}}
  id="screen" className="bg-center  h-screen w-screen flex flex-col justify-center items-center ">
   <h1 className=" text-5xl font-extralight opacity-75 border-b-2 border-gray-400 px-8">Görev Yönetim Sistemi</h1>
    <p className="text-2xl mt-3 mb-20">Kayıt</p>
    <div  id="register-tab" className=" rounded-md px-5 bg-[rgb(245,240,229)] ">
            <div id="header">
                <div id="logo" className="">
                                                <Image className="m-auto py-5 "  src={"/globe.svg"} alt={"XX"} width={60} height={60}></Image>
                </div>

            </div>
            <div id="body">
            <form className="flex flex-col justify-center" onSubmit={handleSubmitRegister}>
                               <div className="flex justify-between p-4 space-x-4 items-center">
                               <label className="" htmlFor="name">Ad :</label>
                                <input
                                className="p-2 pl-3 rounded-2xl bg-slate-200 focus:outline-none"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); }}
                                    placeholder="Adınız..."
                                />
                               </div>
                               <div className="flex justify-between p-4 space-x-4 items-center">
                               <label className="" htmlFor="username">Kullanıcı Adı :</label>
                                <input
                                className="p-2 pl-3 rounded-2xl bg-slate-200 focus:outline-none"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); }}
                                    placeholder="Kullanıcı Adınız..."
                                />
                               </div>
                                <div className="flex justify-between p-4 space-x-4 items-center">
                                <label className="" htmlFor="password">Şifre :</label>
                                <input
                                className="p-2 pl-3 rounded-2xl bg-slate-200 focus:outline-none"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); }}
                                    placeholder="Şifreniz..."
                                />
                                </div>
                                <button className="cursor-pointer  border-white border-2 hover:border-purple-400 bg-emerald-500  p-2 m-2 rounded-2xl" type="submit">Kayıt Ol</button>
                                </form>
                        {registerMessage.length>0&&<p className={`${registerMessage==='Kayıt Başarılı'?'bg-green-600':'bg-red-600'}  py-3 text-center rounded-sm`}><FontAwesomeIcon className="mx-2" icon={registerMessage==='Kayıt Başarılı'?faCheck:faWarning}></FontAwesomeIcon> {registerMessage}</p>
                        
                        }
                        
                        
                </div>
            <div className="pb-5" id="footer"> 
                <p className="text-center py-1">Giriş yapmak için <Link className="hover:border-b-2 border-blue-500 text-blue-500" href={'/'}>Giriş Yap</Link></p>
            </div>
    </div>

</div>
);


}

export default RegisterPage;