import { useLocation } from 'react-router-dom';
import Comment from '../../components/community/Comment';
import CommentWrite from '../../components/community/CommentWrite';
import { addLike } from '../../services/apiService';

function CommunityRead() {
  const location = useLocation();
  const data = location.state.post;
  // console.log(data._id);

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
    const subject = data.subject;
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
      const postId = data._id;

      const likeData = { like, postId };
      const response = await addLike(likeData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="postRead" key={data._id}>
      {/* 콘텐츠 박스*/}
      <div className="postContents">
        {/* 유저 정보*/}
        <div className="userProfile">
          <div className="profile">
            <span>
              <img src="" alt="" />
            </span>
            <p style={{ marginRight: '5px' }}>{data.userNickName}</p>
            <span style={{ fontSize: '10px' }}>•</span>
            <span>{formatTimeDifference(data.date)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="category">{getSubject()}</span>
            <button className="moreInfos">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <p className="title">{data.title}</p>
            <p className="text">{data.content}</p>
          </div>
        </div>

        <div className="readImgBox">
          <img src={data.image} alt="" />
        </div>

        {/* 아이콘 리스트 */}
        <div className="statusBox">
          <div>
            <span>
              <button onClick={plusLike}>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <span>{data.like}</span>
            </span>

            {/* <span>
              <button>
                <span className="material-symbols-outlined">maps_ugc</span>
              </button>
              <span>0</span>
            </span> */}
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

      <div className="commentBox">
        <Comment data={data} />
        <CommentWrite data={data} />
      </div>
    </div>
  );
}

export default CommunityRead;
