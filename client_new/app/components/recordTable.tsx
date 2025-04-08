import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { record } from '../types';

interface Props {
  records?: record[];
}

const RecordTable: React.FC<Props> = ({ records  }) => {
  // Gelen kayıtları gösterime uygun hale getiriyoruz
  const newRecords = records?.map(record => ({
    date: record.date,
    startTime: record.startTime,
    endTime: record.endTime,
    topics: record.topics,
  }));

  // Başlık kısmı; Tailwind sınıfları ile stilize edilmiştir
  const header = (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
      <h1 className="text-xl font-semibold">İş Kayıtları</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-colors">
        Ekle
      </button>
    </div>
  );

  return (
    <div>
      <DataTable
        value={newRecords}
        paginator
        rows={2}
        // paginatorTemplate: Hangi kontrollerin hangi sırayla görüneceğini belirtiyoruz
        // currentPageReportTemplate: Gösterilecek sayfa raporu şablonu
        // DataTable genel stil için ek Tailwind sınıfı
      >
        <Column field="date" header="Tarih" className="text-center font-medium" />
        <Column field="startTime" header="Başlangıç Saati" className="text-center font-medium" />
        <Column field="endTime" header="Bitiş Saati" className="text-center font-medium" />
        <Column field="topics" header="Konu" className="text-center font-medium" />
      </DataTable>
    </div>
  );
};

export default RecordTable;
