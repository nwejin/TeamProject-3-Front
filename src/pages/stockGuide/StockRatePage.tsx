// StockRate.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import MarketData from '../../components/CompanyInfo/MarketData';
import Ticker from '../../components/CompanyInfo/Ticker';
import FundamentalData from '../../components/CompanyInfo/FundamentalData';
import CompanyProfile from '../../components/CompanyInfo/CompanyProfile';

import './../../styles/StockRate.scss';
import './../../styles/StockGuide.scss';
import SearchCompany from '../../components/CompanyInfo/SearchCompany';

const StockRate = () => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [postSymbol, setPostSymbol] = useState('');
  const [reLoad, setReLoad] = useState(true);

  const selectCompany = (e: any) => {
    const target = e.target.value;
    // console.log(target);
    setSearchSymbol(target);
  };

  // const Search = (e: any) => {
  //   setReLoad(!reLoad);
  //   setPostSymbol(searchSymbol);
  // };

  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">주식 길잡이</div>
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
              <option value="APPL">애플 (APPL)</option>
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
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div>
                <MarketData />
              </div>
              <div>
                <Ticker />
              </div>
            </div>
            <div className="flip">
              <div className="card">
                <div className="front">
                  <FundamentalData search={searchSymbol} />
                  {/* {reLoad ? (
                    <FundamentalData search={searchSymbol} />
                  ) : (
                    <FundamentalData search={''} />
                  )} */}
                </div>

                <div className="back">
                  <CompanyProfile search={searchSymbol} />
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
