import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface RoomTypeData {
  id: number;
  name: string;
}

const ListRoom: React.FC = () => {

  const [data, setData] = useState<RoomTypeData[]>([]);

  const columns: ColumnsType<RoomTypeData> = [
    {
      title: 'Oda Tipi',
      dataIndex: 'name',
    },
    {
      align: 'center' as const,
      width: '5%',
      render: (record) => (
        <Link to={`/editroomtype/${record.id}`}>
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
          onConfirm={() => { handleDeleteRoomType(record.id) }}
          okText="Sil"
          cancelText="Kapat"
        >
          <Button key={`show-${record.id}`} type="default" icon={<DeleteOutlined />} ></Button>
        </Popconfirm>
      ),
    }
  ];


  const handleDeleteRoomType = (_id: number) => {
    // Silme işlemi için Axios DELETE isteği gönderin
    axios.delete(`http://localhost:8080/api/v1/roomtypes/${_id}`)
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
      axios.get('http://localhost:8080/api/v1/roomtypes/') // API endpointini uygun şekilde değiştirin
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

  const onChange: TableProps<RoomTypeData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table columns={columns}
    dataSource={data.map(item => ({ ...item, key: item.id.toString() }))}
    onChange={onChange}
    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] }}
    />;
};

export default ListRoom;
