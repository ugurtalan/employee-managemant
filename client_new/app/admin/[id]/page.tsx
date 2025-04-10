'use client'
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { analyze, employee } from "@/app/types";
import DropdownToggle from "@/app/components/dropdownToggle";
import axios from "axios";
import { faHome,faChartLine,faUser,faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartModal from "../../components/chartModal";
import { useRef } from "react";
import InfoCardAdmin from "@/app/components/ınfoCardAdmin";
import MyDataTable from "@/app/components/dataTable"; 
import {jsPDF} from "jspdf";
import { autoTable } from 'jspdf-autotable'
const AdminPage = ()=>{
const params = useSearchParams();
const name = params.get('name');
const {id} = useParams();
const [employee,setEmployee] = useState<employee>();
const [workers,setWorkers]=useState<employee[]>([]);
const [isDrop,setIsDrop] = useState<boolean>(false);
const targetRef = useRef<HTMLDivElement>(null);
const [analyze,setAnalyze] = useState<analyze>(); 
const doc = new jsPDF();


const downloadPDF = () => {
    const doc = new jsPDF();

    // Tabloyu DataTable'dan al ve PDF'e ekle
    const tableData = employee?.records || [];
    
    // Tabloyu PDF'e eklemek için başlıkları ve satırları döngüyle ekle
    const headers = ["Tarih", "Başlangıç Saati", "Bitiş Saati", "Konu"];
    const rows = tableData.map(record => [
        record.date, 
        record.startTime, 
        record.endTime, 
        record.topics,
    ]);

   autoTable(doc,{
    head: [headers],
    body: rows,
   })

    // PDF dosyasını indir
    doc.save("employee_data.pdf");
};

useEffect(() => {
    axios.get('http://localhost:5000/admin/workers')
        .then(response => {
            console.log(response.data.msg);
            setWorkers(response.data.workers);
        })
        .catch(error => {
            alert("fetchde hata meydana geldi: " + error);
        });

        


}, []);


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
setEmployee(workers[0]);
},[workers])




const handleScroll = ()=>{
    targetRef.current?.scrollIntoView({behavior:'smooth'})
}


    return(
<div id="screen" className="">
    <Navbar>
        <div className=" flex flex-row space-x-5" id="links">
                <Link className="" href={`/admin/${id}?name=${name}`}>
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

                    <button onClick={()=>{handleScroll();}}  className=" cursor-pointer">
                        <span className="mr-2">Grafikler</span>
                        <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>

                    </button>
                    <Link className="" href={`/`}>
                <span className="mr-2">Çıkış Yap</span>
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
                </Link>
        </div>
        <div className="" id="name">
                <h1>
                    <FontAwesomeIcon
                    icon={faUser}></FontAwesomeIcon>
                    
                    {' '+name}
                </h1>
        </div>
    </Navbar>
    <div className={`fixed mt-16 px-30 rounded-br-2xl bg-gradient-to-b from-amber-50  to-amber-100 w-fit ${isDrop?'-z-10':'z-50'}`}>{employee?.name}</div>

    <div id="container-genel" className=" h-screen p-6 ">
                        <div id="container-table" className="bg-gradient-to-b from-amber-100 to-amber-200 h-full mt-18 p-5 rounded-md ">
                            {employee?.records.length===0?
                            <div className="h-full w-full  text-center text-5xl pt-44
                            ">Hiç İş Kaydı Yok...</div>
                            :
<div id="table" className="    ">
<MyDataTable records={employee?.records}></MyDataTable>
</div>
}
                        </div>
    </div>

    <div id="grafikler-işlemler" ref={targetRef} className=" p-5 h-screen mt-15 flex flex-row lg:space-x-4">

    <div id="grafikler" className="bg-gradient-to-t from-amber-100 to-amber-200 rounded-lg h-full lg:w-2/3 flex flex-row items-center justify-center">
    {employee? <ChartModal employee={employee} ></ChartModal> :<div className="h-[500px] w-[500px] text-center text-2xl pt-20" >Henüz İşçi Seçmediniz...</div>     }
                            <div className="grid grid-cols-2 pr-2 gap-5">
                            <InfoCardAdmin info={analyze?.MostWorkedTopic } header={"En Çok Çalışılan Konu"}></InfoCardAdmin>
                            <InfoCardAdmin info={analyze?.lastAdded} header={"Son Eklenen"}></InfoCardAdmin>
                            <InfoCardAdmin info={String(analyze?.totalDay+ '')} header={"Toplam Yapılan İş"}></InfoCardAdmin>
                            <InfoCardAdmin info={String(analyze?.averageWorkHour+ ' Saat')} header={"Ortalama Çalışma Süresi"}></InfoCardAdmin>
                            <InfoCardAdmin info={String(analyze?.totalWorkHour+ ' Saat')} header={"Toplam Çalışma Süresi"}></InfoCardAdmin>
        

                            </div>
    </div>

                              <div className="hidden bg-gradient-to-t from-amber-100 to-amber-200 rounded-lg h-full lg:w-1/3 lg:flex lg:flex-col items-center justify-center" id="işlemler">

                              </div>
    </div>

                              
                              
</div>
        
    );
}

export default AdminPage;