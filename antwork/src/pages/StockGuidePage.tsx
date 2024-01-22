import { useState } from "react";

const StockGuidePage =()=>{
    const [type, setType] = useState("stock");
    return<>
        <div className="outer-wrapper">
            
            <div className="">주식 길잡이</div>
            {type==='stock'&& <div>
                <ul>
                    <li className="selected-blue" onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>
                <div>주식</div>    
            </div>
            }
            {type==='exchange'&& <div>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li className="selected-blue" onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>환율</div>    
            </div>
            }
            {type==='invest'&& <div>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li className="selected-blue" onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>모의투자</div>    
            </div>
            }
        </div>
    </>
}

export default StockGuidePage; 