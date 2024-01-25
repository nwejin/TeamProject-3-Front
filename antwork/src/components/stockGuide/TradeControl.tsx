import { useState } from "react";
import TradeBuy from "./TradeBuy";
import TradeOrder from "./TradeOrder";
import TradeSell from "./TradeSell";
import TradeModify from "./TradeModify";

const TradeControl =()=>{
    const [type,setType]= useState('buy');

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
    {type==='buy'&& <div className="trade-tab">
        <div className="tradeBtn btn-selected" onClick={()=>setType('buy')}>매수</div>
        <div className="tradeBtn" onClick={()=>setType('sell')}>매도</div>
        <div className="tradeBtn" onClick={()=>setType('modify')}>정정</div>
    </div>}
    {type==='sell'&& <div className="trade-tab">
        <div className="tradeBtn" onClick={()=>setType('buy')}>매수</div>
        <div className="tradeBtn btn-selected" onClick={()=>setType('sell')}>매도</div>
        <div className="tradeBtn" onClick={()=>setType('modify')}>정정</div>
    </div>}
    {type==='modify'&& <div className="trade-tab">
        <div className="tradeBtn" onClick={()=>setType('buy')}>매수</div>
        <div className="tradeBtn" onClick={()=>setType('sell')}>매도</div>
        <div className="tradeBtn btn-selected" onClick={()=>setType('modify')}>정정</div>
    </div>}
    
    <div className="order">
        <TradeOrder/>
        {type==='buy'&& <TradeBuy/>}
        {type==='sell'&&<TradeSell/>}
        {type==='modify'&& <TradeModify/>}
        
    </div>
    </>
}

export default TradeControl;