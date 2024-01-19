// client/src/components/ExampleComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
  const [data, setData] = useState([{
    id:1,
    name:'hi',
  },{
    id:2,
    name:'hi',
  },{
    id:3,
    name:'hi',
  }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data'); // 서버 엔드포인트에 맞게 변경
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Example Component</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}{item.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;