import React from 'react';
import AddPost from './AddPost';
import '../styles/Community.scss';
import Community from './Commnunity';
import { useState } from 'react';

function CommunityMain() {
  const [modal, setModal] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      {/* <AddPost></AddPost> */}
      <div
        style={{
          width: '1000px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2> 커뮤니티</h2>
        <div
          style={{
            width: '420px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="검색어를 입력하세요"
            style={{
              borderRadius: '5px',
              width: '200px',
              height: '30px',
              border: '1px solid grey',
            }}
          />
          <button
            style={{
              borderRadius: '5px',
              border: '1px solid grey',
              width: '100px',
            }}
          >
            검색
          </button>
          <button
            style={{
              borderRadius: '5px',
              border: '1px solid grey',
              width: '100px',
            }}
            onClick={() => {
              setModal(true);
            }}
          >
            글 작성
          </button>
          {modal === true ? <AddPost /> : null}
        </div>
      </div>

      <Community></Community>
    </div>
  );
}

export default CommunityMain;
