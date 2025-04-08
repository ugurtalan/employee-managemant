import DataTable from 'react-data-table-component';
import { record } from '../types';
import React  from 'react';
import { faArrowDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface Props {
	records?: record[];
  }

  interface props {
	data : record;
  }

const MyDataTable: React.FC<Props>=({records}) =>{
	const sortIcon = <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
	const ExpandedComponent = ({ data }:props ) => {
		return <p>{data.detail}</p>;
	  };
	  
	const columns = [
		{
			name: 'Başlangıç Saati',
			selector: (row:record) => row.startTime,
			sortable:true,
		},
		{
			name: 'Bitiş Saati',
			selector: (row:record) => row.endTime,
			sortable:true,
		},
		{
			name: 'Tarih',
			selector: (row:record) => row.date,
			sortable:true,
		},
		{
			name: 'Konu',
			selector: (row:record) => row.topics,
			sortable:true,
		},
		
	];
	
	
	return (
		<div className='-z-20'>
			<DataTable
			columns={columns}
			data={records ?? []}
			pagination
			sortIcon={sortIcon}
			responsive
			expandableRows
			expandableRowsComponent={ExpandedComponent}
			paginationRowsPerPageOptions={[5,10,15]}

			
			
		/>
		</div>
	);
};

export default MyDataTable;