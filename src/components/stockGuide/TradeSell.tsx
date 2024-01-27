const TradeSell =()=>{
    return <div className="order-content order-sell">
    <div className="order-method">
        <div className="order-cash">현금</div>
        <div className="order-credit">신용</div>
        <div className="order-margin">신용융자</div>
    </div>
    <div className="order-price">
        <select>
            <option>지정가</option>
            <option>시장가</option>
            <option>조건부지정가</option>
            <option>최유리지정가</option>
            <option>최우선지정가</option>
            <option>시간외종가</option>
            <option>시간외단일간</option>
        </select>

        <div className="order-market-price">시장가</div>
    </div>
    <div className="order-market-sell">수량 <div className="order-market-value">0주</div></div>
    <div className="order-market-sell">호가 <div className="order-market-value">74,000</div></div>
    <div className="order-market-sell">금액<div className="order-market-value">원</div></div>
    <div className="sell-btn">매도</div>
</div>
}
export default TradeSell;