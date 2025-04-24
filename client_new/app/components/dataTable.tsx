import DataTable from 'react-data-table-component';
import { record } from '../types';
import React, { useState } from 'react';
import { faArrowDown, faFilePdf, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsPDF } from "jspdf";
import {autoTable, Cell} from "jspdf-autotable";
import Modal from './modal';

interface Props {
    records?: record[];
}


const MyDataTable: React.FC<Props> = ({ records }) => {
    const sortIcon = <FontAwesomeIcon icon={faArrowDown} />;
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const [detail,setDetail] = useState<string>('');

    const downloadPDF = () => {
        if (!records || records.length === 0) {
            return;
        }

        const doc = new jsPDF();
        doc.setFont('Josefin_sans');
        const headers = ["Tarih", "Baslangic Saati", "Bitis Saati", "Konu"];
        const rows = records.map(record => [
            record.date,
            record.startTime,
            record.endTime,
            record.topics,
        ]);

        autoTable(doc, {
            head: [headers],
            body: rows,
        });

        doc.save("employee_data.pdf");
    };

    const columns = [
        {
            name: 'Başlangıç Saati',
            selector: (row: record) => row.startTime,
            sortable: true,
        },
        {
            name: 'Bitiş Saati',
            selector: (row: record) => row.endTime,
            sortable: true,
        },
        {
            name: 'Tarih',
            selector: (row: record) => row.date,
            sortable: true,
        },
        {
            name: 'Konu',
            selector: (row: record) => row.topics,
            sortable: true,
        },
        {
            name: 'Detaylar',
            cell : (row:record) => <button onClick={()=>{setDetail(row.detail);setIsDetail(true);}}><FontAwesomeIcon className='bg-blue-500  p-1 rounded-full w-3 text-white cursor-pointer' icon={faInfo}></FontAwesomeIcon></button>
            
        },
    ];
     const customStyles = {
                table:{
                    style: {
                        height: '300px',
                        
                    },
                },
                    rows: {
                        style: {
                          fontSize: '16px', 
                        },
                      },
                      headCells: {
                        style: {
                          fontSize: '16px', 
                          fontWeight: 'bold',
                        },
                      },
                      
                    
                
    
            }

    return (
        <div className="relative">
            <DataTable
                title={"Kayıtlar"}
                columns={columns}
                data={records ?? []}
                pagination
                sortIcon={sortIcon}
                responsive
                paginationRowsPerPageOptions={[5]}
                paginationPerPage={5}
                customStyles={customStyles}
            />
            <button onClick={downloadPDF} className="text-white   cursor-pointer mr-3 items-center space-x-2 w-fit  flex h-fit absolute right-1 top-3 bg-red-500 hover:bg-red-600 rounded-sm p-2">
                
                <h1 className='text-sm min-w-20   '>Export PDF </h1>
                <FontAwesomeIcon className="text-xl ml-1," icon={faFilePdf} />
            </button>
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

export default MyDataTable;