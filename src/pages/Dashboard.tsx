import React, { useState, useEffect } from 'react';
import axios from 'axios';

// StatDto türünü tanımlayın
interface StatDto {
  roomCount: number;
  roomTypeCount: number;
}

const Dashboard: React.FC = () => {

  const [data, setData] = useState<StatDto | null>(null);

  // Verileri API'den alma işlemi
  useEffect(() => {
    // Axios ile GET isteği yapın
    axios.get('http://localhost:8080/api/v1/statistic/') // API endpointini uygun şekilde değiştirin
      .then((response) => {
        // API'den gelen verileri state'e kaydedin
        setData(response.data);
      })
      .catch((error) => {
        console.error('API isteği başarısız oldu:', error);
      });
  }, []); // Boş bağımlılık dizisi, sadece bileşen yüklendiğinde bir kez çalışmasını sağlar

  if (!data) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>Genel</h2>
      <p>Toplam Oda Sayısı: {data.roomCount}</p>
      <p>Toplam Oda Tipi Sayısı: {data.roomTypeCount}</p>
    </div>
  )
}

export default Dashboard