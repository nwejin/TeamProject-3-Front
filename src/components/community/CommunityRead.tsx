import { redirect, useLocation } from 'react-router-dom';
import Comment from '../../components/community/Comment';
import CommentWrite from '../../components/community/CommentWrite';
import {
  addLike,
  deleteCommunity,
  modifyCommunity,
  updatePost,
  userInfo,
  reportPost,
  reportGet,
  getComment,
  getReply,
} from '../../services/apiService';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import AddPost from '../../pages/community/AddPost';
import ModifyPost from '../../pages/community/ModifyPost';
import { report } from 'process';

// 커뮤니티 글 상세 페이지
function CommunityRead() {
  const location = useLocation();
  const postData = location.state.post;
  console.log(postData);
  const [disabledAttr, setdisabledAttr] = useState({ display: 'none' });
  const [jwtCookie] = useCookies(['jwtCookie']);

  const [isToggle, setIsToggle] = useState(false);
  const modifyToggle = () => {
    setIsToggle((prevIsToggle) => !prevIsToggle);
    if (isToggle) {
      setIsToggle(false);
    } else {
      setIsToggle(true);
    }
  };

  useEffect(() => {
    setButton();
  }, []);

  const setButton = async () => {
    try {
      const tokenId = jwtCookie['jwtCookie'];
      const response = await userInfo({ id: tokenId });
      console.log(response.info.user_id);
      if (response.info.user_nickname === postData.userId.user_nickname) {
        setdisabledAttr({ display: 'block' });
      }
    } catch (error) {
      console.log('사용자 정보 가져오기 에러', error);
    }
  };

  const updateContent = async (id: string) => {
    try {
      const result = await updatePost(postData._id);
      // console.log('변경 후 데이터', result);
      postData.title = result.title;
      postData.content = result.content;
      postData.subject = result.subject;
    } catch (error) {
      console.log('게시물 가져오기 실패');
    }
  };

  useEffect(() => {
    setButton();
    updateContent(postData._id);
    console.log('변경 후 postData', postData);
  }, []);

  const formatTimeDifference = (dateString: any) => {
    const postDate = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - postDate.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    // console.log(minutesAgo);
    if (minutesAgo < 1) {
      return '방금 전';
    } else if (minutesAgo < 60) {
      return `${minutesAgo}분 전`;
    } else if (minutesAgo < 1440) {
      const hoursAgo = Math.floor(minutesAgo / 60);
      return `${hoursAgo}시간 전`;
    } else {
      // 한국 시간으로 표시
      const formattedDate = postDate.toLocaleString('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'Asia/Seoul',
      });

      return formattedDate;
    }
  };

  // 카테고리 분류
  const getSubject = () => {
    const subject = postData.subject;
    let subjectname;
    if (subject === 'free') {
      subjectname = '자유';
    } else if (subject === 'economy') {
      subjectname = '경제';
    } else if (subject === 'coin') {
      subjectname = '코인';
    } else if (subject === 'stock') {
      subjectname = '주식';
    }
    return subjectname;
  };

  const plusLike = async () => {
    try {
      const like: Number = 1;
      const postId = postData._id;

      const likeData = { like, postId };
      const response = await addLike(likeData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const cookie = useCookies(['jwtCookie']);
  // const plusLike = async (postData._id: string) => {
  //   try {
  //     if (cookie[0].jwtCookie) {
  //       const postIndex = postData.findIndex(
  //         (post: any) => post._id === postData._id
  //       );
  //       if (postIndex !== -1) {
  //         const updatedPosts = [...posts];
  //         const like = updatedPosts[postIndex].isActive ? -1 : 1;
  //         const likeData = { like, postData._id };

  //         const response = await addLike(likeData);
  //         console.log('response toggle', response);

  //         // 좋아요 토글
  //         updatedPosts[postIndex].isActive = !updatedPosts[postIndex].isActive;

  //         // 좋아요 수 대신 likedUser 배열의 길이로 업데이트
  //         updatedPosts[postIndex].likedUser = response.likedUser;

  //         const res = await userInfo({ id: cookie[0].jwtCookie }); //지금 로그인한 아이디 오브젝트

  //         // post에서 하나씩 글 가져와서 likedUser 배열 안에 res가 있다면 좋아요를 누른 하트를 출력해야함
  //         posts.map((item) => {
  //           if (item.likedUser.includes(res.info._id)) {
  //             console.log('include', item); //여기 부분 파란하트로 채워주세요
  //           }
  //         });

  //         setPosts([...updatedPosts]); // 새로운 상태 객체로 업데이트
  //       }
  //     } else {
  //       alert('로그인 후 좋아요 가능합니다!');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // 글 수정 모달
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  const showModal = () => {
    setOpenModal(true);
  };

  const deleteContent = async () => {
    try {
      if (window.confirm('삭제 후 복구가 불가능 합니다.')) {
        alert('삭제되었습니다.');
        const result = await deleteCommunity(postData._id);
        console.log('글 삭제 성공', result);
        window.location.href = '/community';
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isReported, setIsReported] = useState(false);

  const reportContent = async () => {
    try {
      const tokenId = jwtCookie['jwtCookie'];
      const response = await userInfo({ id: tokenId });
      console.log(response.info._id); // userid

      const result = await reportPost(postData._id);
      console.log('신고 완료', result);
      console.log(result.active); // true/ false

      window.location.href = `/community/${postData._id}`;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getReportedUser = async () => {
      try {
        const tokenId = jwtCookie['jwtCookie'];
        const response = await userInfo({ id: tokenId });
        const userId = response.info._id; // userid

        const result = await reportGet({
          postId: postData._id,
          userId: userId,
        });
        console.log(result.isUserReported);
        setIsReported(result.isUserReported);
      } catch (err) {
        console.log(err);
        return false; // 에러 발생 시 기본값으로 false 반환
      }
    };
    getReportedUser();
  }, []);

  return (
    <div className="postRead" key={postData._id}>
      {/* 콘텐츠 박스*/}
      <div className="postContents">
        {/* 유저 정보*/}
        <div className="userProfile">
          <div className="profile">
            <span>
              <img src={postData.userId.user_profile} alt="" />
            </span>
            <p style={{ marginRight: '5px' }}>
              {postData.userId.user_nickname}
            </p>
            <span style={{ fontSize: '10px' }}>•</span>
            <span>{formatTimeDifference(postData.date)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              style={disabledAttr}
              onClick={showModal}
              className="delModiBtn"
            >
              <span className="material-symbols-outlined">box_edit</span>
            </button>
            {openModal && (
              <ModifyPost
                open={openModal}
                close={closeModal}
                postData={postData}
              />
            )}
            <button
              style={disabledAttr}
              onClick={deleteContent}
              className="delModiBtn"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
            <span className="category">{getSubject()}</span>
          </div>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <p className="title">{postData.title}</p>
            <p className="text">{postData.content}</p>
          </div>
        </div>

        <div className="readImgBox">
          <img src={postData.image} alt="" />
        </div>

        {/* 아이콘 리스트 */}
        <div className="statusBox">
          <div>
            <span>
              {/* onClick={() => plusLike(postData._id)} */}
              <button>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <span>{postData.like}</span>
            </span>

            {/* <span>
              <button>
                <span className="material-symbols-outlined">maps_ugc</span>
              </button>
              <span>0</span>
            </span> */}
          </div>
          <div className="report">
            <button
              onClick={reportContent}
              className={isReported ? 'clicked' : ''}
            >
              <p>신고하기</p>
              <span className="material-symbols-outlined">
                notification_important
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="commentBox">
        <Comment data={postData} />
        <CommentWrite data={postData} />
      </div>
    </div>
  );
}

export default CommunityRead;
