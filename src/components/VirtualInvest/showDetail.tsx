import React, { ReactElement } from 'react';
interface props {
  open: Boolean;
  close: () => void;
  response: any;
}

const showDetail = ({ response, close }: props): ReactElement => {
  const { profit, win, loss } = response;
  // console.log(response);
  // console.log(profit);
  // console.log(win);
  // console.log(loss);

  return (
    <div className="detail-wrapper">
      <div>
        <p>현재 순 이익</p>
        <p>{profit}</p>
        <p>승리 수</p>
        <p>{win}</p>
        <p>패배 수</p>
        <p>{loss}</p>
      </div>
      <div>
        <button className="closeBtn" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default showDetail;
