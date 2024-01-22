import React, { ReactElement, useState } from 'react';
import '../../styles/Community.scss';
import axios from "axios";

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

  //  state 지정
  const [formData, setFormData] = useState({
        subject: "free",
        title: "",
        content: "",
        file: null as File | null,
    });

    // 각 input창 입력 값 가져오기
    const postDataChange = (e:any) => {
      const {name, value, files} = e.target;
      console.log(name) //  input창 이름
      console.log(value) // 입력값
      setFormData({
        ...formData,
        [name]: name === 'file' ? files[0]: value,
      });
    };

    // 데이터 서버 전송
    const uploadPost = async () => {
      try {
        const postData = new FormData();
        postData.append('subject', formData.subject);
        postData.append('title', formData.title);
        postData.append('content', formData.content);
        if (formData.file) {
            postData.append('file', formData.file);
        }
        // 아래 url로 데이터 전달
        const response = await axios.post ('/community/uploadPost', postData)
        console.log(response.data)
      } catch(err) {
        console.log(err)
      }
    }



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
              <select name="subject" id="subject" onChange={postDataChange} value={formData.subject}> 
                <option value="free">자유</option>
                <option value="economy">경제</option>
                <option value="stock">주식</option>
                <option value="coin">코인</option>
              </select>
            </div>

            <div className="postContentBox">
              <label htmlFor="title">제목</label>
              <input type="text" name="title" id="title" onChange={postDataChange} value={formData.title}/>
            </div>

            <div className="postContentBox">
              <label htmlFor="content">내용</label>
              <textarea
                name="content"
                id="content"
                placeholder="상대방 비방 및 욕설과 같은 게시글은 검토 후 삭제 될 수 있습니다."
                cols={20}
                rows={7}
                style={{ textAlign: 'left', resize: 'none' }}
                onChange={postDataChange}
                value={formData.content}
              ></textarea>
            </div>
            <div className="postContentBox" style={{ flexDirection: 'row' }}>
              <input
                name=""
                id=""
                placeholder="첨부파일"
                style={{
                  padding: '0 10px',

                  width: '80%',
                }}    
                readOnly
                value={formData.file ? formData.file.name : ''}
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
                onChange={postDataChange}
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
              <button
               type='button'
               onClick={uploadPost}>작성하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
