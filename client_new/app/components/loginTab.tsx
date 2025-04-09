"use client"

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
const LoginTab = () =>{
    const [formType,setFormType] = useState<string>('giriş');
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [authType,setAuthType] = useState<string>('çalışan');
    const [name,setName] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>("");
    const [registerMessage,setRegisterMessage] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        
       
      
       if(authType==='çalışan'){
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
              username,
              password,
            });
        
            console.log(response.data); // Başarılı ise yanıtı konsola yazdır
  
            router.push(`/users/${response.data.id}`);
          } catch (error) {
            console.error('Hata:' + error);
            setErrorMessage("Kullanıcı adı veya Şifre Yanlış");

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            
        }
       }
       else if(authType==='admin'){
        try {
            const response = await axios.post('http://localhost:5000/admin/login',{
                username,
                password,
            });

            console.log(response.data);
            router.push(`/admin/${response.data.id}?name=${response.data.name}`);
            
        } catch (error) {
            console.error('Hata:' + error);
            setErrorMessage("Kullanıcı adı veya Şifre Yanlış");

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            
        }
       }
      };

      const handleSubmitRegister = async(e:React.FormEvent)=>{
        e.preventDefault();

        if(username.length===0||name.length===0||password.length===0){
            setRegisterMessage("Lütfen Hiçbir Alanı Boş Bırakmayınız");
            setTimeout(() => {
                setRegisterMessage("");
            }, 3000);
        }
        else{
            if(authType==='çalışan'){    try {
                const response = await axios.post('http://localhost:5000/user/register',{
                    name,
                    username,
                    password
                });
                
                if(response.data.msg==='kayıt başarılı'){
                setName('');
                setUsername('');
                setPassword('');
                setFormType('giriş');
            }   
        
            setRegisterMessage("Kayıt Başarılı");
        
            setTimeout(() => {
                setRegisterMessage("");
            },3000);
        
                
            } catch (error) {
                console.error('Hata:' + error);
              setRegisterMessage("Kayıt Başarısız");
        
              setTimeout(() => {
                setRegisterMessage("");
              }, 3000);
            }}
            else if(authType==='admin'){
                try {
                    console.log('authtype admin');
                        const response = await axios.post('http://localhost:5000/admin/register',{
                            name:name,
                            username:username,
                            password:password,
                        });
        
                        
            setRegisterMessage("Kayıt Başarılı");
        
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
        }
      }

   

    return(

        <div suppressHydrationWarning={true} id="screen" className=" h-screen w-screen flex justify-center flex-col  items-center relative ">
                        <h1 className=" text-3xl lg:text-5xl p-10">
                            İşçi Çalışma Saatleri Yönetim Sistemi'ne Hoşgeldiniz 
                        </h1>
                <div id="logintab" className="bg-amber-50  z-50 rounded-md  shadow-white shadow-md">

                <div className=" " id="admin-çalışan">
                                <button className={`${authType==='admin'?'bg-amber-500':'bg-amber-200'} rounded-b-3xl p-3 w-1/2 cursor-pointer `}
                                onClick={()=>{setAuthType('admin')}}
                                >
                                    Admin
                                </button>

                                <button className={`${authType==='çalışan'?'bg-amber-500':'bg-amber-200'} rounded-b-3xl p-3 w-1/2 cursor-pointer `}
                                onClick={()=>{setAuthType('çalışan')}}
                                >
                                    Çalışan
                                </button>
                                </div> 
                        <div className=" flex flex-col  p-5 " id="logintab-içerik">
                               
                                <div className="flex justify-around p-3">
                            <Image className=" "  src={"/globe.svg"} alt={"XX"} width={60} height={60}></Image>

                                </div>

                                    <div className="" id="logintab-içerik-bilgiler">
                                        
                                    {formType==='giriş'?<form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                               <div className="flex justify-between p-4 space-x-4 items-center">
                               <label className="" htmlFor="username">Kullanıcı Adı :</label>
                                <input
                                className="p-2 pl-3 rounded-2xl bg-slate-200 focus:outline-none "
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
                                <button className="cursor-pointer  border-white border-2 hover:border-purple-400 bg-emerald-500   p-2 m-2 rounded-2xl" type="submit">Giriş Yap</button>
                                </form>
                        
                                    :
                                    
                                    <form className="flex flex-col justify-center" onSubmit={handleSubmitRegister}>
                               <div className="flex justify-between p-4 space-x-4 items-center">
                               <label className="" htmlFor="name">Ad :</label>
                                <input
                                className="p-2 pl-3 rounded-2xl bg-slate-200 focus:outline-none"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); }}
                                    placeholder="Kullanıcı Adınız..."
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
                        
                        
                        }


                                    </div>

                                    <div className=" p-2 flex flex-row justify-center space-x-1.5  " id="logintab-içerik-formtürü">
                                        <div id="giriş" onClick={()=>setFormType('giriş')} className={`text-center   rounded-2xl w-1/2 p-2  ${formType==='giriş'?'bg-amber-500    ':'cursor-pointer  bg-amber-200'}`}>Giriş</div>
                                        
                                        <div id="kayıt" onClick={()=>setFormType('kayıt')} className={`text-center  rounded-2xl w-1/2 p-2 ${formType==='kayıt'?'bg-amber-500  border-white ':'cursor-pointer  bg-amber-200'}`}>Kayıt Ol </div>

                                    </div>

                            {errorMessage.length>0? <p className="bg-red-600 py-3 text-center rounded-sm"><FontAwesomeIcon className="mx-2" icon={faWarning}></FontAwesomeIcon> {errorMessage}</p>
                        : 
                        <></>
                        }

                        {
                            registerMessage.length>0?<p className={`${registerMessage==="Kayıt Başarılı"?'bg-green-500 text-center py-3 rounded-sm   ':'bg-red-600  text-center py-3 rounded-sm '}`}>{registerMessage}{registerMessage==="Kayıt Başarılı"?<FontAwesomeIcon className="mx-2" icon={faCheck}></FontAwesomeIcon>:<FontAwesomeIcon className="mx-2" icon={faWarning}></FontAwesomeIcon>}</p>:<></>
                        }
                            </div>

                </div>
        </div>
    
    );
};

export default LoginTab;