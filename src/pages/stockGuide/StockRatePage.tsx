import { useState } from 'react';
import './../../styles/StockGuide.scss';
import Virtual from '../../components/VirtualInvest/Virtual';
import { Link } from 'react-router-dom';

const StockRate = () => {
  const [type, setType] = useState('stock');
  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">주식 길잡이</div>
        <ul>
          <Link to="/stockGuide">
            <li>주식</li>
          </Link>
          <Link to="/stockRate">
            <li className="selected-blue">환율</li>
          </Link>
          <Link to="/virtual">
            <li>모의 투자</li>
          </Link>
        </ul>
        환율
      </div>
    </>
  );
};

export default StockRate;
