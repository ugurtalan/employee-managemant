"use client"
import { useParams } from "next/navigation";
import axios from "axios";
import Modal from "../../components/modal" 
import Navbar from "../../components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {record} from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faAdd,faFilter,faInfoCircle,faUser,faSignOut,faHome,faClock,faCalendar,faComputer, faTrash} from "@fortawesome/free-solid-svg-icons";
import { analyze } from "@/app/types";
import InfoCard from "@/app/components/ınfoCard";
import ToggleButton from "@/app/components/toggleButton";
const UsersPage = ()=>{
    const [name,setName] = useState<string>('');
    const {id} = useParams();
    const [isFilter,setIsFilter] = useState<boolean>(false);
    const [records,setRecords] = useState<record[]>([]);
    const [startDate,setStartDate]  =useState<string>('00000000');
    const [endDate,setEndDate] = useState<string>('99999999');
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const [selectedIndex,setSelectedIndex] = useState<number>(0);
    const [newRecord,setNewRecord] = useState<record>(records[0]||{date:'',startTime:'' ,endTime:'',topics:'',detail:''});
    const [isJobAdd,setIsJobAdd] = useState<boolean>(false);
    const [analyze,setAnalyze] = useState<analyze>();
    const [isEdit,setIsEdit] = useState<boolean>(false);
    const filteredRecords = () => {
      return records.filter((record) => {
          const recordDate = Number(record.date.replace(/-/g,"")); 
          const startDate1 = Number(startDate.replace(/-/g,""));
          const endDate1 = Number(endDate.replace(/-/g,""));
          return recordDate >= startDate1 && recordDate <= endDate1;

        });
      };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("http://localhost:5000/user/records",
                {
                    id : id,
                }
            );
            setRecords(response.data.records);
            setName(response.data.name);

          } catch (error) {
            console.error("Veri çekme hatası:", error);
          }
        };
    
        fetchData();
      },[]);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/user/records/analyze",
                {
                    params:{id:id},
                }
            );
            setAnalyze(()=>{
              return {
                totalWorkHour:response.data.totalWorkHour,
                averageWorkHour:response.data.averageWorkHour,
                MostWorkedTopic:response.data.MostWorkedTopic,
                totalDay:response.data.totalDay,
                lastAdded:response.data.lastAdded,
              };
            });
            console.log(response.data);

          } catch (error) {
            console.error("Veri çekme hatası:", error);
          }
        };
    
        fetchData();
      },[]);

      const handleDelete = async (index: number ) => {
        try {
          const response = await axios.post(`http://localhost:5000/user/records/delete`,{index:index, id:id});
          console.log("Silme başarılı:", response.data);
          setRecords(response.data.records);
          
        } catch (error) {
          console.error("Silme hatası:", error);
        }
      };
      


  async function  handleAdd(newRecord:record) {
   console.log("newRecord : ",newRecord.date);
   console.log("newRecord : ",newRecord.startTime);
   console.log("newRecord : ",newRecord.endTime);
   console.log("newRecord : ",newRecord.topics);
   console.log("newRecord : ",newRecord.detail); 
   console.log(newRecord);
   
   if(newRecord.date.length===0||newRecord.startTime.length===0||newRecord.endTime.length===0||newRecord.topics.length===0||newRecord.detail.length===0){
      return;
   }
   else{
    try {
      const response = await axios.post('http://localhost:5000/user/records/add',{
        id:id,
        record:newRecord,
       }) 
       console.log(response.data)
       
       setRecords((prev)=>([...prev,response.data.added]));
     } catch (error) {
      console.log("iş eklerken hata meydana geldi ", error);
     }
   }
   
  }
    return(
      <div className="overflow-hidden">
      <Navbar>
      <div className="space-x-5 flex items-center justify-center" id="linkler">
      <Link  href={`/users/${id}`}>Home
      <FontAwesomeIcon className="px-2" icon={faHome}></FontAwesomeIcon>
      </Link>
      <Link href={`/`}>Çıkış Yap
      <FontAwesomeIcon  className="px-2" icon={faSignOut}></FontAwesomeIcon>
      </Link>

      </div>
      <div id="isim" className="flex items-center justify-center mr-3">
          <h1>
            <FontAwesomeIcon className="px-2" icon={faUser}></FontAwesomeIcon>
            {name}</h1>
      </div>
    </Navbar>
       <div className="h-screen p-6 lg:flex ">
            
            <div className=" flex flex-col justify-start bg-gradient-to-r from-amber-100 to-amber-200 items-center  h-8/12 p-6 rounded-md mt-15 lg:h-11/12 lg:w-10/12" id="table">
           <div className="overflow-y-scroll  w-full h-3/4">
          {records.length===0?
         <div className="h-full w-full  text-center text-5xl pt-44 [100px]:w-52
         ">Hiç İş Kaydı Yok...</div>
         
          :
      
      <div id="table" className="    ">

<div className="flex" id="editle-container">
<h1>Editle</h1>
<div id="toggle-container" className="w-fit h-fit mb-2 ml-2" onClick={()=>{setIsEdit(!isEdit)}}>
<ToggleButton isOn={isEdit}></ToggleButton>
</div>
</div>
           <table className=" w-full">
                                                   <thead className="border-b-4 border-amber-100 bg-amber-300 ">
                                                        <tr className="">
                                                           <th className="p-2"></th>
                                                           <th className="border-r-2 p-2 border-amber-100  ">Başlangıç Zamanı  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon></th>
                                                           <th className="border-x-2 p-2 border-amber-100">Bitiş Zamanı  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon></th>
                                                           <th className="border-x-2 p-2 border-amber-100">Tarih <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon></th>
                                                           <th className="p-2">Konu <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon></th>
                                                           <th className="p-2"> </th>
           
                                                        </tr>
                                                   </thead> 
                                                   
                                                   <tbody className="">
                                                       
                                         {filteredRecords().map((record:record, index:number) => (
                                           <tr className="border-t-2 h-16 border-amber-100 text-center bg-gradient-to-b from-amber-50 to-amber-100" key={index}>
                                             <td>{isEdit?<button className="cursor-pointer px-1 text-red-500" onClick={()=>{handleDelete(index)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>:<></>}
                                             </td>
                                             <td  className=" border-r-2  border-amber-100  text-center ">
                                              {record.startTime}   </td>  
                                             <td  className=" border-x-2  border-amber-100 text-center">{record.endTime} </td>    
                                             <td  className="border-x-2  border-amber-100  text-center">{record.date} </td>       
                                             <td  className="  text-center">{record.topics} </td>   
                                             <td>
                                                  <button  className="text-2xl cursor-pointer text-blue-500" id="detail-button" onClick={()=>{setIsDetail(true);setSelectedIndex(index)}}>
                                                              {}<FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                                          </button>
                                               </td>  
                                       
                                               
                                           </tr>
                                       
                                           
                                         ))}
                                       </tbody>
                                       
                                                   </table>
           </div>
          }
           </div>
            
               <div className="flex items-end justify-end space-x-8 h-1/4  w-full ">
               <button className="p-3 cursor-pointer scale-150 transition-all duration-300 ease-in-out rounded-4xl
                hover:bg-amber-500    " onClick={()=>{setIsFilter(true)}} >Filtrele 
                <FontAwesomeIcon className="text-sm px-1" icon={faFilter}></FontAwesomeIcon>
                </button>

                <button className="p-3 cursor-pointer scale-150 transition-all duration-300 ease-in-out rounded-4xl
                hover:bg-amber-500    " onClick={()=>{setIsJobAdd(true)}} >İş Ekle 
                <FontAwesomeIcon className="text-sm px-1" icon={faPlus}></FontAwesomeIcon>
                </button>
               </div>
            </div>

            <div  className="flex flex-row h-4/12 py-1 space-x-1 lg:flex lg:flex-col lg:space-y-1 lg:mt-14 lg:w-2/12 lg:px-6" id="cardlar">
            <InfoCard info={analyze?.MostWorkedTopic} header={"En Çok Çalışılan Konu"}></InfoCard>
            <InfoCard info={String(analyze?.totalDay)+''} header={"Toplam Yapılan İş"}></InfoCard>
            <InfoCard info={String(analyze?.totalWorkHour)+' Saat'} header={"Toplam Çalışma Süresi"}></InfoCard>
            <InfoCard info={String(analyze?.averageWorkHour+' Saat')} header={"Ortalama Çalışma Süresi"}></InfoCard>
            <InfoCard info={analyze?.lastAdded} header={"Son Eklenen"}></InfoCard>
            
            </div>
            
       {isJobAdd&& <div className=" fixed  inset-0 bg-[rgba(78,78,35,0.50)]  flex justify-center items-center  z-50 " id="iş-ekle-bilgiler ">
  
  <div id="modal" className="flex flex-col bg-white p-7  rounded-lg relative">
         <button className="absolute top-2 right-2 cursor-pointer" onClick={()=>{setIsJobAdd(false)}}>X</button>
  <h1 className="text-center mb-5 text-xl ">Yeni İş Ekle</h1>
         
        <div className="flex justify-between mb-2 ">
        <label  htmlFor="başlangıç-saati">
             Başlangıç Saati
         </label>
         <input
         className="bg-[#9fa08e] rounded-lg focus:outline-none mb-2 px-2 ml-4 text-sm"
         id="baslangic-saati"
         type="time"
         value={newRecord?.startTime??''}
         onChange={(e) => {
           setNewRecord((prev) =>({
             ...prev,
             startTime: e.target.value,
           }))
         }}
 
 />
        </div>
         <div className="flex justify-between mb-2">
             
         <label  htmlFor="bitiş-saati">
             Bitiş Saati
         </label>
         <input
          className="bg-[#9fa08e] rounded-lg focus:outline-none mb-2 px-2 ml-4 text-sm" 
          type="time" 
          id="bitiş-saati"
          value={newRecord?.endTime??''}
          onChange={(e) => {
            setNewRecord((prev) =>({
              ...prev,
              endTime: e.target.value,
            }))
          }}
          />
         </div>
 
         <div className="flex justify-between mb-2">
         <label  htmlFor="tarih">
             Tarih
         </label>
         <input 
         className="bg-[#9fa08e] rounded-lg focus:outline-none mb-2 px-2 ml-4 text-sm"
          type="Date"
           id="tarih"
           value={newRecord?.date??''}
           onChange={(e) => {
             setNewRecord((prev) =>({
               ...prev,
               date: e.target.value,
             }))
           }}
           />
         </div>
 
         <div className="flex justify-between mb-2">
         <label  htmlFor="konu">
             Konu
         </label>
         <input 
         className="bg-[#9fa08e] rounded-lg focus:outline-none mb-2  px-2 ml-4 text-sm"
          type="text"
           id="konu"
           value={newRecord?.topics??''}
           onChange={(e) => {
             setNewRecord((prev) =>({
               ...prev,
               topics: e.target.value,
             }))
           }}
           />
        
         </div>
         <div className="flex justify-between mb-2">
         <label  htmlFor="konu">
             Detay
         </label>
         <input 
         className="bg-[#9fa08e] rounded-lg focus:outline-none mb-2  px-2 ml-4 text-sm"
          type="text"
           id="detay"
           value={newRecord?.detail??''}
           onChange={(e) => {
             setNewRecord((prev) =>({
               ...prev,
               detail: e.target.value,
             }))
           }}
            />
        
         </div>
       <button onClick={()=>{handleAdd(newRecord);
         setIsJobAdd(false);
       }} className="  hover:bg-amber-500 w-12 h-8 text-center absolute  right-0 bottom-0 text-black  m-1 text-md rounded-full transition-all duration-300 ease-in-out cursor-pointer">
         <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
       </button>
  </div>
 
         </div>}
            <Modal isOpen={isFilter} > 
            <button className="top-1 right-1 p-1 cursor-pointer absolute" id="çıkış" onClick={()=>{setIsFilter(false);
              setEndDate('99999999');
              setStartDate('00000000');
            }}>X</button>
                        <h1 className="text-center text-3xl">Filtreleme</h1>
                        <div id="filtrelemeler" className="m-4">
                        <div className="p-4 space-x-4 flex justify-between  items-center">
                        <label htmlFor="başlangıç"> Başlangıç Tarihi : </label>
                        <input className="border-2 rounded-lg p-1 border-gray-200"  type="date" id="başlangıç" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
                        </div>
                        <div className="p-4 space-x-4 flex justify-between items-center ">
                        <label htmlFor="bitiş"> Bitiş Tarihi : </label>
                        <input className="border-2 rounded-lg p-1 border-gray-200" type="date" id="bitiş" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
                        </div>
                        </div>
                        <button className="bg-blue-300 rounded-full p-3 absolute right-3 bottom-3 " onClick={()=>{setIsFilter(false)}}>Tamam</button>
            </Modal>

            <Modal isOpen={isDetail}>
        <button className="top-1 right-1 p-1 cursor-pointer absolute" id="çıkış" onClick={()=>{setIsDetail(false);
            }}>X</button>
            
            <div>
              <h1 className="text-2xl mb-2">Detaylar</h1>
              {records[selectedIndex]&&              <p>"{records[selectedIndex].detail}"</p>
            }              
            </div>
        </Modal>
            
        </div>
        </div>
    );
}

export default UsersPage;