import '../../styles/Community.scss';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getCommunityPosts } from '../../services/apiService';
import AddPost from '../../pages/community/AddPost'; 

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


  return (
    <>
  
      {/* 콘텐츠 박스*/}
      
      {posts.map((post: any) => (
        <div className="post">
        <div className="postContents" key={post.id}>
        {/* 유저 정보*/}
        <div className="userProfile">
          <span>
            <a href="/">
              <img
                src="https://wimg.mk.co.kr/news/cms/202303/06/news-p.v1.20230303.7da9e984074048beb88b016ae6e26b68_P1.jpg"
                alt=""
              />
              <p> 작성자</p>
            </a>
          </span>
          <span>•</span>
          <span>{post.date}: 시간</span>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <a href="/community/read">
              <p className="title">
                {post.title}
              </p>
              <p className="text">
              {post.content}
              </p>
            </a>
          </div>

          <div className="imgBox">
            <a href="/">
              <img
                src="https://wimg.mk.co.kr/news/cms/202303/06/news-p.v1.20230303.7da9e984074048beb88b016ae6e26b68_P1.jpg"
                alt=""
              />
            </a>
          </div>
        </div>

        {/* 아이콘 리스트 */}
        <div className="statusBox">
          <div>
            <span>
              <button>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <span>0</span>
            </span>

            <span>
              <button>
                <span className="material-symbols-outlined">maps_ugc</span>
              </button>
              <span>0</span>
            </span>
          </div>
          <span className="category">{post.subject}</span>
        </div>
      </div>
    </div>
      ))}
   
    </>
  );
}

export default Community;
