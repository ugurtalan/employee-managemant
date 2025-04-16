'use client'
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { analyze, assignment, employee } from "@/app/types";
import DropdownToggle from "@/app/components/dropdownToggle";
import axios from "axios";
import { faHome,faChartLine,faUser,faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartModal from "../../components/chartModal";
import { useRef } from "react";
import InfoCardAdmin from "@/app/components/ınfoCardAdmin";
import MyDataTable from "@/app/components/dataTable"; 
import MyAssignedDataTable from "@/app/components/assignedDataTable";
const AdminPage = ()=>{
const params = useSearchParams();
const name = params.get('name');

const {id} = useParams();
const [employee,setEmployee] = useState<employee>();
const [workers,setWorkers]=useState<employee[]>([]);
const [isDrop,setIsDrop] = useState<boolean>(false);
const targetRef = useRef<HTMLDivElement>(null);
const [analyze,setAnalyze] = useState<analyze>(); 
const [assignments,setAssignments] = useState<assignment[]>();


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
if(!employee) return;

    axios.post('http://localhost:5000/admin/assignments',{
        sender:name,
        receiver:employee,
    })
    .then(response=>{setAssignments(response.data.assignments);
        console.log(response.data);
    })
    .catch(error=>console.log(error));

    
},[employee])




useEffect(()=>{
console.log("assignments : ", assignments);
},[assignments])
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

useEffect(()=>{
setEmployee(workers[2]);
},[workers])




const handleScroll = ()=>{
    targetRef.current?.scrollIntoView({behavior:'smooth'})
}


    return(
<div id="screen" className="bg-[#ececf2] h-screen">
    <Navbar>
        <div id="name-and-links" className="w-full  flex justify-between px-4 items-center">
            <div className="  flex flex-row items-center space-x-5 text-white" id="links">
                <Link  href={`/admin/${id}?name=${name}`}>
                <span className="mr-1">Home</span>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                </Link>
                <DropdownToggle isOpen={isDrop} change={()=>{setIsDrop(prev=>(!prev))}}>

                    <ul>
                        {workers.map((worker,index)=>(
                            <li onClick={()=>{setEmployee(worker);
                                setIsDrop((prev)=>!prev);
                            }} key={index} className=" hover:bg-gray-300 cursor-pointer p-2 " >{worker.name}</li>
                        ))}
                    </ul>
                </DropdownToggle>
        
                    
        </div>
        <div className="text-white flex space-x-4 " id="name">
                <h1>
                    <FontAwesomeIcon
                    icon={faUser}></FontAwesomeIcon>
                    
                    {' '+name}
                </h1>
                <Link  href={`/`}>
                <span className="mr-2">Çıkış Yap</span>
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
                </Link>
        </div>
        </div>
    </Navbar>
    <div className={`fixed mt-16 px-30 rounded-br-2xl bg-[#112854] text-white w-fit ${isDrop?'-z-10':'z-50'}`}>{employee?.name}</div>

    <div id="container-genel" className=" h-fit w-full p-6 flex justify-center items-start space-x-3 ">
                        <div id="container-table" className="bg-white  lg:w-3/4  mt-18 p-5 rounded-md ">
                            {employee?.records.length===0?
                            <div className="h-full w-full   text-center text-5xl p-24
                            ">Hiç İş Kaydı Yok...</div>
                            :
<div id="table">
<MyDataTable records={employee?.records}></MyDataTable>
</div>

}
                        </div>

<div id="container-assigned-table" className="bg-white  lg:w-1/4   mt-18 p-5 rounded-md ">
{employee?.records.length===0?
                            <div className="h-full w-full   text-center text-5xl p-24
                            ">Hiç İş Kaydı Yok...</div>
                            :
<div id="assigned-table">
<MyAssignedDataTable assignments={assignments}></MyAssignedDataTable>
</div>

}
      
</div>
                        




    </div>

    <div id="grafikler-işlemler"  className=" p-5 h-fit  mt-15 flex flex-row lg:space-x-4-4 w-full  ">

    <div id="grafikler-infocardlar " className=" pb-10 rounded-lg h-full w-full   flex flex-col items-center justify-center ">
        <h1 className="  w-full text-start  "><span className="bg-white rounded-t-md py-4 px-10 text-xl ">Grafikler Ve Veriler</span></h1>
    {employee? 
    <div className="flex w-full  flex-row  items-center  justify-between    ">
        <div id="grafikler"  className="flex  items-center  bg-white py-17 rounded-lg ">
        <ChartModal employee={employee} ></ChartModal>
        <ChartModal employee={employee} employees={workers}  ></ChartModal>

        </div>
     <div  className="   rounded-lg   w-full flex flex-col items-center justify-center">

     <InfoCardAdmin info={analyze?.lastAdded} header={"Son Eklenen"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.totalDay+ '')} header={"Toplam Yapılan İş"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.averageWorkHour+ ' Saat')} header={"Ortalama Çalışma Süresi"}></InfoCardAdmin>
     <InfoCardAdmin info={String(analyze?.totalWorkHour+ ' Saat')} header={"Toplam Çalışma Süresi"}></InfoCardAdmin>

     </div>
    </div>
    
    :
    
    
    <div className="h-[500px] w-[500px] text-center text-2xl pt-20" >Henüz İşçi Seçmediniz...</div>
    }
                           
    </div>

                              
    </div>

                              
                              
</div>
        
    );
}

export default AdminPage;