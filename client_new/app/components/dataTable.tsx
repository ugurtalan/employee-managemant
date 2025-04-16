import DataTable from 'react-data-table-component';
import { record } from '../types';
import React from 'react';
import { faArrowDown, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsPDF } from "jspdf";
import {autoTable} from "jspdf-autotable";

interface Props {
    records?: record[];
}


const MyDataTable: React.FC<Props> = ({ records }) => {
    const sortIcon = <FontAwesomeIcon icon={faArrowDown} />;
    

    const downloadPDF = () => {
        if (!records || records.length === 0) {
            return;
        }

        const doc = new jsPDF();
        const headers = ["Tarih", "Başlangıç Saati", "Bitiş Saati", "Konu"];
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
    ];

    return (
        <div className="z-0 relative ">
            <DataTable
                title={"Kayıtlar"}
                columns={columns}
                data={records ?? []}
                pagination
                sortIcon={sortIcon}
                responsive
                paginationRowsPerPageOptions={[5, 10, 15]}
            />
            <button onClick={downloadPDF} className=" cursor-pointer mr-3 items-center space-x-2 w-fit text-xs flex h-fit absolute right-1 top-3 bg-blue-300 rounded-sm p-2">
                
                <h1 className='text-xs min-w-20  '>Export PDF </h1>
                <FontAwesomeIcon className="text-xl ml-1" icon={faFilePdf} />
            </button>
        </div>
    );
};

export default MyDataTable;