import React, { useState, useEffect } from 'react';
import { getComment } from '../../services/apiService';
import CommentWrite from './CommentWrite';
import { useCookies } from 'react-cookie';

function Comment({ data }: any) {
  const postId = data._id;

  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    // 서버에서 데이터를 불러와서 posts 상태 업데이트
    const fetchData = async () => {
      try {
        const comment = await getComment(postId);
        setCommentData(comment);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [postId]);

  console.log(commentData.length);

  // 댓글창 추가
  // const [commentBox, setCommentBox] = useState(false);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const cookie = useCookies(['jwtCookie']);
  // const uploadReComment = () => {
  //   console.log('대댓글 추가');
  //   setCommentBox((prev) => !prev);
  // };

  const showModal = () => {
    if (cookie[0].jwtCookie) {
      // setOpenModal(true);
      console.log('대댓글 추가');
      setOpenModal((prev) => !prev);
    } else {
      alert('로그인 후 댓글 작성 가능합니다.');
    }
  };
  // 댓글 id를 가져와서 find 댓글 추가

  return (
    <>
      <div className="countComment">
        <span>댓글</span> <span>{commentData.length}</span>
      </div>
      {/* 댓글표시 */}
      {commentData.map((post: any) => {
        const formatTimeDifference = (dateString: any) => {
          // 분계산
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

        return (
          <div className="commentInnerBox" key={post._id}>
            {/* 유저 정보*/}

            <div className="userProfile">
              <div className="profile">
                <span>
                  <img
                    src="https://teamproject-3-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.png"
                    alt=""
                  />
                </span>
                <p style={{ marginRight: '5px' }}>{post.userNickName}</p>
                <span style={{ fontSize: '10px' }}>•</span>
                <span>{formatTimeDifference(post.date)}</span>
              </div>
            </div>
            {/* 댓글 내용 */}
            <div className="commentText">
              <p className="text">{post.content}</p>
            </div>
            <div className="statusBox">
              <div>
                <span>
                  <button>
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </span>

                <span>
                  <button onClick={showModal}>
                    <span>댓글 달기</span>
                  </button>
                </span>
              </div>
              <div className="report">
                <span>
                  <button>
                    <span className="material-symbols-outlined">
                      notification_important
                    </span>
                    <span>신고하기</span>
                  </button>
                </span>
              </div>
            </div>
            {openModal && <CommentWrite data={data} />}
          </div>
        );
      })}
    </>
  );
}

export default Comment;
