import React, { ReactElement } from 'react';
import MyResponsiveLine from './userChart';
interface props {
  open: Boolean;
  close: () => void;
  response: any;
}

const showDetail = ({ response, close }: props): ReactElement => {
  const { profit, win, loss, profitArray } = response;
  console.log(profitArray);
  // console.log(response);
  // console.log(profit);
  // console.log(win);
  // console.log(loss);

  return (
    <div className="detail-wrapper">
      <div>
        <button className="closeBtn" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div>
        <p>현재 순 이익</p>
        <p>{profit}</p>
        <p>승리 수</p>
        <p>{win}</p>
        <p>패배 수</p>
        <p>{loss}</p>

        <p>{profitArray}</p>
        {/* <MyResponsiveLine data={profitArray} /> */}
        <MyResponsiveLine />
      </div>
    </div>
  );
};

export default showDetail;
