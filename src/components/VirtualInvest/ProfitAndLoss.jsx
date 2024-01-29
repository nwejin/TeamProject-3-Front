import React, { useEffect } from 'react';
import { calProfitAndLoss } from '../../services/apiService';
import { useSelector } from 'react-redux';

const ProfitAndLoss = () => {
  const initializeAccount = 3000000;
  const currentAccount = useSelector((state) => state.account);

  const handleResetClick = async () => {
    try {
      // Axios를 사용하여 서버에 요청 보내기
      const resetResponse = await calProfitAndLoss({
        profit: currentAccount - initializeAccount,
      });
      if (resetResponse) {
        window.location.reload(); //새로고침이 안댐
      }
    } catch (error) {
      console.error('초기화 오류:', error);
    }
  };

  return (
    <div>
      <button onClick={handleResetClick}>초기화</button>
    </div>
  );
};

export default ProfitAndLoss;
