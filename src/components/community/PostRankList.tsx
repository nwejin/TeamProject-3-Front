import '../../styles/Community.scss';
import React, { useState, useEffect } from 'react';
import { getCommunityRank } from '../../services/apiService';
import { Link } from 'react-router-dom';

function PostRankList() {
  const [posts, setPosts] = useState([]);
  // console.log(posts);

  useEffect(() => {
    // 서버에서 데이터를 불러와서 posts 상태 업데이트
    const fetchData = async () => {
      try {
        const rank = await getCommunityRank();
        setPosts(rank);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {posts.map((post: any) => {
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
        return (
          <li key={post._id}>
            <Link to={`/community/${post._id}`} state={{ post }}>
              <div style={{ width: '80%' }}>
                <div className="category">
                  <span>{getSubject()}</span>
                </div>
                <div className="listTitle">
                  {post.title}
                  <span style={{ color: 'lightgray', fontSize: '12px' }}>
                    ({formatTimeDifference(post.date)})
                  </span>
                </div>
              </div>
              <div className="listComment">
                <span className="material-symbols-outlined">favorite</span>
                <span>{post.like}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default PostRankList;
