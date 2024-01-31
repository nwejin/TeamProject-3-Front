import { useState } from 'react';
import TrandingViewWidget from '../../components/stockGuide/TrandingViewWidget';
import './../../styles/StockGuide.scss';
import Virtual from '../../components/VirtualInvest/Virtual';
import { GetWord } from '../../services/apiService';
import TradeOrder from '../../components/stockGuide/TradeOrder';
import TradeBuy from '../../components/stockGuide/TradeBuy';
import TradeSell from '../../components/stockGuide/TradeSell';
import TradeModify from '../../components/stockGuide/TradeModify';
import { Link } from 'react-router-dom';

const StockGuidePage = () => {

  const [explain, setExplain] = useState('');
  const [trade, setTrade] = useState('buy');

  const handleClick = async (word: string) => {
    try {
      const response = await GetWord(word);
      console.log(response.data.explanation);
      // return response.data.explanation;
      setExplain(response.data.explanation);
    } catch (error: any) {
      console.error('DB에 없는 단어입니다.');
    }
  };

  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">주식 길잡이</div>
        <ul>
          <Link to="/stockGuide">
            <li className="selected-blue">주식</li>
          </Link>
          <Link to="/stockRate">
            <li>환율</li>
          </Link>
          <Link to="/virtual">
            <li>모의 투자</li>
          </Link>
        </ul>
        <div className="stock-guide">
          {/* <div className="graph-y" onClick={()=>handleClick('y')}></div> */}
          <div className="stock-section">
            <div className="stock-chart">
              <TrandingViewWidget />
            </div>
            {/* <div className="graph-x" onClick={()=>handleClick('x')}></div> */}

            <div className="stock-explain">
              {/* <div className="graph-btn"> */}
              <div>
                <div className="graph-btn" onClick={() => handleClick('bar')}>
                  <img
                    src={process.env.PUBLIC_URL + 'bar-graph.png'}
                    alt="kakao login"
                  />
                  막대 그래프
                </div>
                <div
                  className="graph-btn"
                  onClick={() => handleClick('candle')}
                >
                  <img
                    src={process.env.PUBLIC_URL + 'candle-graph.png'}
                    alt="kakao login"
                  />
                  캔들 그래프
                </div>
              </div>
              {/* </div> */}
              {explain}
            </div>
          </div>
          <div className="trade-control">
            <div className="company" onClick={() => handleClick('company')}>
              삼성전자
            </div>
            <div className="stock-info">
              <div className="market">
                <div
                  className="market-price"
                  onClick={() => handleClick('stock Price')}
                >
                  74,100
                </div>
                <div
                  className="daily-change"
                  onClick={() => handleClick('prev_price')}
                >
                  ▼ 100(0.14%)
                </div>
              </div>
              <div className="volume">
                <div
                  className="total-volume"
                  onClick={() => handleClick('cumulative_volume')}
                >
                  6,460,820
                </div>
                <div
                  className="volume-change"
                  onClick={() => handleClick('prev_volume')}
                >
                  (50.24%)
                </div>
              </div>
            </div>
            {trade === 'buy' && (
              <div className="trade-tab">
                <div
                  className="tradeBtn btn-selected"
                  onClick={() => {
                    setTrade('buy');
                    handleClick('buy');
                  }}
                >
                  매수
                </div>
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('sell');
                    handleClick('sell');
                  }}
                >
                  매도
                </div>
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('modify');
                    handleClick('amend');
                  }}
                >
                  정정
                </div>
              </div>
            )}
            {trade === 'sell' && (
              <div className="trade-tab">
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('buy');
                    handleClick('buy');
                  }}
                >
                  매수
                </div>
                <div
                  className="tradeBtn btn-selected"
                  onClick={() => {
                    setTrade('sell');
                    handleClick('sell');
                  }}
                >
                  매도
                </div>
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('modify');
                    handleClick('amend');
                  }}
                >
                  정정
                </div>
              </div>
            )}
            {trade === 'modify' && (
              <div className="trade-tab">
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('buy');
                    handleClick('buy');
                  }}
                >
                  매수
                </div>
                <div
                  className="tradeBtn"
                  onClick={() => {
                    setTrade('sell');
                    handleClick('sell');
                  }}
                >
                  매도
                </div>
                <div
                  className="tradeBtn btn-selected"
                  onClick={() => {
                    setTrade('modify');
                    handleClick('amend');
                  }}
                >
                  정정
                </div>
              </div>
            )}

            <div className="order">
              <TradeOrder handleClick={handleClick} />
              {trade === 'buy' && <TradeBuy handleClick={handleClick} />}
              {trade === 'sell' && <TradeSell handleClick={handleClick} />}
              {trade === 'modify' && <TradeModify handleClick={handleClick} />}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default StockGuidePage;
