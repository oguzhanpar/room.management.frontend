import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Col, Card, Row, Form } from 'antd';
import axios from 'axios'; // Axios'ı projenize ekleyin



interface RoomTypeFormData {
  name: string;
}

const NewRoom: React.FC = () => {

  const [newForm] = Form.useForm();


  const [formData, setFormData] = useState<RoomTypeFormData>(
    {
      name: ''
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



  const handleSubmit = async () => {
    try {
      // Axios ile POST isteği gönderin ve sunucudan dönen response'yi alın
      const response = await axios.post('http://localhost:8080/api/v1/roomtypes/', {
        name: formData.name,
      });

      // İşlem başarılıysa cevabı kontrol edin ve gerekli işlemleri yapın
      if (response.status === 200) {

        alert('Oda tipi başarıyla oluşturuldu');
        // Formu sıfırlayabilirsiniz
        setFormData({
          name: ''
        });

        newForm.resetFields();

      }
    } catch (error) {
      console.error('Oda tipi oluşturulurken bir hata oluştu:', error);
      console.log('Bir hata oluştu')
    }
  };




  return (
    <div>
      <h2>Yeni Oda Tipi</h2>
      <Col className="gutter-row" span={24}>
        <Card>
          <Form form={newForm} layout="vertical" id="updateForm" onFinish={handleSubmit}>

            <div style={{ padding: 10 }}>
              <Row gutter={10} >
                <Col span={12} >
                  <Form.Item
                    name="name"
                    label="Oda Tipi Adı"
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan zorunludur',
                      }
                    ]}
                  >
                    <Input name="name"
                      value={formData.name}
                      onChange={handleInputChange} />
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