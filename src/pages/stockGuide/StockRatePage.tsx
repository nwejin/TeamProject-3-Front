// StockRate.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MarketData from '../../components/CompanyInfo/MarketData';
import Ticker from '../../components/CompanyInfo/Ticker';
import FundamentalData from '../../components/CompanyInfo/FundamentalData';
import CompanyProfile from '../../components/CompanyInfo/CompanyProfile';

import './../../styles/StockRate.scss';
import './../../styles/StockGuide.scss';
import SearchCompany from '../../components/CompanyInfo/SearchCompany';

const StockRate = () => {
  const [searchSymbol, setSearchSymbol] = useState('APPL');
  const [postSymbol, setPostSymbol] = useState('');
  const [reLoad, setReLoad] = useState(true);
  const [isToggle, setIsToggle] = useState(false);
  const location = useLocation();

  const selectCompany = (e: any) => {
    const target = e.target.value;
    // console.log(target);
    setSearchSymbol(target);
  };

  // const Search = (e: any) => {
  //   setReLoad(!reLoad);
  //   setPostSymbol(searchSymbol);
  // };
  const toggleClick = () => {
    setIsToggle((prevIsToggle) => !prevIsToggle);
    if (isToggle) {
      setIsToggle(false);
    } else {
      setIsToggle(true);
    }
  };

  useEffect(() => {
    setIsToggle(false);
  }, [location.pathname]);
  return (
    <>
      <div className="outer-wrapper">
        <div className="guide-title">
          주식 길잡이{' '}
          {isToggle === true && (
            <div className="guide-help-box">
              (추가설명작성) 기업에 대한 전반적 프로필, 재무재표, 세부사항을 볼
              수 있어요!
              <br />
              입력창을 이용한 데이터 서치가 가능합니다.
            </div>
          )}
          <div className="guide-icon" onClick={toggleClick}>
            <span className="material-symbols-rounded">question_mark</span>
          </div>
        </div>
        <ul>
          <Link to="/stockGuide">
            <li>주식</li>
          </Link>
          <Link to="/stockRate">
            <li className="selected-blue">기업 정보</li>
          </Link>
          <Link to="/virtual">
            <li>모의 투자</li>
          </Link>
        </ul>
        <div
          style={{
            // backgroundColor: 'pink',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="searchBox">
            <select name="" id="" onChange={selectCompany} value={searchSymbol}>
              <option value="AAPL">애플 (APPL)</option>
              <option value="TSLA">테슬라 (TSLA)</option>
              <option value="AMZN">아마존 (AMZN)</option>
              <option value="MSFT">마이크로소프트 (MSFT)</option>
              <option value="INTC">인텔 (INTC)</option>
              <option value="NVDA">엔비디아 (NVDA)</option>
              <option value="GOOGL">알파벳 (GOOGL)</option>
              <option value="META">메타 (META)</option>
              <option value="NFLX">넷플릭스 (NFLX)</option>
              <option value="ORCL">오라클 (ORCL)</option>
            </select>
            {/* <button onClick={Search}>기업 정보 조회하기</button> */}
          </div>
          <div
            style={{
              // backgroundColor: 'blue',
              display: 'flex',
              height: '800px',
              flexDirection: 'row',
            }}
          >
            <div style={{ width: '60%', height: '100%' }}>
              <div
                style={{
                  width: '100%',
                  height: '50%',
                }}
              >
                <Ticker />
                <FundamentalData search={searchSymbol} />
                <CompanyProfile search={searchSymbol} />
              </div>

              {/* <MarketData /> */}
            </div>
            <div className="flip">
              <div className="card">
                <div className="front">
                  {/* <FundamentalData search={searchSymbol} /> */}
                  {/* {reLoad ? (
                    <FundamentalData search={searchSymbol} />
                  ) : (
                    <FundamentalData search={''} />
                  )} */}
                </div>
                <div className="back">
                  {/* <CompanyProfile search={searchSymbol} /> */}
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StockRate;
