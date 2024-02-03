import { Link } from 'react-router-dom';

const CommunityManage = () => {
  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">관리자 페이지</div>
        <ul>
          <Link to="/admin/">
            <li>회원 관리</li>
          </Link>
          <Link to="/admin/communityManage">
            <li className="selected-blue">게시글 관리</li>
          </Link>
        </ul>
        게시글 관리 페이지 (신고 게시글)
      </div>
    </>
  );
};

export default CommunityManage;
