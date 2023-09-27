import React, { useState, useEffect } from 'react';
import { Input, Button, Col, Card, Row, Form } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // React Router'dan useParams'i içe aktarın

interface RoomTypeFormData {
    name: string;
}

const EditRoomType: React.FC = () => {

    const [updateForm] = Form.useForm();


    const { id }: { id?: string } = useParams(); // URL'den id'yi alın
    
    const [formData, setFormData] = useState<RoomTypeFormData>({
            name: '',
        });

    useEffect(() => {
        // Burada id'yi kullanarak verileri çekebilirsiniz
        axios.get(`http://localhost:8080/api/v1/roomtypes/${id}`)
            .then((response) => {
                const roomTypeData = response.data;
                console.log(roomTypeData);

                // Verileri formData içine yerleştirin
                setFormData({
                    name: roomTypeData.name,
                });

                updateForm.setFieldsValue({
                    name: roomTypeData.name, // Form alanlarını güncel verilerle doldurun
                });

               
            })
            .catch((error) => {
                console.error('Veri çekme hatası:', error);
            });





    }, [id]); // id bağımlılığını ekleyin

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
            // Axios ile PUT isteği gönderin ve sunucudan dönen response'yi alın
            const response = await axios.put(`http://localhost:8080/api/v1/roomtypes/${id}`, {
                name: formData.name,
            });

            // İşlem başarılıysa cevabı kontrol edin ve gerekli işlemleri yapın
            if (response.status === 200) {
                alert('Oda tipi başarıyla güncellendi');
            }
        } catch (error) {
            console.error('Oda tipi güncellenirken bir hata oluştu:', error);
        }
    };

    return (
        <div>
            <h2>{formData.name} - Oda Tipi Düzenle</h2>
            <Col className="gutter-row" span={24}>
                <Card>
                    <Form form={updateForm} layout="vertical" id="updateForm" onFinish={handleSubmit}>
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
                                        <Button type="primary" htmlType="submit">Güncelle</Button>
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

export default EditRoomType;
