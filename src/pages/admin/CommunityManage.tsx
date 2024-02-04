import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { adminGetPost, deleteCommunity } from '../../services/apiService';
import '../../styles/Admin.scss';

const CommunityManage = () => {
  const [posts, setPosts] = useState([]);
  // db에서 데이터 불러오기위해 useState
  console.log('post', posts);

  useEffect(() => {
    // 서버에서 데이터를 불러와서 posts 상태 업데이트
    const fetchData = async () => {
      try {
        const postData = await adminGetPost();
        setPosts(postData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [pagination, setPagination] = useState(1);
  const defaultPage = 10;

  // 마지막 페이지 (1*5)
  const lastPage = pagination * defaultPage;
  console.log('lastPage', lastPage);
  // 첫 페이지 ((1*5)- 5)
  const firstPage = lastPage - defaultPage;
  console.log('firstPage', firstPage);
  // 현재 페이지 데이터 나누기
  const currentPage = posts.slice(firstPage, lastPage);

  // console.log('currentPage', currentPage);

  // 페이지 번호대로 클릭하면 스테이트 값 업데이트
  const paginate = (pageNumber: any) => {
    setPagination(pageNumber);
  };

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
        <div>
          <div>
            {currentPage.map((post: any, index: number) => {
              console.log(post);
              const link = `/community/${post._id}`;

              const utcDateString = post.date;
              const utcDate = new Date(utcDateString);

              const koreanTimeString1 = utcDate.toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              });

              const deleteContent = async () => {
                try {
                  if (window.confirm('삭제 후 복구가 불가능 합니다.')) {
                    alert('삭제되었습니다.');
                    const result = await deleteCommunity(post._id);
                    console.log('글 삭제 성공', result);
                    window.location.href = '/community';
                  } else {
                    alert('취소되었습니다.');
                  }
                } catch (error) {
                  console.log(error);
                }
              };

              return (
                <div className="adminCommunityBox">
                  <div className="numBox">{index + 1}</div>
                  <div key="" className="communityBox">
                    <Link to={link} state={{ post }}>
                      <div className="Box1">
                        <p>
                          <span>제목</span> {post.title}
                        </p>
                        <p>
                          <span>내용</span>
                          {post.content}{' '}
                        </p>
                      </div>
                      <div className="Box2">
                        <p>
                          <span>작성자</span>
                          {post.userId.user_nickname}
                        </p>
                        <p>
                          <span>작성시간</span>
                          {koreanTimeString1}
                        </p>
                      </div>
                      <div className="Box3">
                        <p style={{ color: 'red' }}>
                          <span>신고수</span>
                          {post.reportedUser.length}
                        </p>
                        <p>
                          <span>좋아요</span>
                          {post.likedUser.length}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <button onClick={deleteContent}>삭제하기</button>
                </div>
              );
            })}

            <div className="paginationBox" style={{}}>
              {/* <span className="material-symbols-outlined">chevron_left</span> */}
              {Array.from({
                length: Math.ceil(posts.length / defaultPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`paginationBtn ${
                    pagination === index + 1 ? 'active' : ''
                  }`}
                >
                  <span>{index + 1}</span>
                </button>
              ))}
              {/* <span className="material-symbols-outlined">chevron_right</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityManage;
