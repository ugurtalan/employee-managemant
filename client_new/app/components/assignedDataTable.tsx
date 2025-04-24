import DataTable from 'react-data-table-component';
import { assignment, employee, record } from '../types';
import React, { useEffect, useState } from 'react';
import {  faArrowDown,  faInfo,  faTasks, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './modal';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import { Delete, Warn } from './swal';

interface Props {
    employee:employee;
}


const MyAssignedDataTable: React.FC<Props> = ({employee }) => {
    const{id} = useParams();
    const params = useSearchParams();
    const name = params.get('name');
    const[detail,setDetail] = useState<string>('');
    const [isDetail,setIsDetail] = useState<boolean>(false);
const [assignments,setAssignments] = useState<assignment[]>();

    console.log('İD : ', id);
    
    console.log('EMPLOYEE : ',employee);
    console.log('ASSİGNMENTS : ', assignments);
    const sortIcon = <FontAwesomeIcon icon={faArrowDown} />;
    const [isAssign,setIsAssign] = useState<boolean>(false);
    const [newAssign,setNewAssign] = useState<assignment>({topic:'',assignmentDate:'',details:'',toWho:'',fromWho:'',isCompleted:false,id:0,seen:false});
    console.log("table iç  : ", assignments);
    
    
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

    async function handleDeleteAssign(rowId:number) {
    
        try {
            const response =await  axios.post('http://localhost:5000/admin/assignments/delete',{
                id:rowId,
                empId:employee.id,
                adminId:id,
            })
            console.log(response);
            setAssignments(response.data.newAssignments);
            
            if(response.status===200){
            Warn({title:'Başarılı',text:'Silme İşlemi Başarılı ',icon:'success'})
                
            }
        } 
            
        catch(error) {
            Warn({title:'Hata',text:'Silme İşlemi Başarısız ',icon:'error'})

            console.log(error);
        }
    }
    


    useEffect(() => {
        if (isAssign || isDetail) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        
          return () => {
            document.body.style.overflow = '';
          };
      }, [isAssign,isDetail]);


    const columns = [
        
        {
                
            name: 'Admin',
            selector: (row: assignment) => row.fromWho,
            sortable: true,
        },
       
        {
            name: 'İş durumu',
            cell: (row: assignment) => <div className={`${row.isCompleted?'text-green-500':'text-red-500'} font-bold`}>
                    {row.isCompleted?'Tamamlandı':'Tamamlanmadı'}
            </div>,
            
        },

       
        {
            name: 'Verildiği Tarih',
            selector: (row: assignment) => row.assignmentDate,
            sortable: true,
        },
        {
            name: 'Konu',
            selector: (row: assignment) => row.topic,
            sortable: true,
            
        },
        {
            name: 'İşlemler',
            cell: (row: assignment) => <div className='flex space-x-1'>
                    <button onClick={()=>{setDetail(row.details);setIsDetail(true);}}><FontAwesomeIcon className='bg-blue-500  p-1 rounded-full w-3 text-white cursor-pointer' icon={faInfo}></FontAwesomeIcon></button>
                    <button onClick={()=>{Delete({text:'Silmek İstediğinize emin misiniz?',onDelete:()=>{handleDeleteAssign(row.id)},icon:'warning'})}}><FontAwesomeIcon className='bg-red-500 p-1 w-3 rounded-full text-white cursor-pointer' icon={faTrash}></FontAwesomeIcon></button>
            </div>
        }
    ];
        

        const customStyles = {
            table:{
                style: {
                    height: '300px'
                },
            },
            rows: {
                style: {
                    fontSize: '16px', 
                    '&:hover': {
                  backgroundColor: '#e5e7eb',
                },
                }
            },
          
              headCells: {
                style: {
                  fontSize: '16px', 
                  fontWeight: 'bold',
                },
              },
              
            

        }

       
 async  function handleDutyAssignment(e:React.FormEvent) {
    e.preventDefault();
    if(newAssign.details.length===0||newAssign.topic.length===0){
        Warn({title:'Hata',text:'Lütfen hiçbir alanı boş bırakmayınız',icon:'warning'});
        return;
    }
   
    console.log(new Date().toLocaleString());      
    console.log('new ASsign : ' ,newAssign);
    try {
                    const response = await axios.post('http://localhost:5000/admin/assignments/add',{
                        adminId:id,
                        employee:employee,
                        assign:newAssign,
                        date:new Date().toLocaleString(),

                        
                    });
                    setAssignments(response.data.newAssignments);
                    console.log(response.data)
                    
                    if(response.status===200)
                        {Warn({title:'Başarılı',text:'Görev ataması başarılı',icon:'success'});
                        }
                } catch (error) {

                console.log(error);
            }


    }

useEffect(()=>{
console.log("ADMİN NAME : ", assignments?.[0]?.fromWho);
},[assignments])

    return (
        <div className=" relative   ">
            <DataTable
                title={"Atanan Görevler"}
                columns={columns}
                data={assignments ?? []}
                pagination
                sortIcon={sortIcon}
                responsive
                paginationRowsPerPageOptions={[5]}
                paginationPerPage={5}
                customStyles={customStyles}
                onRowClicked={(row,FormEvent)=>{setDetail(row.details)}}
                
                
            />
            <button id='görev-ata-buton' onClick={()=>{setIsAssign(true);
               
            }}  className="cursor-pointer mr-3 items-center space-x-2 w-fit text-xs flex h-fit absolute right-1 top-3 bg-blue-600 text-white hover:bg-blue-700 rounded-sm p-2">
                 <h1 className='text-sm min-w-20  '>Görev Ata </h1>
                <FontAwesomeIcon className="text-xl ml-1" icon={faTasks} />
                            
                </button>
                <Modal isOpen={isAssign}>
                    <div className='w-96 h-full z-50 relative ' id='gen-container'>
                        
                        <div id='header' className='flex w-full px-2 py-1 text-2xl  justify-between items-center border-b-2 border-gray-200' >
                            <h1 className='opacity-75'>
                                Yeni Görev Ata
                            </h1>



                        <button className='rounded-md  text-gray-400  p-1 w-7 hover:bg-gray-200 text-sm  absolute right-0 top-0' onClick={()=>{setIsAssign(false)}}>X</button>


                        </div>

                        <div  id='body'>
                               <form  onSubmit={(e)=>{handleDutyAssignment(e)}}>
                                    <div className='p-2 flex flex-col' id='topic-container'>
                                        <label htmlFor="topic-input">Konu</label>
                                    <input 
   className='bg-gray-100 rounded-md focus:outline-none p-2'    
   placeholder='Lütfen konuyu buraya yazın'                             
  id='topic-input'
  type="text" 
  value={newAssign.topic} 
  onChange={(e) => {
    setNewAssign((prev) => {
      return {
        ...prev,
        topic: e.target.value
      };
    });
  }} 
/>
                                    </div>
                                    <div className='p-2 flex flex-col ' id='detail-container'>
                                        <label htmlFor='detail-input'>Detaylar</label>
                                    <textarea  
                                     id='detail-input'
                                     value={newAssign.details} 
                                     onChange={(e) => {
                                       setNewAssign((prev) => {
                                         return {
                                           ...prev,
                                           details: e.target.value
                                         };
                                       });
                                     }} 
                                      className="w-full p-4 h-72  bg-gray-100 rounded-lg  resize-y focus:outline-none"
        placeholder="Lütfen detayları buraya yazın "
                                    >
                                    
                                    </textarea>
                                    </div>

                                    <button className='bg-blue-400 hover:bg-blue-500  cursor-pointer w-full p-1 text-white rounded-md mt-5' type='submit'>Gönder</button>
                               </form>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={isDetail} >
                    <div className='max-w-96 w-xs whitespace-normal break-words' id='container'>
                        <div className='opacity-80 flex border-b-2 border-gray-200 p-2 text-2xl ' id='header'> 
                                <h1 className='opacity-75'>Detaylar</h1>
                                <button className='rounded-md  text-gray-400  p-1 w-7 text-sm hover:bg-gray-200 absolute right-0 top-0 ' onClick={()=>{setIsDetail(false)}}>X</button>
                        </div>
                        <div className='' id='body'>
                                <p className='  p-2'>{detail}</p>
                        </div>
                        


                        </div>
                </Modal>
        </div>
    );
};

export default MyAssignedDataTable;

