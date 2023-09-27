import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Col, Card, Row, Form } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // React Router'dan useParams'i içe aktarın

interface RoomFormData {
    roomNumber: string;
    roomTypeId: string;
    singleBedCount: string;
    doubleBedCount: string;
    smoking: string;
    available: string;
}

const EditRoomType: React.FC = () => {

    const [updateForm] = Form.useForm();


    const { id }: { id?: string } = useParams(); // URL'den id'yi alın
    
    const [formData, setFormData] = useState<RoomFormData>({
            roomNumber: '',
            available: '',
            singleBedCount: '',
            doubleBedCount: '',
            smoking: '',
            roomTypeId: ''
        });

    useEffect(() => {
        // Burada id'yi kullanarak verileri çekebilirsiniz
        axios.get(`http://localhost:8080/api/v1/rooms/${id}`)
            .then((response) => {
                const roomData = response.data;
                console.log(roomData);

                // Verileri formData içine yerleştirin
                setFormData({
                    roomNumber: roomData.roomNumber,
                    available: roomData.available.toString(),
                    singleBedCount: roomData.singleBedCount.toString(),
                    doubleBedCount: roomData.doubleBedCount.toString(),
                    smoking: roomData.smoking.toString(),
                    roomTypeId: roomData.roomType.id.toString()
                });

                updateForm.setFieldsValue({
                    roomNumber: roomData.roomNumber, // Form alanlarını güncel verilerle doldurun
                    roomTypeId: roomData.roomType.id.toString(),
                    singleBedCount: roomData.singleBedCount.toString(),
                    doubleBedCount: roomData.doubleBedCount.toString(),
                    smoking: roomData.smoking.toString(),
                    available: roomData.available.toString(),
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

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            roomTypeId: value,
        });
    };

    const handleSmokingChange = (value: string) => {
        setFormData({
            ...formData,
            smoking: value,
        });
    };

    const handleAvailableChange = (value: string) => {
        setFormData({
            ...formData,
            available: value,
        });
    };

    const handleSubmit = async () => {
        try {
            // Axios ile PUT isteği gönderin ve sunucudan dönen response'yi alın
            const response = await axios.put(`http://localhost:8080/api/v1/rooms/${id}`, {
                roomNumber: formData.roomNumber,
                available: formData.available === 'true',
                singleBedCount: Number(formData.singleBedCount),
                doubleBedCount: Number(formData.doubleBedCount),
                smoking: formData.smoking === 'true',
                roomType: {
                    id: Number(formData.roomTypeId)
                },
            });

            // İşlem başarılıysa cevabı kontrol edin ve gerekli işlemleri yapın
            if (response.status === 200) {
                alert('Oda başarıyla güncellendi');
            }
        } catch (error) {
            console.error('Oda güncellenirken bir hata oluştu:', error);
        }
    };

    return (
        <div>
            <h2>{formData.roomNumber} - Oda Tipi Düzenle</h2>
            <Col className="gutter-row" span={24}>
                <Card>
                    <Form form={updateForm} layout="vertical" id="updateForm" onFinish={handleSubmit}>
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
                                            options={[
                                                { value: '1', label: 'Deluxe' },
                                                { value: '2', label: 'Standart' }
                                            ]
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item
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
                                            onChange={handleSmokingChange}
                                        >
                                            <Select.Option value="false">Hayır</Select.Option>
                                            <Select.Option value="true">Evet</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
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
                                            onChange={handleAvailableChange}
                                        >
                                            <Select.Option value="true">Evet</Select.Option>
                                            <Select.Option value="false">Hayır</Select.Option>
                                        </Select>
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
