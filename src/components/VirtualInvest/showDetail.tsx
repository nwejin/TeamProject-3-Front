import React, { ReactElement } from 'react';
import MyResponsiveLine from './userChart';

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

  return (
    <div className="detail-wrapper">
      <div
        style={{
          // backgroundColor: 'pink',
          display: 'flex',
          width: '80%',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '5%',
          margin: '1rem 0',
        }}
      >
        <div>
          <p>
            {user} <span>님의 거래 정보</span>
          </p>
        </div>
        <button className="closeBtn" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
          height: '80%',
        }}
      >
        <div style={{ width: '80%', height: '100%' }}>
          <MyResponsiveLine data={profitArray} />
        </div>
        <div
          style={{
            width: '18%',
            display: 'flex',
            flexDirection: 'column',
            height: '50%',
            // backgroundColor: 'pink',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid gray',
              paddingBottom: '0.5rem',
            }}
          >
            <p style={{ color: 'gray' }}>현재 순 이익</p>
            <p style={{ fontSize: '18px' }}>
              {profit}
              <span> $</span>
            </p>
          </div>
          <div
            style={{ borderBottom: '1px solid gray', paddingBottom: '0.5rem' }}
          >
            <p style={{ color: 'gray' }}>승리 수</p>
            <p style={{ fontSize: '18px' }}>{win}</p>
          </div>
          <div
            style={{ borderBottom: '1px solid gray', paddingBottom: '0.5rem' }}
          >
            <p style={{ color: 'gray' }}>패배 수</p>
            <p style={{ fontSize: '18px' }}>{loss}</p>
          </div>

          {/* <p>{profitArray}</p> */}
        </div>
        {/* <MyResponsiveLine data={profitArray} /> */}
      </div>
    </div>
  );
};

export default showDetail;
