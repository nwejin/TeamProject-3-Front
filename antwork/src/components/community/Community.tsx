import '../../styles/Community.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCommunityPosts, like } from '../../services/apiService';

function Community() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 서버에서 데이터를 불러와서 posts 상태 업데이트
    const fetchData = async () => {
      try {
        const communityPosts = await getCommunityPosts();
        setPosts(communityPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addLike = async () => {
    try {
      const response = await like(1);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* 콘텐츠 박스*/}
      {posts.map((post: any) => {
        // console.log(minutesAgo)

        // 시간 계산
        const formatTimeDifference = (dateString: any) => {
          const postDate = new Date(dateString);
          const currentTime = new Date();
          const timeDifference = currentTime.getTime() - postDate.getTime();
          const minutesAgo = Math.floor(timeDifference / (1000 * 60));

          console.log(minutesAgo);
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
          const subject = post.subject;
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

        const readLink = '/community/read?id=' + post._id;
        console.log(readLink);

        return (
          <div className="post" key={post._id}>
            <div className="postContents">
              {/* 유저 정보*/}
              <div className="userProfile">
                <span>
                  <a href="/">
                    <img
                      src="https://teamproject-3-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.png"
                      alt="기본 이미지"
                    />
                    <p> </p>
                  </a>
                </span>
                <span>•</span>
                <span>{formatTimeDifference(post.date)}</span>
              </div>

              {/* 게시글 */}
              <div className="contentBox">
                <div className="textContent">
                  <a href={readLink}>
                    <p className="title">{post.title}</p>
                    <p className="text">{post.content}</p>
                  </a>
                </div>

                <div className="imgBox">
                  <a href={readLink}>
                    <img src={post.image} alt="업로드 이미지" />
                  </a>
                </div>
              </div>

              {/* 아이콘 리스트 */}
              <div className="statusBox">
                <div>
                  <span>
                    {/* 이 버튼이 눌리면 DB Like에 1씩 증가 */}
                    <button onClick={addLike}>
                      <span className="material-symbols-outlined">
                        favorite
                      </span>
                    </button>
                    <span>0</span>
                  </span>

                  <span>
                    <button>
                      <span className="material-symbols-outlined">
                        maps_ugc
                      </span>
                    </button>
                    <span>0</span>
                  </span>
                </div>
                <span className="category">{getSubject()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Community;
