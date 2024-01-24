import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const SellBtn = ({ currentVal, prevInvest, updatePrevInvest }) => {
  const [sellOrder, setSellOrder] = useState(0);
  const profit = useSelector((state) => state.profit);
  const stock = useSelector((state) => state.stock);
  const account = useSelector((state) => state.account);
  const purchasePrice = useSelector((state) => state.purchasePrice);
  const dispatch = useDispatch();

  const SellBtnClick = async () => {
    const cal = currentVal * sellOrder; // 매도 총 금액

    // 매도 주문수량보다 보유수량이 많아야 유효함
    if (stock >= sellOrder) {
      dispatch({ type: 'SET_STOCK', payload: stock - sellOrder });
      dispatch({
        type: 'SET_ACCOUNT',
        payload: account + cal,
      });
      dispatch({ type: 'SET_PROFIT', payload: cal - prevInvest });
    }

    // 매도 평단가 (분할 & 전체)
    // 분할 매도일 경우 평단가 재 갱신필요
    if (stock > 0) {
      const remainStock = stock - sellOrder;
      updatePrevInvest(prevInvest - sellOrder * currentVal); //지금까지의 투자 금액 = 현재 - 매도 금액

      if (remainStock > 0) {
        const remainCal = remainStock * purchasePrice;
        console.log('remianCal', remainCal);
        dispatch({
          type: 'SET_PURCHASE_PRICE',
          payload: remainCal / remainStock,
        });
      } else {
        // 전액 매도인 경우 평단가 0으로 조정
        dispatch({
          type: 'SET_PURCHASE_PRICE',
          payload: 0,
        });

        // 보유 주식이 0일 경우 투자금액 초기화
        updatePrevInvest(0);
      }

      console.log(`매도 금액 ${cal}`);
    }

    try {
      // 리액트에서 dispatch로 값을 반영하는 것은 db의 무결성과 무관하기에 직접 계산값을 넣어야함
      await axios.post('http://localhost:8000/virtual/profit', {
        profit: cal - purchasePrice * sellOrder,
      });
      console.log('아주 잘 전송');
      console.log('profit > ', profit);
    } catch (error) {
      console.error('error send', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="매도 주식 수"
        onChange={(e) => setSellOrder(e.target.value)}
      />
      <button onClick={SellBtnClick}>매도</button>
    </div>
  );
};

export default SellBtn;
