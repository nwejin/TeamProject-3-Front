import React, { ReactElement } from 'react';
import MyResponsiveLine from './userChart';
import MyResponsivePie from './WinRate';
import { showRank } from '../../services/apiService';

interface props {
  open: Boolean;
  close: () => void;
  response: any;
  user: any;
}

const showDetail = ({ response, close, user }: props): ReactElement => {
  const { profit, win, loss, profitArray } = response;
  const rate = ((win / (win + loss)) * 100).toFixed(2);
  const totalGame = win + loss;

  const profitLimit = Number(profit).toFixed(2);

  const showRanking = async () => {
    try {
      const response = await showRank({});
      if (response) {
        console.log('show rank response 전송성공');
      }
    } catch (error) {}
  };

  return (
    <div className="detail-wrapper">
      <div className="deatail-profile">
        <div>
          <p>
            {user} <span>님의 거래 정보</span>
          </p>
        </div>
        <button className="closeBtn" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="innerContent">
        <div style={{ width: '100%', height: '100%' }}>
          <MyResponsiveLine data={profitArray} />
        </div>

        {/* 콘텐츠 */}
        <div className="historyBox">
          <div className="profitBox">
            <div className="subTitle">현재 순 이익</div>
            <div>
              <div className={profit > 0 ? 'profitSurplus' : 'profitDeficit'}>
                <span>{profit > 0 ? '+' : '-'} </span>
                <span style={{ fontSize: '22px' }}>{profitLimit}</span>
                <span style={{ color: '#333' }}> $</span>
              </div>
            </div>
          </div>
          <div className="profitBox">
            <div className="subTitle"> 승률 </div>
            <div
              style={{
                width: '70%',
                height: '60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 'auto',
              }}
            >
              <div style={{ width: '30%', height: '80%' }}>
                <MyResponsivePie data={response} />
              </div>
              <div style={{ fontSize: '18px' }}>
                <p>{rate}%</p>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#808080',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {win} <span>승</span> / {loss} <span>패</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profitBox">
            <div className="subTitle">랭킹 보기</div>
            <div>
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '22px' }}>{totalGame}</span>
                <span>게임</span>
              </div>
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#808080',
                width: '100%',
                textAlign: 'center',
              }}
            >
              win rate: {rate}%
            </div>
          </div>
        </div>
      </div>

      <button onClick={showRanking}>제출</button>
      <div></div>
    </div>
  );
};

export default showDetail;
