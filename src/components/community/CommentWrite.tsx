import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { userInfo } from '../../services/apiService';
import { postComment } from '../../services/apiService';

function CommentWrite({ data }: { data: any }) {
  // 게시글 정보 불러오기
  // console.log('data', data);
  const postId = data._id;
  // console.log(postId); // 게시글 id
  // 게시글 id

  // 현재 로그인한 사용자 정보 (닉네임 불러오기)
  const [loginUserData, setLoginUserData] = useState({
    userId: '',
    userNickName: '',
  });

  const cookie = useCookies(['jwtCookie']);
  useEffect(() => {
    // 로그인시에만 정보 가져오고 나머지는 X
    if (cookie[0].jwtCookie) {
      setLoginUserData({
        userId: data.userId,
        userNickName: data.userNickName,
      });
    } else {
      setLoginUserData({
        userId: '',
        userNickName: '',
      });
    }
  }, []);

  // 댓글 작성 및 서버 전달
  const [commentData, setCommentData] = useState('');
  const commentChange = (e: any) => {
    const value = e.target.value;
    setCommentData(value);
  };

  const uploadComment = async () => {
    try {
      if (!loginUserData.userId) {
        alert('로그인 후 댓글 작성이 가능합니다!');
        return;
      }
      const commentPostData = {
        postId: postId,
        userId: loginUserData.userId,
        content: commentData,
      };
      const response = await postComment(commentPostData);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="commentWriteBox">
      <div className="commentWriteInnerBox">
        <div className="userProfile">
          <span>
            <a href="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                alt=""
              />
              <p style={{ fontWeight: '700' }}>
                {loginUserData.userNickName}
                <span>님의 댓글</span>
              </p>
            </a>
          </span>
          <button onClick={uploadComment}>입력하기</button>
        </div>

        <textarea
          name=""
          id=""
          placeholder="상대방 비방 및 욕설과 같은 댓글은 검토 후 삭제 될 수 있습니다."
          cols={20}
          rows={7}
          onChange={commentChange}
        ></textarea>
      </div>
    </div>
  );
}

export default CommentWrite;
