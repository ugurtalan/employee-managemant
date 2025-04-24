'use client'
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import {  useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { analyze, employee } from "@/app/types";
import DropdownToggle from "@/app/components/dropdownToggle";
import axios from "axios";
import { faUser,faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartModal from "../../components/chartModal";
import InfoCardAdmin from "@/app/components/ınfoCardAdmin";
import MyDataTable from "@/app/components/dataTable"; 
import MyAssignedDataTable from "@/app/components/assignedDataTable";
const AdminPage = ()=>{
const params = useSearchParams();
const name = params.get('name');

const [employee,setEmployee] = useState<employee>();
const [workers,setWorkers]=useState<employee[]>([]);
const [isDrop,setIsDrop] = useState<boolean>(false);
const [analyze,setAnalyze] = useState<analyze>(); 


useEffect(() => {
    axios.get('http://localhost:5000/admin/workers')
        .then(response => {
            console.log("responess : ",response.data.msg);
            setWorkers(response.data.workers);
            
        })
        .catch(error => {
            alert("fetchde hata meydana geldi: " + error);
        });

        


}, []);


useEffect(()=>{
setEmployee(workers?.[0])
},[workers])




useEffect(()=>{
     if(!employee) return;  
    
    axios.get('http://localhost:5000/user/records/analyze',{
            params:{id:employee?.id},
        })        
        .then(response=>{
            const newAn = {
                totalWorkHour:response.data.totalWorkHour,
                averageWorkHour:response.data.averageWorkHour,
                MostWorkedTopic:response.data.MostWorkedTopic,
                lastAdded:response.data.lastAdded,
                totalDay:response.data.totalDay,
            }
            setAnalyze(newAn);
            console.log('işçi verileri alındı')
        })
        .catch(error=>{console.error('veriçekme hatası' + error)})
},[employee])










    return(
<div id="screen" className="bg-[#ececf2] h-screen ">
    <Navbar>
        <div id="name-and-links" className="w-full  flex justify-between px-4 items-center">
        <div className="text-white flex space-x-4 " id="name">
                <h1>
                    <FontAwesomeIcon
                    icon={faUser}></FontAwesomeIcon>
                    
                    {' '+name}
                </h1>
        </div>
            <div className="  flex flex-row items-center space-x-5 text-white" id="links">
               
                <DropdownToggle isOpen={isDrop} change={()=>{setIsDrop(prev=>(!prev))}}>

                    <ul>
                        {workers.map((worker,index)=>(
                            <li onClick={()=>{setEmployee(worker);
                                setIsDrop((prev)=>!prev);
                            }} key={index} className=" hover:bg-gray-300 cursor-pointer p-2 " >{worker.name}</li>
                        ))}
                    </ul>
                </DropdownToggle>
        
                <Link  href={`/`}>
                <span className="mr-2">Çıkış Yap</span>
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
                </Link>
                    
        </div>
        </div>
    </Navbar>
    <div className={`fixed mt-16 px-30 rounded-br-2xl bg-[#112854] text-white w-fit ${isDrop?'-z-10':'z-50'}`}>{employee?.name}</div>


{!employee?
<div className=" space-y-5 flex flex-col justify-center items-center h-full m-auto "><h1 className="text-4xl">Çalışan Seçilmedi...</h1>
</div>


    :
<div>


<div id="container-tables-genel" className="  w-full p-6 flex justify-center items-start space-x-3 ">
                        <div id="container-table" className="bg-white h-full  w-1/2  mt-18 p-5 rounded-md ">
                           
<div className="h-full" id="table">
<MyDataTable records={employee?.records}></MyDataTable>
</div>


                        </div>

<div id="container-assigned-table" className= "bg-white  w-1/2   h-full  mt-18 p-5 rounded-md ">

<div className="h-full" id="assigned-table">
{employee&&<MyAssignedDataTable employee={employee}  ></MyAssignedDataTable>}

</div>


      
</div>
                        




    </div>

    <div id="grafikler-işlemler"  className=" p-5 h-fit  mt-15 flex flex-row lg:space-x-4-4 w-full   ">

    <div id="grafikler-infocardlar " className=" pb-10 rounded-lg h-full w-full   flex flex-col items-center justify-center ">
        <h1 className="  w-full text-start  "><span className="bg-white rounded-t-md py-4 px-10 text-xl ">Grafikler Ve Veriler</span></h1>
    {!employee? 
        <div className="h-[500px] w-[500px] text-center text-2xl pt-20" >Henüz İşçi Seçmediniz...</div>
    
    :
    employee.records.length>0?
    <div className="flex w-full  flex-row  items-center  justify-between   ">
        <div id="grafikler"  className="flex  items-center  bg-white py-6   rounded-lg   ">
        <div className="flex flex-col items-start space-y-5 p-3 " id="personal-grafik">
            <h1 className="text-2xl  border-b-2 w-full  text-center p-1 border-gray-300  " >Kişisel Grafik</h1>
        <ChartModal employee={employee} ></ChartModal>
        </div>
        <div className="flex flex-col items-start border-l-2 border-gray-300 space-y-5 p-3 mt-1 " id="compare-grafik">
        <h1 className="text-2xl border-b-2  w-full text-center p-1 border-gray-300  " >Karşılaştırmalı Grafik</h1>
        
        <ChartModal employee={employee} employees={workers}  ></ChartModal>

        </div>
        </div>
     <div  className="   rounded-lg   w-full flex flex-col items-center justify-center">

     <InfoCardAdmin info={analyze?.lastAdded} header={"Son Eklenen"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.totalDay+ '')} header={"Toplam Çalışılan  Gün"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.averageWorkHour+ ' Saat')} header={"Ortalama Çalışma Süresi"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.totalWorkHour+ ' Saat')} header={"Toplam Çalışma Süresi"}></InfoCardAdmin>

     </div>
    </div>
    :
    
    <div className=" w-full   bg-white h-96  flex items-center  rounded-lg  ">
        <h1 className="text-4xl text-center w-full py-20">Hiç Kayıt Yok ...</h1>
    </div>
    
    
    }
                           
    </div>

                              
    </div>

</div>
}

                              
                              
</div>
        
    );
}

export default AdminPage;