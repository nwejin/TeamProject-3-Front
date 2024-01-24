import '../../styles/Community.scss';
import React, { useState, useEffect } from 'react';
import { getCommunityPosts } from '../../services/apiService';

function PostRankList() {
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

  return (
    <>
      {posts.map((post: any) => {
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
          <li>
            <a href="/">
              <div>
                <div className="category">
                  <span>{getSubject()}</span>
                </div>
                <div className="listTitle"> {post.title}</div>
              </div>
              <div className="listComment">
                <span className="material-symbols-outlined">maps_ugc</span>
                <span></span>
              </div>
            </a>
          </li>
        );
      })}
    </>
  );
}

export default PostRankList;
