import React from 'react';

function AddPost() {
  const closeModal = () => {
    console.log('모달 닫기');
  };
  return (
    <div
      className="modalBack"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.5)',
        // backdropFilter: 'blur(5px)',
        zIndex: 1,
        position: 'absolute',
      }}
    >
      {/* 모달창 */}
      <div
        className="postModal"
        style={{
          position: 'absolute',
          width: '50%',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: '20px',
          zIndex: 100,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '95%',
            height: '90%',
            margin: '30px auto ',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h2>글 작성하기</h2>
            <button
              style={{ backgroundColor: 'white', border: 'none' }}
              onClick={closeModal}
            >
              <span>X</span>
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            }}
          >
            <label htmlFor="">주제</label>
            <select name="" id="" style={{ height: '30px' }}>
              <option value="">자유</option>
              <option value="">경제</option>
              <option value="">주식</option>
              <option value="">코인</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            }}
          >
            <label htmlFor="">제목</label>
            <input type="text" name="" id="" style={{ height: '30px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            }}
          >
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

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <button>작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
