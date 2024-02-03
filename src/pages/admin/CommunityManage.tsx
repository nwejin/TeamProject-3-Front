import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { adminGetPost } from '../../services/apiService';
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
          <h2>신고 게시글</h2>
          <div>
            {currentPage.map((post: any) => {
              console.log(post);
              const link = `/community/${post._id}`;

              return (
                <div className="adminUserBox">
                  <Link to={link} state={{ post }}>
                    <img src="" alt="" />
                    <div key="" className="userBox">
                      <div>
                        <p>ID: {post.content} </p>
                        <p>Email: </p>
                      </div>
                      <div>
                        <p>Nickname: </p>
                      </div>
                      <p></p>
                      <button>삭제하기</button>
                    </div>
                  </Link>
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
