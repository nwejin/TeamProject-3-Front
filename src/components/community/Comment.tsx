import React, { ReactElement } from 'react';
import { useState } from 'react';
import CommentWrite from './CommentWrite';

function Comment(): ReactElement {
  // 댓글창 추가
  const [commentBox, setCommentBox] = useState(false);

  const addComment = () => {
    console.log('대댓글 추가');
    setCommentBox((prev) => !prev);
  };

  return (
    <>
      <div className="commentInnerBox">
        {/* 유저 정보*/}
        <div className="userProfile">
          <div className="profile">
            <span>
              <a href="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                  alt=""
                />
                <p> 작성자</p>
              </a>
            </span>
            <span>•</span>
            <span>10분전</span>
          </div>
        </div>
        {/* 댓글 내용 */}
        <div className="commentText">
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus aut
            fugiat iusto, voluptatem a sequi est Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Reprehenderit cumque officia,
          </p>
        </div>
        <div className="statusBox">
          <div>
            <span>
              <button>
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </span>

            <span>
              <button onClick={addComment}>
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
      </div>
    </>
  );
}

export default Comment;
