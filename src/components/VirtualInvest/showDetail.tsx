import React, { ReactElement } from 'react';
import MyResponsiveLine from './userChart';
import MyResponsivePie from './WinRate';

interface props {
  open: Boolean;
  close: () => void;
  response: any;
  user: any;
}

const showDetail = ({ response, close, user }: props): ReactElement => {
  const { profit, win, loss, profitArray } = response;
  console.log(profitArray);
  // console.log(response);
  // console.log(profit);
  // console.log(win);
  // console.log(loss);
  const rate = (win / (win + loss)) * 100;
  console.log(rate);

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
        <div className="historyBox">
          <div className="profitBox">
            <div style={{ fontSize: '14px', color: '#808080' }}>
              현재 순 이익
            </div>
            <div>
              <div
                className={profit > 0 ? 'profitSurplus' : 'profitDeficit'}
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <span>{profit > 0 ? '+' : '-'} </span>
                <span style={{ fontSize: '22px' }}>{profit}</span>
                <span style={{ color: '#333' }}> USD</span>
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
          <div className="winRateBox">
            <div style={{ fontSize: '14px', color: '#808080' }}> 승률 </div>
            <div
              style={{
                width: '80%',
                height: '70%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 'auto',
              }}
            >
              <div style={{ width: '20%', height: '100%' }}>
                <MyResponsivePie data={response} />
              </div>
              <div>
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
        </div>
        <div style={{ width: '100%', height: '80%' }}>
          <MyResponsiveLine data={profitArray} />
        </div>
      </div>
    </div>
  );
};

export default showDetail;
