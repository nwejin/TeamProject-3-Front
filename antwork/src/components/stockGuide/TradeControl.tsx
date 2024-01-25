import TradeBuy from "./TradeBuy";
import TradeOrder from "./TradeOrder";

const TradeControl =()=>{
    return <>
    <div className="company">삼성전자</div>    
    <div className="stock-info">
        <div className="market">
            <div className="market-price">74,100</div>    
            <div className="daily-change">▼ 100(0.14%)</div> 
        </div>
        <div className="volume">
            <div className="total-volume">6,460,820</div>    
            <div className="volume-change">(50.24%)</div>    
        </div>
    </div>
    <div className="trade-tab">
        <div className="tradeBtn btn-selected">매수</div>
        <div className="tradeBtn">매도</div>
        <div className="tradeBtn">정정</div>
    </div>
    <div className="order">
        <TradeOrder/>
        <TradeBuy/>
    </div>
    </>
}

export default TradeControl;