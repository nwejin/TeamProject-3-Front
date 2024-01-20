import React, { ReactElement } from 'react';
import '../styles/Community.scss';

// props 타입 지정
interface props {
  open: Boolean;
  close: () => void;
}

const AddPost = (props: props): ReactElement => {
  return (
    <div className="modalBackGround">
      {/* 모달창 */}
      <div className="modalBox">
        <div className="modalInnerBox">
          <div className="modalHeader">
            <h2>글 작성하기</h2>
            <button
              style={{
                backgroundColor: 'white',
                width: 'fit-content',
                border: 'none',
                textAlign: 'right',
                fontSize: '20px',
              }}
              onClick={props.close}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="postContentBox subject">
            <label htmlFor="">주제</label>
            <select name="" id="">
              <option value="">자유</option>
              <option value="">경제</option>
              <option value="">주식</option>
              <option value="">코인</option>
            </select>
          </div>

          <div className="postContentBox">
            <label htmlFor="">제목</label>
            <input type="text" name="" id="" />
          </div>

          <div className="postContentBox">
            <label htmlFor="">내용</label>
            <textarea
              name=""
              id=""
              placeholder="상대방 비방 및 욕설과 같은 게시글은 검토 후 삭제 될 수 있습니다."
              cols={20}
              rows={7}
              style={{ textAlign: 'left', resize: 'none' }}
            ></textarea>
          </div>
          <div className="postContentBox">
            <label htmlFor="">사진</label>
            <input
              type="file"
              name=""
              id=""
              style={{
                border: 'none',
                borderRadius: 0,
              }}
            />
          </div>

          <div
            className="postContentBox"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
            }}
          >
            <button>작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
