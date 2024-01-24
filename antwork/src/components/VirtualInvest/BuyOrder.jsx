import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = ({ currentVal, prevInvest, updatePrevInvest }) => {
  const account = useSelector((state) => state.account).toFixed(2); //잔고 (소수 둘째자리)
  const stock = useSelector((state) => state.stock); //보유주식 수
  const purchasePrice = useSelector((state) => state.purchasePrice); //보유주식 평단가
  const [buyOrder, setBuyOrder] = useState(0); // text로 입력 받은 주식 수
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("purchase", purchasePrice);
  }, [purchasePrice]);

  const CalculatorOrder = () => {
    const cal = (buyOrder * currentVal).toFixed(2); //투자 금액

    // 주문 총 금액이 잔고보다 많을 때만 적용
    if (account - cal >= 0) {
      dispatch({ type: "SET_ACCOUNT", payload: account - cal });
      const newStock = Number(stock) + Number(buyOrder);

      updatePrevInvest(prevInvest + Number(cal)); //지금까지의 투자금액은 잔고가 유효한지 확인 필요

      //stock이 0이면 평단가를 현재 가격으로 설정
      const newPurchasePrice =
        newStock === 0
          ? Number(currentVal)
          : (Number(purchasePrice) * stock + Number(cal)) / newStock;

      dispatch({
        type: "SET_STOCK",
        payload: newStock,
      });

      dispatch({
        type: "SET_PURCHASE_PRICE",
        payload: newPurchasePrice.toFixed(2),
      });
    } else {
      alert("돈없음");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="몇 주 살거니?"
        onChange={(e) => setBuyOrder(e.target.value)}
      />
      <button type="button" onClick={CalculatorOrder}>
        매수
      </button>
      <p>
        내 주식 현황: {stock} 주, 평단가: {purchasePrice}
      </p>
      <div style={{ display: "inline-block" }}>
        <p>Account: {account} $ </p>
      </div>
    </div>
  );
};

export default Order;
