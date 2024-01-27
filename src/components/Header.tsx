import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { kakaoLogout } from '../services/apiService';

const Header = () => {
  const [jwtCookie, setjwtCookie, removejwtCookie] = useCookies(['jwtCookie']);
  const [kakaoToken, setkakaoToken, removekakaoToken] = useCookies([
    'kakaoToken',
  ]);
  const [isKakao, setisKakao, removeisKakao] = useCookies(['isKakao']);
  const [isLogin, setIsLogin] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tokenId = jwtCookie['jwtCookie']; // 대괄호를 사용하여 속성에 액세스합니다.
    console.log(tokenId);
    if (tokenId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [jwtCookie]); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행

  const mypageToggle = () => {
    setIsToggle((prevIsToggle) => !prevIsToggle);
    if (isToggle) {
      setIsToggle(false);
    } else {
      setIsToggle(true);
    }
  };

  useEffect(() => {
    setIsToggle(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    console.log(kakaoToken['kakaoToken']);
    console.log(process.env.REACT_APP_API_HOST);
    if (isKakao) {
      const uri = process.env.REACT_APP_API_HOST + '/v1/user/logout';
      const param = null;
      const header = {
        Authorization: 'Bearer ' + kakaoToken['kakaoToken'],
      };
      kakaoLogout(uri, param, header);
      removekakaoToken('kakaoToken');
    }
    removejwtCookie('jwtCookie');
    removeisKakao('isKakao');
    alert('로그아웃 되었습니다.');
    setIsToggle(false);
    window.location.href = '/';
  };

  const redirectMain = () => {
    window.location.href = '/';
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/temp_logo.png'}
            alt="Logo"
            onClick={redirectMain}
          />
        </Link>
        <ul>
          <li>
            <Link to="/news/economy">뉴스룸</Link>
          </li>
          <li>
            <Link to="/stockGuide">주식 길잡이</Link>
          </li>
          <li>
            <Link to="/community">개미의 시선</Link>
          </li>
        </ul>
        {isLogin === true && (
          <>
            <div className="Header-mypage-btn" onClick={mypageToggle}>
              <span className="material-symbols-rounded">person</span>
            </div>
            {isToggle === true && (
              <div className="Header-mypage">
                <div>아이디(닉네임)</div>
                <Link to="/mypage">
                  <div>마이페이지</div>
                </Link>
                <div className="logout-btn" onClick={handleLogout}>
                  로그아웃
                </div>
              </div>
            )}
          </>
        )}
        {isLogin === false && (
          <Link to="/signin">
            <div className="Header-login-btn">로그인</div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
