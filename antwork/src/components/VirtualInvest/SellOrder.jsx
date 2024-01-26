import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SellBtn = ({ currentVal, prevInvest, updatePrevInvest, close }) => {
  const [sellOrder, setSellOrder] = useState(0);
  const profit = useSelector((state) => state.profit);
  const stock = useSelector((state) => state.stock);
  const account = useSelector((state) => state.account);
  const purchasePrice = useSelector((state) => state.purchasePrice);
  const dispatch = useDispatch();

  const cookie = useCookies(['jwtCookie']);
  const navigate = useNavigate(); //페이지 이동
  const notLogin = () => {
    navigate('/signin');
  };

  const SellBtnClick = async () => {
    //jwtCookie 체크
    if (cookie[0].jwtCookie) {
      if (stock >= sellOrder) {
        const cal = currentVal * sellOrder; //주문 총 금액

        dispatch({ type: 'SET_STOCK', payload: stock - sellOrder });
        dispatch({
          type: 'SET_ACCOUNT',
          payload: account + cal,
        });
        dispatch({ type: 'SET_PROFIT', payload: cal - prevInvest });

        // 평단 재갱신
        if (stock > 0) {
          const remainStock = stock - sellOrder;
          updatePrevInvest(prevInvest - sellOrder * currentVal);

          if (remainStock > 0) {
            const remainCal = remainStock * purchasePrice;
            dispatch({
              type: 'SET_PURCHASE_PRICE',
              payload: remainCal / remainStock,
            });
          } else {
            dispatch({
              type: 'SET_PURCHASE_PRICE',
              payload: 0,
            });

            updatePrevInvest(0);
          }

          try {
            // profit에 직접 값 대입, 쿠키 정보 백엔드로 전송
            console.log('버튼 누름');
            await axios.post(
              'http://localhost:8000/virtual/profit',
              {
                profit: cal - purchasePrice * sellOrder,
              },
              {
                withCredentials: true,
              }
            );
            console.log('아주 잘 전송');
            console.log('profit > ', profit);
          } catch (error) {
            console.error('error send', error);
          } finally {
            // 에러 발생 여부와 관계없이 항상 실행되는 부분
            setSellOrder(0);
          }
        }
      } else {
        alert('매도하려는 주식이 부족합니다. 주식 보유 수를 확인하세요');
      }
    } else {
      alert('로그인이 필요함');
      notLogin();
    }
  };

  return (
    <div className="sell-wrapper">
      <p>
        <span>매도(판매)</span> 하기
      </p>
      <div>
        <input
          type="text"
          placeholder="매도 주식 수"
          onChange={(e) => setSellOrder(e.target.value)}
          value={sellOrder}
        />
        <button onClick={SellBtnClick}>매도</button>
      </div>
      <div>
        <button>5%</button>
        <button>25%</button>
        <button>50%</button>
        <button>75%</button>
        <button>100%</button>
      </div>
      <button onClick={close}>닫기</button>
    </div>
  );
};

export default SellBtn;
