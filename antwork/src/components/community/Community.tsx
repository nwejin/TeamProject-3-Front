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
      {posts.map((post: any) => {
        // const curruntTime = new Date().toLocaleString('ko-KR', {hour: 'numeric', minute: 'numeric',  second: 'numeric',})
        // const postTime = post.date

        // console.log(post._id)
        // const addTime = curruntTime - postTime;
      
        // const minute = Math.floor(addTime / (1000*60))

 
        const postDate = new Date(post.date);
        const currentTime = new Date();

        const timeDifference = currentTime.getTime() - postDate.getTime();
        const minutesAgo = Math.floor(timeDifference / (1000 * 60));

        // console.log(minutesAgo)
      
        
      
        // console.log('현재시간',curruntTime)
        // console.log('업로드시간', postTime)
        // console.log(addTime)
        // const id = post._id
        // console.log(id)

      
        // 카테고리 분류
        const getSubject = () => {
            const subject = post.subject
            let subjectname
            if (subject === 'free') {
            subjectname = '자유'
          } else if (subject === 'economy'){
           subjectname = '경제'
          } else if (subject === 'coin') {
          subjectname = '코인'
          } else if  (subject === 'stock')
          {  subjectname = '주식'}
          return subjectname
          }

         return(
        <div className="post" key={post._id}>
        <div className="postContents"  >
        {/* 유저 정보*/}
        <div className="userProfile">
          <span>
            <a href="/">
              <img
                src="https://teamproject-3-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.png"
                alt="기본 이미지"
              />
              <p> 작성자</p>
            </a>
          </span>
          <span>•</span>
          <span>
          {post.date}
          {/* {{minutesAgo}} */}
           </span>
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
              {/* 이 버튼이 눌리면 DB Like에 1씩 증가 */}
              <button onClick={() => {
              
                console.log(post.date)
              }}>
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
          <span className="category">{getSubject()}</span>
        </div>
      </div>
    </div>
      )
      })}
    </>
  );
}

export default Community;
