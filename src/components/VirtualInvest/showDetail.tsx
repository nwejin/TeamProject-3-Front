import React, { ReactElement } from 'react';
interface props {
  open: Boolean;
  close: () => void;
}

const showDetail = (props: props): ReactElement => {
  return (
    <div className="detail-wrapper">
      <div>???</div>
      <button className="closeBtn" onClick={props.close}>
        닫기
      </button>
    </div>
  );
};

export default showDetail;
