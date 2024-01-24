// App.js

import React, { useState, useEffect } from 'react';
import { Candle } from '../components/VirtualInvest/Candle';
import { getConvertData } from '../components/VirtualInvest/BybitAPI';
import SellBtn from '../components/VirtualInvest/SellOrder';
import Order from '../components/VirtualInvest/BuyOrder';

let yearofDay = 365; //bybit api 데이터는 시간이 역순이므로 slice도 역순으로 해야함

function App() {
  const [index, setIndex] = useState(180); //시작 캔들 개수
  const [data, setData] = useState([]); //api로 가져온 데이터
  const [currentCost, setCurrentCost] = useState(); //현재 가격
  const [prevInvest, setPrevInvest] = useState(0); // 이전 투자금액 -> profit 계산에 사용

  // 다음턴 버튼 클릭 시, bybit api 통신
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getConvertData(); // 데이터가 로딩될 때까지 대기
        setData(result.slice(index, yearofDay));
        setCurrentCost(data[data.length - 1].close);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [index]);

  // 초기 부터 currentValue 설정
  useEffect(() => {
    setCurrentCost(data[data.length - 1]?.close);
  }, [data]);

  const updatePrevInvest = (prev) => {
    setPrevInvest(prev);
  };

  const nextTurn = async () => {
    setIndex(index - 1);
    const newData = data.slice(index, yearofDay);
    setData(newData);
  };

  const candleProps = {
    data: data.sort((a, b) => new Date(a.time) - new Date(b.time)),
    colors: {
      backgroundColor: 'white',
      lineColor: '#2962FF',
      textColor: 'black',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    },
  };

  return (
    <div>
      <h1>모의 투자 차트</h1>
      <Candle {...candleProps} />
      <button onClick={nextTurn}>다음턴으로</button>
      <h2>현재 가격 : {currentCost} $ </h2>
      <SellBtn
        currentVal={currentCost}
        prevInvest={prevInvest}
        updatePrevInvest={updatePrevInvest}
      />
      <Order
        currentVal={currentCost}
        prevInvest={prevInvest}
        updatePrevInvest={updatePrevInvest}
      />

      <p style={{ color: 'green', fontWeight: '700' }}>
        {' '}
        지금까지의 투자금액: {prevInvest} $
      </p>
    </div>
  );
}

export default App;
