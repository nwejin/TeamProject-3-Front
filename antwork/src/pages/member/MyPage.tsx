import { useCookies } from 'react-cookie';
import './../../styles/Mypage.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const MyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwtCookie']);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenId = cookies['jwtCookie']; // 대괄호를 사용하여 속성에 액세스합니다.
    console.log(tokenId);
    if (!tokenId) {
      alert('로그인 후 사용가능한 기능입니다.');
      navigate('/signin');
    }
  }, [cookies]); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행
  return (
    <>
      <div className="outer-wrapper mypage-wrapper">
        <div className="mypage-navbar">
          <div></div>
          <div></div>
        </div>
        <div className="mypage-contents">
          <div>회원정보 수정</div>
          <div>
            아이디 <input />
          </div>
          <div>
            아이디 <input />
          </div>
          <div>
            아이디 <input />
          </div>
          <div>
            아이디 <input />
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
