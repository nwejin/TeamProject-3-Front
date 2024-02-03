import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { adminGetUser, deleteKakao, deleteUser } from '../services/apiService';
import { useNavigate } from 'react-router';
import '../styles/Admin.scss';

interface User {
  _id: string;
  user_id: string;
  user_nickname: string;
  user_email: string;
  isKakao: any;
  user_profile: string;
  // Add other properties based on your user schema
}

const AdminPage = () => {
  //   const [isKakao, setisKakao, removeisKakao] = useCookies(['isKakao']);
  // const deleteUserInfo = async (event: any) => {
  //   try {
  //     event.preventDefault();

  //     if (isKakao['isKakao']) {
  //       if (window.confirm('탈퇴하시겠습니까?')) {
  //         const response = await deleteKakao(kakaoToken['kakaoToken']);
  //         const response2 = await deleteUser(myId);
  //         if (response2.success && response.success) {
  //           alert('회원정보 삭제 성공!');
  //           removejwtCookie('jwtCookie');
  //           removeisKakao('isKakao');
  //           removekakaoToken('kakaoToken');
  //           console.log('회원정보 삭제 성공:', response, response2);
  //           navigate('/');
  //         } else {
  //           console.error('회원정보 삭제 실패:', response, response2);
  //         }
  //       } else {
  //         return;
  //       }
  //     } else {
  //         if (window.confirm('탈퇴하시겠습니까?')) {
  //           const response = await deleteUser(myId);
  //           if (response.success) {
  //             console.log('회원정보 삭제 성공:', response);
  //             alert('회원정보 삭제 성공!');
  //             removejwtCookie('jwtCookie');
  //             removeisKakao('isKakao');
  //             navigate('/admin');
  //           } else {
  //             console.error('회원정보 삭제 실패:', response);
  //           }
  //         } else {
  //           return;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('회원정보 삭제 실패:', error);
  //   }
  // };

  const [posts, setPosts] = useState<User[]>([]);
  // db에서 데이터 불러오기위해 useState
  console.log('post', posts);

  useEffect(() => {
    // 서버에서 데이터를 불러와서 posts 상태 업데이트
    const fetchData = async () => {
      try {
        const userData = await adminGetUser();
        setPosts(userData);
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
            <li className="selected-blue">회원 관리</li>
          </Link>
          <Link to="/admin/communityManage">
            <li>게시글 관리</li>
          </Link>
        </ul>
        <div className="getAllUser">
          <h2>유저 정보</h2>
          <div>
            {currentPage.map((user) => {
              console.log(user);

              return (
                <div className="adminUserBox">
                  <img src={user.user_profile} alt="" />
                  <div key={user._id} className="userBox">
                    <div>
                      <p>ID: {user.user_id}</p>
                      <p>Email: {user.user_email}</p>
                    </div>
                    <div>
                      <p>Nickname: {user.user_nickname}</p>
                    </div>
                    <p>{user.isKakao === 0 ? '일반 유저' : '카카오 로그인'}</p>
                    <button>삭제하기</button>
                  </div>
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
export default AdminPage;
