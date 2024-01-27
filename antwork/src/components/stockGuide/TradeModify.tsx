const TradeModify =()=>{
    return <div className="order-content order-modify">
        <div className="order-method">
            <div className="open-orders">미체결 내역</div>
        </div>
    <div className="order-price">
        <select>
            <option>지정가</option>
            <option>시장가</option>
            <option>조건부지정가</option>
            <option>최유리지정가</option>
            <option>최우선지정가</option>
            <option>시간외종가</option>
            <option>시간외단일가</option>
        </select>

        <div className="order-market-price">시장가</div>
    </div>
    <div className="order-market-sell">수량 <div className="order-market-value">0주</div></div>
    <div className="order-market-sell">호가 <div className="order-market-value">74,000</div></div>
    <div className="order-market-sell">금액<div className="order-market-value">원</div></div>
    <div className="modify-btn">정정</div>

    </div>
}
export default TradeModify;