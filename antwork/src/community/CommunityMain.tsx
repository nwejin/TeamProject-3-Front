import React, { ReactElement } from 'react';
import PostRank from './PostRank';
import '../styles/Community.scss';
import Community from './Commnunity';
import CommuniutyHeader from '../components/community/CommunityHeader';

function CommunityMain(): ReactElement {
  return (
    <div className="main">
      <CommuniutyHeader />

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
