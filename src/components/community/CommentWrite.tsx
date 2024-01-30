import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { postComment, userInfo } from '../../services/apiService';

function CommentWrite({ data }: { data: any }) {
  // 게시글 정보 불러오기
  // console.log('data', data);
  const postId = data._id;
  // console.log(postId); // 게시글 id
  // 게시글 id
  console.log(data);

  // 댓글 작성 및 서버 전달
  const [commentData, setCommentData] = useState('');
  const commentChange = (e: any) => {
    const value = e.target.value;
    setCommentData(value);
  };
  const cookie = useCookies(['jwtCookie']);
  const uploadComment = async () => {
    try {
      if (!cookie[0].jwtCookie) {
        alert('로그인 후 댓글 작성이 가능합니다!');
        return;
      }
      const commentPostData = {
        postId: postId,
        content: commentData,
      };
      const response = await postComment(commentPostData);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [loginUserData, setLoginUserData] = useState();
  const [userImg, setUserImg] = useState();

  // 현재 로그인한 사용자 정보 (닉네임 불러오기)
  useEffect(() => {
    const tokenId = cookie[0].jwtCookie;
    const getUserInfo = async () => {
      try {
        const response = await userInfo({ id: tokenId });
        console.log('res', response);
        const nickname = response.info.user_nickname;
        const userImg = response.info.user_profile;
        setLoginUserData(nickname);
        setUserImg(userImg);
      } catch (error) {
        console.log('사용자 정보 가져오기 에러', error);
      }
    };
    getUserInfo();
  }, []);

  console.log(loginUserData);
  console.log(userImg);

  return (
    <div className="commentWriteBox">
      <div className="commentWriteInnerBox">
        <div className="userProfile">
          <span>
            <a href="/">
              <img src={userImg} alt="" style={{ borderRadius: '50%' }} />
              <p style={{ fontWeight: '700' }}>
                {loginUserData}
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
