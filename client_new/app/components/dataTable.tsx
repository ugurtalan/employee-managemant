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

interface PropsDetail {
    data: record;
}

const MyDataTable: React.FC<Props> = ({ records }) => {
    const sortIcon = <FontAwesomeIcon icon={faArrowDown} />;
    
    const ExpandedComponent = ({ data }: PropsDetail) => {
        return <p>{data.detail}</p>;
    };

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
                columns={columns}
                data={records ?? []}
                pagination
                sortIcon={sortIcon}
                responsive
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                paginationRowsPerPageOptions={[5, 10, 15]}
            />
            <button onClick={downloadPDF} className="bg-white cursor-pointer w-10 text-2xl h-10 absolute right-1 top-1">
                <FontAwesomeIcon icon={faFilePdf} />
            </button>
        </div>
    );
};

export default MyDataTable;
