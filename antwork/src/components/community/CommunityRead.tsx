import React, { useState, useEffect } from 'react';
import { getCommunityPosts } from '../../services/apiService';
import { useParams } from 'react-router-dom';

function CommunityRead() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

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

  const { id } = useParams();
  console.log(id);

  return (
    <div className="postRead">
      {/* 콘텐츠 박스*/}
      <div className="postContents">
        {/* 유저 정보*/}
        <div className="userProfile">
          <div className="profile">
            <span>
              <a href="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                  alt=""
                />
                <p>제목</p>
              </a>
            </span>
            <span>•</span>
            <span>10분전</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="category">경제</span>
            <button className="moreInfos">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <p className="title">안녕</p>
            <p className="text">음음음</p>
          </div>
        </div>

        <div className="readImgBox">
          <img src="" />
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
      </div>
    </div>
  );
}

export default CommunityRead;
