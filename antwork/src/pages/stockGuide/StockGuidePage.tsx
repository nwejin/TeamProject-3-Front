import { useState } from "react";
import TrandingViewWidget from "../../components/stockGuide/TrandingViewWidget";
import "./../../styles/StockGuide.scss";
import TradeControl from "../../components/stockGuide/TradeControl";

export const clickExplain =(selectDiv:string):string=>{
    if(selectDiv === 'x'){
        return '가로축은 시간을 나타냅니다. 가로축을 따라 차트를 읽으면 시간이 흐르는 방향으로 주식 가격의 움직임을 확인할 수 있습니다.'
    }else if(selectDiv==='y'){
        return '세로축은 주식 가격을 나타냅니다. '
    }else if(selectDiv==='bar'){
        return `막대 그래프는 시간당 주식 거래량을 나타냅니다.`
    }else if(selectDiv==='line'){
        return `
        선 차트와 막대 그래프 설명:
        선 차트는 주식 가격의 변동을 선으로 표시한다.`
    }else if(selectDiv==='candle'){
        return `캔들스틱 차트 설명:
        캔들스틱 차트는 개별 기간 동안의 주식 가격 움직임을 시각적으로 표현합니다. 각 캔들은 개시가격(open), 종가격(close), 최고가격(high), 최저가격(low)을 나타냅니다. 초보자들은 주로 캔들스틱 차트를 사용하며, 캔들의 색상과 몸통의 길이 등을 주의깊게 살펴보면 됩니다.`
    }
    return ""
}

const StockGuidePage =()=>{
    const [type, setType] = useState("stock");
    const [explain, setExplain] = useState("");

   const handleVocabulary =(word:string)=>{
        const description = clickExplain(word);
        setExplain(description);
   }
    return<>
        <div className="outer-wrapper">
            
            <div className="page-title">주식 길잡이</div>
            {type==='stock'&& <>
                <ul>
                    <li className="selected-blue" onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>
                <div className="stock-guide">
                    <div className="graph-y" onClick={()=>handleVocabulary('y')}></div>
                    <div className="stock-section">
                        <div className="stock-chart">
                            <TrandingViewWidget/>
                        </div>
                        <div className="graph-x" onClick={()=>handleVocabulary('x')}></div>
                        
                        <div className="stock-explain">
                        {/* <div className="graph-btn"> */}
                        <div>
                            <div className="graph-btn" onClick={()=>handleVocabulary('bar')}><img src={process.env.PUBLIC_URL + "bar-graph.png"} alt="kakao login" />막대 그래프</div>
                            <div className="graph-btn" onClick={()=>handleVocabulary('candle')}><img src={process.env.PUBLIC_URL + "candle-graph.png"} alt="kakao login" />캔들 그래프</div>
                            <div className="graph-btn" onClick={()=>handleVocabulary('line')}><img src={process.env.PUBLIC_URL + "line-graph.png"} alt="kakao login" />꺾은선 그래프</div>
                        </div>    
                        {/* </div> */}
                            {explain}
                            </div>
                    </div>
                    <div className="trade-control">
                        <TradeControl/>
                    </div>    
                </div>
            </>
            }
            {type==='exchange'&& <>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li className="selected-blue" onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>환율</div>    
            </>
            }
            {type==='invest'&& <>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li className="selected-blue" onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>모의투자</div>    
            </>
            }
        </div>
    </>
}

export default StockGuidePage; 