import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface RoomData {
  id: number;
  roomNumber: string;
  singleBedCount: number;
  doubleBedCount: number;
  roomType: {
    id: number;
    name: string;
  };
  smoking: boolean;
  available: boolean;
}



const ListRoom: React.FC = () => {

  const [listFilter, setListFilter] = useState({});

  const [data, setData] = useState<RoomData[]>([]);
  const [changed, setChanged] = useState(false);


  const columns: ColumnsType<RoomData> = [
    {
      title: 'Oda Numarası',
      dataIndex: 'roomNumber',
    },
    {
      title: 'Single Yatak Sayısı',
      dataIndex: 'singleBedCount',
    },
    {
      title: 'Double Yatak Sayısı',
      dataIndex: 'doubleBedCount',
    },
    {
      title: 'Oda Tipi',
      dataIndex: 'roomType',
      render: (roomType) => roomType.name,
    },
    {
      title: 'Sigara İçilebilir?',
      dataIndex: 'smoking',
      render: (smoking) => (smoking ? 'Evet' : 'Hayır'),
    },
    {
      title: 'Müsait?',
      dataIndex: 'available',
      render: (available) => (available ? 'Evet' : 'Hayır'),
    },
    {
      align: 'center' as const,
      width: '5%',
      render: (record) => (
        <Link to={`/editroom/${record.id}`}>
            <Button key={`show-${record.id}`} type="default" icon={<EditOutlined />} ></Button>
        </Link>

      ),
    },
    {
      align: 'center' as const,
      width: '5%',
      render: (text, record) => (
        <Popconfirm
          title="Bu kaydı, silmek istediğinizden emin misiniz?"
          description="Dikkat, bu işlem oda bilgilerinizi ve ilişkili tüm hareketleri de silecektir!"
          onConfirm={() => { handleDeleteRoom(record.id) }}
          okText="Sil"
          cancelText="Kapat"
        >
          <Button key={`show-${record.id}`} type="default" icon={<DeleteOutlined />} ></Button>
        </Popconfirm>
      ),
    }
  ];


  const handleDeleteRoom = (_id: number) => {
    // Silme işlemi için Axios DELETE isteği gönderin
    axios.delete(`http://localhost:8080/api/v1/rooms/${_id}`)
      .then((response) => {
        if (response.status === 204) {
          handleFetchTableData()

        }
      })
      .catch((error) => {
        console.error('Oda silinirken bir hata oluştu:', error);
      });
  }

  const handleFetchTableData = async () => {

    try {
      axios.get('http://localhost:8080/api/v1/rooms/') // API endpointini uygun şekilde değiştirin
      .then((response) => {
        setData(response.data); // Veriyi state'e ekleyin
        console.log(response)
        
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
    } catch (error) {
      console.error('TRY çekme hatası:', error);
    }
  
    console.log('glide');

  }



  useEffect(() => {
    handleFetchTableData()
  }, []);

  const onChange: TableProps<RoomData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table columns={columns}
    dataSource={data.map(item => ({ ...item, key: item.id.toString() }))}
    onChange={onChange}
    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] }}
    />;
};

export default ListRoom;
