import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Col, Card, Row, Form } from 'antd';
import axios from 'axios'; // Axios'ı projenize ekleyin

type RoomType = {
  id: number;
  name: string;
};

interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  singleBedCount: string;
  doubleBedCount: string;
  smoking: string;
  available: string;
}

const NewRoom: React.FC = () => {

  const [newForm] = Form.useForm();
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]); // RoomType[] olarak tanımlanmıştır.


  const [formData, setFormData] = useState<RoomFormData>(
    {
      roomNumber: '',
      available: '',
      singleBedCount: '',
      doubleBedCount: '',
      smoking: '',
      roomTypeId: ''
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ('name' in e.target && 'value' in e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const fetchRoomTypes = async () => {

    try {

      axios.get('http://localhost:8080/api/v1/roomtypes/') // API endpointini uygun şekilde değiştirin
        .then((response) => {
          console.log(response);


          setRoomTypes(response.data);

   




        })
        .catch((error) => {
          console.error('Veri çekme hatası:', error);
        });

    } catch (error) {

      console.error('TRY çekme hatası:', error);

    }

    console.log('glide');

  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      roomTypeId: value, // Seçilen değeri roomTypeId'ye atayın
    });

    console.log(formData);
  };

  const handleSmokingChange = (value: string) => {
    setFormData({
      ...formData,
      smoking: value, // Seçilen değeri roomTypeId'ye atayın
    });

    console.log(formData);
  };

  const handleAvailableChange = (value: string) => {
    setFormData({
      ...formData,
      available: value, // Seçilen değeri roomTypeId'ye atayın
    });

    console.log(formData);
  };

  const handleSubmit = async () => {
    try {
      // Axios ile POST isteği gönderin ve sunucudan dönen response'yi alın
      const response = await axios.post('http://localhost:8080/api/v1/rooms/', {
        roomNumber: formData.roomNumber,
        available: formData.available,
        singleBedCount: formData.singleBedCount,
        doubleBedCount: formData.doubleBedCount,
        smoking: formData.smoking,
        roomType: {
          id: formData.roomTypeId
        },
      });

      // İşlem başarılıysa cevabı kontrol edin ve gerekli işlemleri yapın
      if (response.status === 200) {

        alert('Oda başarıyla oluşturuldu');
        // Formu sıfırlayabilirsiniz
        setFormData({
          roomNumber: '',
          available: '',
          singleBedCount: '',
          doubleBedCount: '',
          smoking: '',
          roomTypeId: '',
        });

        newForm.resetFields();

      }
    } catch (error) {
      console.error('Oda oluşturulurken bir hata oluştu:', error);
      console.log('Bir hata oluştu')
    }
  };

  useEffect(() => {

    fetchRoomTypes()

  }, []);


  return (
    <div>
      <h2>Yeni Oda</h2>
      <Col className="gutter-row" span={24}>
        <Card>
          <Form form={newForm} layout="vertical" id="updateForm" onFinish={handleSubmit}>

            <div style={{ padding: 10 }}>
              <Row gutter={10} >
                <Col span={12} >
                  <Form.Item
                    name="roomNumber"
                    label="Oda Numarası"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      }
                    ]}
                  >
                    <Input name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="roomTypeId"
                    label="Oda Tipi"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      },
                    ]}
                  >
                    <Select
                      onChange={handleSelectChange}
                      placeholder='Seçiniz'
                      options={roomTypes.map((roomType) => ({
                        value: roomType.id.toString(),
                        label: roomType.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item
                    initialValue="0"
                    name="singleBedCount"
                    label="Tek Kişi Yatak Sayısı"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="singleBedCount"
                      value={formData.singleBedCount}
                      onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item
                    initialValue="0"
                    name="doubleBedCount"
                    label="Çift Kişi Yatak Sayısı"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="doubleBedCount"
                      value={formData.doubleBedCount}
                      onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    initialValue="false"
                    name="smoking"
                    label="Sigara İçilebilir?"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Seçiniz'
                      onChange={handleSmokingChange}
                    >
                      <Select.Option value="true">Evet</Select.Option>
                      <Select.Option value="false">Hayır</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    initialValue="true"
                    name="available"
                    label="Müsait?"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Seçiniz'
                      onChange={handleAvailableChange}
                    >
                      <Select.Option value="true">Evet</Select.Option>
                      <Select.Option value="false">Hayır</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Kaydet</Button>
                  </Form.Item>
                </Col>

              </Row>
            </div>

          </Form>
        </Card>
      </Col>
    </div>
  );
};

export default NewRoom;