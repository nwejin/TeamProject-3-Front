import React, { ReactElement } from 'react';
import PostRank from '../../components/community/PostRank';
import '../../styles/Community.scss';
import Community from '../../components/community/Community';
import CommuniutyHeader from '../../components/community/CommunityHeader';

import CommunityPagination from '../../components/community/CommunityPagination';

function CommunityMain(): ReactElement {
  const totalItems = 100;
  const itemCountPerPage = 10;
  const pageCount = Math.ceil(totalItems / itemCountPerPage);
  const currentPage = 1;

  return (
    <div className="main">
      <CommunityPagination
        totalItems={totalItems}
        itemCountPerPage={itemCountPerPage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
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
