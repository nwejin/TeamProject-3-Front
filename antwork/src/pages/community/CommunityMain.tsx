import React, { ReactElement } from 'react';
import PostRank from '../../components/community/PostRank';
import '../../styles/Community.scss';
import Community from '../../components/community/Commnunity';
import CommuniutyHeader from '../../components/community/CommunityHeader';

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
    
        </div>
      </div>
    </div>
  );
}

export default CommunityMain;
