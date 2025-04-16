import DataTable from 'react-data-table-component';
import { assignment, record } from '../types';
import React, { useState } from 'react';
import {  faArrowDown,  faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './modal';

interface Props {
    assignments?: assignment[];
}


const MyAssignedDataTable: React.FC<Props> = ({ assignments }) => {
    const sortIcon = <FontAwesomeIcon icon={faArrowDown} />;
    const [isAssign,setIsAssign] = useState<boolean>(false);
    console.log("table iç  : ", assignments);
    
    
    const columns = [
        {
            name: 'Kime Verildi',
            selector: (row: assignment) => row.toWho,
            sortable: true,
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
    ];


        const customStyles = {
            table:{
                style: {
                    width: '400px',
                }
            }
        }
    function handleDutyAssignment() {

    }

    return (
        <div className="z-0 relative ">
            <DataTable
                title={"Atanan Görevler"}
                columns={columns}
                data={assignments ?? []}
                pagination
                sortIcon={sortIcon}
                responsive
                paginationRowsPerPageOptions={[5, 10, 15]}
                customStyles={customStyles}
                
            />
            <button id='görev-ata-buton' onClick={()=>{setIsAssign(true)}}  className="cursor-pointer mr-3 items-center space-x-2 w-fit text-xs flex h-fit absolute right-1 top-3 bg-blue-300 rounded-sm p-2">
                 <h1 className='text-xs min-w-20  '>Görev Ata </h1>
                <FontAwesomeIcon className="text-xl ml-1" icon={faTasks} />
                            
                </button>

                <Modal isOpen={isAssign}>
                    <div id='gen-container'>
                        <button onClick={()=>{setIsAssign(false)}}>C</button>
                    </div>
                </Modal>
        </div>
    );
};

export default MyAssignedDataTable;