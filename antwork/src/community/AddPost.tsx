import React, { ReactElement } from 'react';
import '../styles/Community.scss';

// props 타입 지정
interface props {
  open: Boolean;
  close: () => void;
}

const AddPost = (props: props): ReactElement => {
  // const fileName = (e: any) => {
  //   console.log('파일업로드 완료!');
  //   console.log(e);
  // };

  const uploadPost = () => {
    console.log('커뮤니티 글 보내기');
  };

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

          <form action="">
            <div className="postContentBox subject">
              <label htmlFor="">주제</label>
              <select name="" id="">
                <option value="free">자유</option>
                <option value="economy">경제</option>
                <option value="stock">주식</option>
                <option value="coin">코인</option>
              </select>
            </div>

            <div className="postContentBox">
              <label htmlFor="title">제목</label>
              <input type="text" name="title" id="title" />
            </div>

            <div className="postContentBox">
              <label htmlFor="description">내용</label>
              <textarea
                name="description"
                id="description"
                placeholder="상대방 비방 및 욕설과 같은 게시글은 검토 후 삭제 될 수 있습니다."
                cols={20}
                rows={7}
                style={{ textAlign: 'left', resize: 'none' }}
              ></textarea>
            </div>
            <div className="postContentBox" style={{ flexDirection: 'row' }}>
              <input
                value="첨부파일"
                name=""
                id=""
                placeholder="첨부파일"
                style={{
                  padding: '0 10px',

                  width: '80%',
                }}
              />
              <label
                htmlFor="file"
                style={{
                  width: '20%',
                  textAlign: 'center',
                  alignItems: 'center',
                  lineHeight: '30px',
                }}
              >
                파일 찾기
              </label>
              <input
                type="file"
                name="file"
                id="file"
                style={{
                  // color: 'black',
                  border: 0,
                  borderRadius: 0,
                  width: 0,
                  height: 0,
                  padding: 0,
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
              <button onClick={uploadPost}>작성하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
