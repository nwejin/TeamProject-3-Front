import { useState } from 'react';
import './../../styles/StockGuide.scss';
import Virtual from '../../components/VirtualInvest/Virtual';
import { Link } from 'react-router-dom';

const StockVirtualPage = () => {
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
            <li>환율</li>
          </Link>
          <Link to="/virtual">
            <li className="selected-blue">모의 투자</li>
          </Link>
        </ul>
        <Virtual />
      </div>
    </>
  );
};

export default StockVirtualPage;
