import '../../styles/Admin.scss';
import { Link } from 'react-router-dom';

const DeleteManage = () => {
  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">관리자 페이지</div>
        <ul>
          <Link to="/admin/">
            <li>회원 관리</li>
          </Link>
          <Link to="/admin/communityManage">
            <li>신고글 관리</li>
          </Link>
          <Link to="/admin/deleteManage">
            <li className="selected-blue">게시글 관리</li>
          </Link>
        </ul>
        <div>
          <div className="heading">
            <div className="cell">
              <p>번호</p>
            </div>
            <div className="cell">
              <p>제목</p>
            </div>
            <div className="cell">
              <p>내용</p>
            </div>
            <div className="cell">
              <p>작성자</p>
            </div>
            <div className="cell">
              <p>작성시간</p>
            </div>
            <div className="cell">
              <p>좋아요</p>
            </div>
            <div className="cell">
              <p>신고수</p>
            </div>
            <div className="cell">
              <p>복원</p>
            </div>
            <div className="cell">
              <p>영구 삭제</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteManage;
