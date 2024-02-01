// StockRate.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import MarketData from '../../components/CompanyInfo/MarketData';
import Ticker from '../../components/CompanyInfo/Ticker';
import FundamentalData from '../../components/CompanyInfo/FundamentalData';
import CompanyProfile from '../../components/CompanyInfo/CompanyProfile';

const StockRate = () => {
  const [searchSymbol, setSearchSymbol] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setSearchSymbol(target);
  };

  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">주식 길잡이</div>
        <ul>
          <Link to="/stockGuide">
            <li>주식</li>
          </Link>
          <Link to="/stockRate">
            <li className="selected-blue">기업정보</li>
          </Link>
          <Link to="/virtual">
            <li>모의 투자</li>
          </Link>
        </ul>
      </div>

      <input placeholder="주식 입력" onChange={handleInput} />
      <button>제출</button>
      <MarketData />
      <Ticker />
      {/* <FundamentalData search={searchSymbol} /> */}
      <CompanyProfile search={searchSymbol} />
    </>
  );
};

export default StockRate;
