"use client"
import { useParams } from "next/navigation";
import axios from "axios";
import Modal from "../../components/modal" 
import Navbar from "../../components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {assignment, record} from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faFilter,faInfoCircle,faUser,faSignOut,faClock,faCalendar,faComputer, faTrash,  faSearch, faClose, faCheckCircle,  faBan, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { analyze } from "@/app/types";
import InfoCard from "@/app/components/ınfoCard";
import "../../my.css";
import ReactPaginate from 'react-paginate';
import AssignModal from "../../components/assignModal";
import {Warn,Delete} from "@/app/components/swal";
const UsersPage = ()=>{
    const [name,setName] = useState<string>('');
    const {id} = useParams();
    const [isFilter,setIsFilter] = useState<boolean>(false);
    const [records,setRecords] = useState<record[]>([]);
    const [startDate,setStartDate]  =useState<string>('00000000');
    const [endDate,setEndDate] = useState<string>('99999999');
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const [detail,setDetail] = useState<string>('');
    const [newRecord,setNewRecord] = useState<record>(records[0]||{date:'',startTime:'' ,endTime:'',topics:'',detail:''});
    const [isJobAdd,setIsJobAdd] = useState<boolean>(false);
    const [analyze,setAnalyze] = useState<analyze>();
    const [search,setSearch] = useState<string>("");
    const [isTasks,setIsTasks] = useState<boolean>(false);
    const [assignments,setAssignments] = useState<assignment[]>([]);
    const [assignStartTime,setAssignStartTime] = useState<string>('');
    const [assignEndTime,setAssignEndTime] = useState<string>('');
    const [notificationCount,setNotificationCount] = useState<number>(0);
    const [otoTime ,setOtoTime] = useState<string>('08:00');
    const [otoDate ,setOtoDate] = useState<string>('2024-01-01');



    const pageLength = 7;
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

      
        const handleCompleteAssign = async (taskId:number)=>{
          try {
            const response = await axios.post("http://localhost:5000/user/assignments/complete",{
              userId:id,
              taskId:taskId,
              startTime:assignStartTime,
              endTime: assignEndTime,

            })
            console.log('user assignment data : ',response.data);
            setAssignments(response.data.assignments);
            Warn({title:"başarılı",text:"Görev Tamamlandı",icon:"success"});
          } catch (error) {
            console.log(error);
          }
        }


        useEffect(() => {
          let now = new Date();
          let formattedTime = now.toTimeString().slice(0, 5);
          setOtoTime(formattedTime);
          
          setOtoDate(now.toLocaleDateString().split('.').reverse().join('-'));
          const interval = setInterval(() => {
             now = new Date();
             formattedTime = now.toTimeString().slice(0, 5);
              setOtoTime(formattedTime);
            
            setOtoDate(now.toLocaleDateString().split('.').reverse().join('-'));
          }, 60000
        ); 
      
          return () => clearInterval(interval);
        }, []);
      
        
      


      useEffect(()=>{


          const fetchData = async ()=>{
            try {
              const response = await axios.post("http://localhost:5000/user/assignments",{
                id:id
              })
              console.log(response.data);
              setAssignments(response.data.assignments);
            } catch (error) {
              console.log(error);
            }
          }
          fetchData();
      },[]);




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


      useEffect(() => {
        const count = assignments.reduce((acc, assignment) => {
          return acc + (assignment.seen ? 0 : 1);
        }, 0); 
        console.log("count : " , count);
      console.log("assignments : " , assignments);
        setNotificationCount(count); 
      }, [assignments]);

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

   console.log(Number(newRecord.startTime.slice(0,2)));
   console.log(Number(newRecord.endTime.slice(0,2)));
   
   if(newRecord.date.length===0||newRecord.startTime.length===0||newRecord.endTime.length===0||newRecord.topics.length===0||newRecord.detail.length===0){
    Warn({title:'Hata',text:'Bütün alanlar doldurulmalıdır',icon:'error'})  
    return;
   }
  

   if(Number(newRecord.startTime.slice(0,2))>=Number(newRecord.endTime.slice(0,2))){
    if(Number(newRecord.startTime.slice(0,2))===Number(newRecord.endTime.slice(0,2))){
     if(Number(newRecord.startTime.slice(3,5))>Number(newRecord.endTime.slice(3,5))){
     Warn({title:'Hata',text:'Saat alanları doğru doldurulmalıdır',icon:'error'})  
     return;
     }
   
    }
    else{
    Warn({title:'Hata',text:'Saat alanları doğru doldurulmalıdır',icon:'error'})  
    return;
    }
   }
    
   
    try {
      const response = await axios.post('http://localhost:5000/user/records/add',{
        id:id,
        record:newRecord,
       }) 
       console.log(response.data)
       
       setRecords((prev)=>([...prev,response.data.added]));

       Warn({title:"Başarılı",text:"Ekleme İşlemi Başarılı",icon:"success"});
      
     } catch (error:any) {
      Warn({title:'Hata',text:error.response.data.msg,icon:'error'})
      console.log("iş eklerken hata meydana geldi ", error);
     }
   
   
  }
  async function handleSeen() {

    try {
        const response = await axios.post('http://localhost:5000/user/assignments/checkSeen',{
              userId : id,
      })

      console.log('check : ', response.data.msg);
      setNotificationCount(0);


      } catch (error) {
        
      }
  }

    return(
      <div className="overflow-hidden bg-[#ececf2]">
      <Navbar>
      
      <div id="navbar-comps" className="flex items-center justify-between w-full mr-13 text-white lg:mr-3 ">
          <h1 className="px-2">
          {name}
            <FontAwesomeIcon className="px-2" icon={faUser}></FontAwesomeIcon>
           </h1>
      
          <div id="nav-right" className="flex">
      <div id="görevler" className="relative">

      <button id="tasks" onClick={()=>{setIsTasks(true);
        handleSeen();
      }} className="px-2 cursor-pointer ">
        Görevler
        <FontAwesomeIcon className="px-2" icon={faEnvelope}></FontAwesomeIcon>
      </button>

      {notificationCount>0&&<div className="rounded-full bg-red-500 text-white text-center px-2  text-sm absolute -top-2 right-0">
        {notificationCount}
      </div>}
      </div>

            <Link className="px-2"  href={`/`}>Çıkış Yap
      <FontAwesomeIcon  className="px-2" icon={faSignOut}></FontAwesomeIcon>
      
      </Link>
          </div>
      </div>
    </Navbar>
       <div className="h-screen p-6 lg:flex ">
            
            <div className=" flex flex-col justify-start  items-center  h-9/12 p-6 rounded-md mt-15 bg-[#ececf2] lg:h-11/12 lg:w-10/12" id="table">
      {records.length>0&&      <div id="actions-container" className="flex justify-end  w-full  ">

                <div className="flex " id="actions">

                <div className="pb-1 flex h-9 rounded-2xl  mr-36 lg:mr-80 bg-white hover:bg-[rgb(206,206,211)] " id="search" >
                
                  <label  htmlFor="search-input"></label>

                  
                  <input id="search-input"  value={search} onChange={(e)=>{setSearch(e.target.value)}}   type="text" className=" h-9  focus:outline-none   lg:w-sm p-3 cursor-text transition-all duration-300 ease-in-out rounded-r-2xl" />
                  
                
                  <FontAwesomeIcon className="mt-2 mr-2 " icon={faSearch}></FontAwesomeIcon>
              
                  </div>
              <div className="pb-1" id="buttons">
               <button id="filtrele" className="p-2 px-3 cursor-pointer transition-all duration-300 ease-in-out  rounded-l-md
                bg-gray-400 hover:bg-gray-500 text-white  border-r-2 border-gray-100  " onClick={()=>{setIsFilter(true)}} >Filtrele 
                <FontAwesomeIcon className="text-sm px-1" icon={faFilter}></FontAwesomeIcon>
                </button>

                <button className="p-2 px-3 cursor-pointer transition-all duration-300 ease-in-out rounded-r-md
                 bg-green-500 hover:bg-green-600 text-white " onClick={()=>{setIsJobAdd(true)}} >İş Ekle 
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

        
          <button className="p-5 scale-75   cursor-pointer transition-all duration-300 ease-in-out rounded-sm
                   bg-[#ceced6] hover:bg-[rgb(147,147,153)] border-b-2 border-white" onClick={()=>{setIsJobAdd(true)}} >İş Ekle 

                </button>
         </div>
         
          :
      
      <div id="table-container" className="overflow-x-hidden">




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
                                                       
                                         {paginatedRecords.length===0?<tr className="border-t-2 h-16 border-[#ececf2] text-center text-lg bg-white">
                                          <td>Hiç Veri Yok...</td>
                                          <td>Hiç Veri Yok...</td>
                                          <td>Hiç Veri Yok...</td>
                                          <td>Hiç Veri Yok...</td>
                                          <td>Hiç Veri Yok...</td>
                                          </tr>
                                         :paginatedRecords.map((record:record, index:number) => (
                                           <tr className="border-t-2 h-16 border-[#ececf2] text-center text-lg bg-white" key={index}>
                                             <td  className=" border-r-4  border-[#ececf2]  text-center ">
                                              {record.startTime}   </td>  
                                             <td  className=" border-x-2  border-[#ececf2] text-center">{record.endTime} </td>    
                                             <td  className="border-x-2  border-[#ececf2]  text-center">{record.date} </td>       
                                             <td  className="text-center">{record.topics} </td>   
                                             <td >
                                                  <button  className="px-1 text-2xl cursor-pointer text-blue-500" id="detail-button" onClick={()=>{setIsDetail(true);setDetail(record.detail)}}>
                                                              {}<FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                                          </button>

                                                          <button onClick={()=>{Delete({text:"Silmek istediğinize emin misiniz?",onDelete:()=>handleDelete(index),icon:"warning"})}} className=" px-1 text-2xl cursor-pointer text-red-500" >
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

{records.length>0&&

<ReactPaginate 
          pageCount={Math.ceil(filteredRecords().length/pageLength)}
          onPageChange={(page) => {setPageNumber(page.selected);
            console.log("selecete : ", page.selected);
            console.log("pagenumber : " , pageNumber);
            console.log('ceil : ' , Math.ceil(records.length/pageLength))
          }}
          previousLabel={'← Önceki'}
          nextLabel={'Sonraki →'}
          containerClassName="flex justify-center items-center w-full  mt-2"
          pageClassName=" bg-white rounded mx-1 h-8 items-center flex"
          activeLinkClassName=" bg-blue-400 rounded  h-8 items-center flex"
          pageLinkClassName="p-3 cursor-pointer"
          previousLinkClassName={pageNumber===0?"px-3 py-2 bg-white rounded mx-1 opacity-50":'px-3 py-2 bg-white rounded mx-1 cursor-pointer'}
          nextLinkClassName={pageNumber===Math.ceil(records.length/pageLength)-1?"px-3 py-2 bg-white rounded mx-1 opacity-50":'px-3 py-2 bg-white rounded mx-1 cursor-pointer'}
          breakLabel="..."
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          
          

          
          

          
          ></ReactPaginate>
}
</div>
           </div>
            
               
            </div>

            <div  className="flex flex-row h-3/12 py-1 space-x-1 lg:flex lg:flex-col lg:h-full lg:space-y-1 lg:mt-30 lg:w-2/12 lg:px-6" id="cardlar">
            <InfoCard info={analyze?.totalDay?String(analyze?.totalDay)+'':'0'} header={"Toplam Çalışılan Gün"}></InfoCard>
            <InfoCard info={analyze?.totalWorkHour?String(analyze?.totalWorkHour)+' Saat':'0 Saat'} header={"Toplam Çalışma Süresi"}></InfoCard>
            <InfoCard info={analyze?.averageWorkHour?String(analyze?.averageWorkHour)+' Saat':'0 Saat'} header={"Ortalama Çalışma Süresi"}></InfoCard>
            <InfoCard info={analyze?.lastAdded?analyze?.lastAdded:'Hiç İş Kaydı Yok'} header={"Son Eklenen"}></InfoCard>
            
            </div>
            
      <Modal isOpen={isJobAdd} >
      <div id="header">
         <button className="absolute top-2 right-2 rounded-md  text-gray-400  p-1 w-7 hover:bg-gray-200  hover:text-gray-600 " onClick={()=>{setIsJobAdd(false);
          setNewRecord({date:'',startTime:'' ,endTime:'',topics:'',detail:''})
         }}>X</button>
         <h1 className="opacity-75 text-start mb-5 text-2xl  border-b-2 border-gray-200">Yeni İş Ekle</h1>
         </div>
         <div id="body" className="flex">
        <div className="p-5 space-y-2" id="left">
        <div className="flex flex-col space-y-1 justify-between  ">
        <label  htmlFor="baslangic-saati">
             Başlangıç Saati:
         </label>
         <input
         className="bg-gray-100 p-2 rounded-md focus:outline-none  text-sm"
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
         <div className="flex flex-col space-y-1 justify-between ">
             
         <label  htmlFor="bitiş-saati">
             Bitiş Saati:
         </label>
         <input
          className="bg-gray-100 p-2 rounded-md focus:outline-none   text-sm" 
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
 
         
         
        </div>
        <div id="right" className="p-5  space-y-2">
        <div className="flex flex-col space-y-1 justify-between  w-xs">
         <label  htmlFor="tarih">
             Tarih:
         </label>
         <input 
         className="bg-gray-100 p-2 rounded-md focus:outline-none  text-sm"
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
 
         <div className="flex flex-col space-y-1 justify-between ">
         <label  htmlFor="konu">
             Konu:
         </label>
         <input 
        placeholder="Lütfen konuyu buraya yazın"
        className="bg-gray-100 p-2 rounded-md focus:outline-none  text-sm"
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
       

     
        </div>
        </div>
        
      <div className="px-0.5 space-y-3" id="footer">
      <div className="flex flex-col space-y-1 p-5 ">
         <label  htmlFor="detay">
             Detay:
         </label>
         <textarea
         placeholder="Lütfen detayları buraya yazın"
         className="bg-gray-100 p-2 rounded-md  focus:outline-none resize-y h-52   text-base  "
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
       }} className="   w-full h-8 text-center  text-white  bg-blue-500  text-md rounded-md transition-all duration-300 ease-in-out cursor-pointer">
        Gönder
       </button>
      </div>
 
      </Modal>
            <Modal isOpen={isFilter} > 
            <div id="header">
            <button className="top-1 right-1  rounded-md  p-1 w-7 hover:bg-gray-200  hover:text-gray-600 absolute" id="çıkış" onClick={()=>{setIsFilter(false);
              setEndDate('99999999');
              setStartDate('00000000');
            }}>X</button>
                        <h1 className="text-start text-2xl border-b-2 border-gray-200 opacity-75">Filtreleme</h1>
            </div>
                        <div id="body" className=" w-sm p-4 space-y-2">
                        <div className=" flex  flex-col">
                        <label htmlFor="başlangıç"> Başlangıç Tarihi : </label>
                        <input className="border-2 rounded-lg p-2 border-gray-200"  type="date" id="başlangıç" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
                        </div>
                        <div className=" flex  flex-col">
                        <label htmlFor="bitiş"> Bitiş Tarihi : </label>
                        <input className="border-2 rounded-lg p-2 border-gray-200" type="date" id="bitiş" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
                        </div>
                        </div>
                        <div id="footer">
                        <button className="bg-blue-400 rounded-md p-0.5 w-full text-white cursor-pointer
                         " onClick={()=>{setIsFilter(false)}}>Tamam</button>

                        </div>
                        </Modal>

            <AssignModal isOpen={isDetail} >
                    <div className='max-w-96 whitespace-normal break-words' id='container'>
                        <div className='opacity-80 flex border-b-2 border-gray-200 p-2 text-2xl ' id='header'> 
                                <h1 className="opacity-75">Detaylar</h1>
                                <button className='rounded-md  text-gray-400  p-1 w-7 hover:bg-gray-200  hover:text-gray-600 absolute right-0 top-0 ' onClick={()=>{setIsDetail(false)}}>X</button>
                        </div>
                        <div className='' id='body'>
                                <p className=' border-b-2 border-gray-200 p-2'>{detail}</p>
                        </div>
                        <div  id='footer'> 

                            
                        </div>


                        </div>
                </AssignModal>

            <Modal isOpen={isTasks}>
              <div id="gen-container" className="relative" >
              <button onClick={()=>{setIsTasks(false)}} className=" absolute rounded-md  text-gray-400  p-1 w-7 hover:bg-gray-100  hover:text-gray-600 top-1 right-0"><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></button>
                <div id="header" className="flex w-[750px] h-fit justify-between p-2 ">
                  <h1 className="text-2xl text-start w-full pb-3 border-b-2 border-gray-200 opacity-75">Görevler</h1>
                  
                </div>

                {assignments.length>0&&assignments.some((assignment)=>!assignment.isCompleted)?
                    <div id="table-container" className="">
                    <table className=" rounded-md  w-full bg-[#ececf9]">
                      <thead>
                       <tr>
                       <th className="opacity-75 p-1 font-light text-sm border-b-2 border-r-2 border-white">Tarih</th>
                        <th className="opacity-75 p-1 font-light text-sm  border-b-2 border-r-2 border-white">Kimden</th>
                        <th className="opacity-75 p-1 font-light text-sm border-b-2 border-r-2 border-white">Konu</th>
                        <th className="opacity-75 p-1 font-light text-sm border-b-2  border-white">İşlemler</th>
                    
                        </tr>
                        
                          </thead>

                      <tbody>
                        {assignments.map((assignment,index)=>assignment.isCompleted?null:(
                          <tr key={index} className="text-center border-b-2 border-white bg-[#f5f5fa]">
                            <td className=" p-1 border-r-2 border-white">{assignment.assignmentDate}</td>
                            <td className=" p-1 border-r-2 border-white">{assignment.fromWho}</td>
                            <td className=" p-1 border-r-2 border-white">{assignment.topic}</td>
                            <td className="p-1 flex space-x-2 justify-center"> 
                              <button ><FontAwesomeIcon className="text-green-400 cursor-pointer" icon={faCheckCircle} onClick={()=>{handleCompleteAssign(assignment.id)}}></FontAwesomeIcon></button>
                              <button><FontAwesomeIcon className="text-blue-400 cursor-pointer" icon={faInfoCircle} onClick={()=>{setDetail(assignment.details);setIsDetail(true);}}></FontAwesomeIcon></button>
                            </td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
              </div>
             :
             <div className="text-center "><h1>Hiç Görev Yok</h1>
             <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
             </div>          }
              </div>
            </Modal>
            
        </div>
        </div>
    );
}

export default UsersPage;