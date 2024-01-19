import React, { ReactElement } from 'react';
import AddPost from './AddPost';
import PostRank from './PostRank';
import '../styles/Community.scss';
import Community from './Commnunity';
import { useState } from 'react';

function CommunityMain(): ReactElement {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="main">
      <div className="communityHeader">
        <h2> 커뮤니티</h2>

        <button
          // onClick={() => {
          //   setModal(true);
          // }}
          onClick={showModal}
        >
          글 작성
        </button>
        {/* {modal === true ? <AddPost /> : null} */}
        {openModal && <AddPost open={openModal} close={closeModal} />}
      </div>

      <div className="communityContentBox">
        <div className="rankingBox">
          <PostRank />
        </div>
        <div className="postBox">
          <Community></Community>
          <Community></Community>
          <Community></Community>
        </div>
      </div>
    </div>
  );
}

export default CommunityMain;
