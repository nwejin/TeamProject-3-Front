import { useEffect, useState } from 'react';
import './../../styles/StockGuide.scss';
import Virtual from '../../components/VirtualInvest/Virtual';
import { Link, useLocation } from 'react-router-dom';

const StockVirtualPage = () => {
  const [isToggle, setIsToggle] = useState(false);
  const location = useLocation();
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
              게임 목적 = 가상의 돈으로 실제 차트를 보며 투자를 연습한다.
              <br />
              <br />
              조작 방법
              <br />
              1. 매수, 매도 버튼 = 사용자는 원하는 주문량을 직접입력 OR
              범위지정을 통해 할 수 있다.
              <br />
              2. 다음턴으로 버튼 = 하루 단위의 턴을 넘기며 캔들을 생성한다.
              <br />
              <br />
              세부사항 <br />
              1. 이동평균선 지표 = 7, 15, 21, 128일선(기간에 따른 평균 가격선)을
              추가했다. <br />
              2. 실제 차트 구현을 위해 bybit api에서 btcusdt를 연동했다.
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
            <li>기업 정보</li>
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
