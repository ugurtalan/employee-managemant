"use client"

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faWarning } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const LoginTab = () =>{
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        
       
      
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
              username,
              password,
            });
        
            console.log(response.data); 
            if(response.data.type==='employee')
            router.push(`/users/${response.data.id}`);

            else
            router.push (`/admin/${response.data.id}?name=${response.data.name}`);
          } catch (error) {
            console.error('Hata:' + error);
            setErrorMessage("Kullanıcı adı veya Şifre Yanlış");

            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            
        }
      
    }

    return(

        <div suppressHydrationWarning={true} id="screen" style={{backgroundImage:'url(/view.jpg)'}} className=" bg-center    h-screen w-screen flex justify-center flex-col  items-center relative ">
                        <h1 className=" text-5xl font-extralight opacity-75 border-b-2 border-gray-400 px-8">Görev Yönetim Sistemi</h1>
                        <p className="text-2xl mt-3 mb-20">Giriş</p>
                <div id="logintab" className="bg-[rgb(245,240,229)] z-50 rounded-md opacity-100 ">

                
                        <div className=" flex flex-col  p-5 " id="logintab-içerik">
                               
                                <div className="flex justify-around p-3">
                            <Image className=" "  src={"/globe.svg"} alt={"XX"} width={60} height={60}></Image>

                                </div>

                                    <div className="" id="logintab-içerik-bilgiler">
                                        
                                   <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
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
                        
                                   
                        
                        
                        


                                    </div>

                                    <div className=" p-2 flex flex-row justify-center space-x-1.5  " id="logintab-içerik-formtürü">
                                            <p>Eğer kayıt olmadıysanız <Link className="text-blue-500 hover:border-b-2 border-blue-500"  href={"/register"}>Kayıt Ol</Link></p> 
                                    </div>

                            {errorMessage.length>0? <p className="bg-red-600 py-3 text-center rounded-sm"><FontAwesomeIcon className="mx-2" icon={faWarning}></FontAwesomeIcon> {errorMessage}</p>
                        : 
                        <></>
                        }

                       
                            </div>

                </div>
        </div>
    
    );
};

export default LoginTab;
