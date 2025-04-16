"use client"
import { useParams } from "next/navigation";
import axios from "axios";
import Modal from "../../components/modal" 
import Navbar from "../../components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {record} from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faAdd,faFilter,faInfoCircle,faUser,faSignOut,faHome,faClock,faCalendar,faComputer, faTrash, faArrowDown, faEye, faInfo, faSearch, faPersonHiking} from "@fortawesome/free-solid-svg-icons";
import { analyze } from "@/app/types";
import InfoCard from "@/app/components/ınfoCard";
import "../../my.css";
import ReactPaginate from 'react-paginate';
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
    const [search,setSearch] = useState<string>("");
    const pageLength = 1;
    const [pageNumber,setPageNumber] = useState<number>(0);
    
    const filteredRecords = () => {
      return records.filter((record) => {
          const recordDate = Number(record.date.replace(/-/g,"")); 
          const startDate1 = Number(startDate.replace(/-/g,""));
          const endDate1 = Number(endDate.replace(/-/g,""));
          const name = record.topics;
          return recordDate >= startDate1 && recordDate <= endDate1 && (search.length!==0?name.toLowerCase().startsWith(search):true) ;

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

     
      
      const paginatedRecords = filteredRecords().slice(pageLength*pageNumber,(pageLength*pageNumber)+pageLength)

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
      <div className="overflow-hidden bg-[#ececf2]">
      <Navbar>
      <div id="isim" className="flex items-center justify-center mr-13 text-white lg:mr-3 ">
     
          <h1>
          {name}
            <FontAwesomeIcon className="pr-3 pl-1" icon={faUser}></FontAwesomeIcon>
           </h1>

            <Link   href={`/`}>Çıkış Yap
      <FontAwesomeIcon  className="px-2" icon={faSignOut}></FontAwesomeIcon>
      
      </Link>
      </div>
    </Navbar>
       <div className="h-screen p-6 lg:flex ">
            
            <div className=" flex flex-col justify-start  items-center  h-8/12 p-6 rounded-md mt-15 bg-[#ececf2] lg:h-11/12 lg:w-10/12" id="table">
      {records.length>0&&      <div id="actions-container" className="flex justify-end  w-full  ">

                <div className="flex " id="actions">

                <div className="pb-1 flex h-9 rounded-2xl  mr-36 lg:mr-80 bg-white hover:bg-[rgb(206,206,211)] " id="search" >
                
                  <label   htmlFor="input"></label>
                  
                  <input value={search} onChange={(e)=>{setSearch(e.target.value)}} id="input"  type="text" className=" h-9  focus:outline-none   lg:w-sm p-3 cursor-text transition-all duration-300 ease-in-out rounded-r-2xl
                  " />
                <FontAwesomeIcon className="mt-2 mr-2 " icon={faSearch}></FontAwesomeIcon>

              
                  </div>
              <div className="pb-1" id="buttons">
               <button id="filtrele" className="p-2 px-3 cursor-pointer transition-all duration-300 ease-in-out  rounded-2xl
                 bg-blue-400 hover:bg-blue-500   " onClick={()=>{setIsFilter(true)}} >Filtrele 
                <FontAwesomeIcon className="text-sm px-1" icon={faFilter}></FontAwesomeIcon>
                </button>

                <button className="p-2 px-3 cursor-pointer transition-all duration-300 ease-in-out  rounded-2xl
                  hover:bg-green-500 bg-green-400 " onClick={()=>{setIsJobAdd(true)}} >İş Ekle 
                <FontAwesomeIcon className="text-sm px-1" icon={faPlus}></FontAwesomeIcon>
                </button>
               </div>
                  

                </div>
                  
                  
                </div>
               }
           <div className="overflow-y-visible  w-full h-3/4">
          {records.length===0?
         <div className="h-full w-full space-y-5  text-center text-5xl pt-44 [100px]:w-52
         "><h1>Hiç İş Kaydı Yok...</h1>

         <p className="animate-bounce">
          <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
         </p>
          <button className="p-5 scale-75   cursor-pointer transition-all duration-300 ease-in-out rounded-sm
                   bg-[#ECECF2] hover:bg-[rgb(206,206,211)] border-b-2 border-white" onClick={()=>{setIsJobAdd(true)}} >İş Ekle 

                </button>
         </div>
         
          :
      
      <div id="table-container" className="overflow-x-hidden">

{/**<div className="flex" id="editle-container">
<h1>Editle</h1>
<div id="toggle-container" className="w-fit h-fit mb-2 ml-2" onClick={()=>{setIsEdit(!isEdit)}}>
<ToggleButton isOn={isEdit}></ToggleButton>
</div>
</div>*/ }


           <table className=" w-full ">
                                                   <thead className="border-b-4 border-[#ececf2] bg-[#f5f5fa] text-lg">
                                                        <tr className="">
                                                           <th className="border-r-2 p-2 border-[#ececf2]  ">Başlangıç Zamanı  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon></th>
                                                           <th className="border-x-2 p-2 border-[#ececf2]">Bitiş Zamanı  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon></th>
                                                           <th className="border-x-2 p-2 border-[#ececf2]">Tarih <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon></th>
                                                           <th className="p-2">Konu <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon></th>
                                                           <th className="p-2">Aksiyonlar</th>
                                                           
           
                                                        </tr>
                                                   </thead> 
                                                   
                                                   <tbody className="">
                                                       
                                         {paginatedRecords.map((record:record, index:number) => (
                                           <tr className="border-t-2 h-16 border-[#ececf2] text-center text-lg bg-white" key={index}>
                                             <td  className=" border-r-4  border-[#ececf2]  text-center ">
                                              {record.startTime}   </td>  
                                             <td  className=" border-x-2  border-[#ececf2] text-center">{record.endTime} </td>    
                                             <td  className="border-x-2  border-[#ececf2]  text-center">{record.date} </td>       
                                             <td  className="text-center">{record.topics} </td>   
                                             <td >
                                                  <button  className="px-1 text-2xl cursor-pointer text-blue-500" id="detail-button" onClick={()=>{setIsDetail(true);setSelectedIndex(index)}}>
                                                              {}<FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                                          </button>

                                                          <button onClick={()=>{handleDelete(index)}} className=" px-1 text-2xl cursor-pointer text-red-500" >
                                                                {}<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>

                                                          </button>
                                               </td>  
                                       
                                               
                                           </tr>
                                       
                                           
                                         ))}
                                       </tbody>
                                       
                                                   </table>


           </div>
          }

<div className="">

<ReactPaginate 
          pageCount={Math.ceil(records.length/pageLength)}
          onPageChange={(page) => {setPageNumber(page.selected)}}
          previousLabel={'← Önceki'}
          nextLabel={'Sonraki →'}
          containerClassName="flex justify-center items-center w-full mt-2"
          pageClassName=" border rounded mx-1 py-1 flex"
          activeClassName="bg-blue-500" 
          activeLinkClassName="p-3 cursor-pointer"
          pageLinkClassName="p-3 cursor-pointer"
          previousLinkClassName="px-3 py-2 mx-1 border rounded cursor-pointer"
          nextLinkClassName="px-3 py-2 border rounded mx-1 cursor-pointer"
          breakLabel="..."
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}

          
          

          
          ></ReactPaginate>
</div>
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
            
            <div className="text-center">
              <FontAwesomeIcon  className="animate-ping my-3 scale-125" icon={faInfoCircle}></FontAwesomeIcon>
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