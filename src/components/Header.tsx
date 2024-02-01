import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { kakaoLogin, kakaoLogout, userInfo } from '../services/apiService';
import { UserData } from './../types/types';

const Header = () => {
  const [jwtCookie, setjwtCookie, removejwtCookie] = useCookies(['jwtCookie']);
  const [kakaoToken, setkakaoToken, removekakaoToken] = useCookies([
    'kakaoToken',
  ]);
  const [isKakao, setisKakao, removeisKakao] = useCookies(['isKakao']);
  const [isLogin, setIsLogin] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const location = useLocation();

  const [userInfos, setUserInfos] = useState({
    userId: '',
    userNickName: '',
    userProfile: '',
  });

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');

        if (code) {
          console.log('카카오 로그인 요청');
          await kakaoLogin(code);
        }

        const tokenId = jwtCookie['jwtCookie'];
        console.log('tokenId', tokenId);

        if (tokenId) {
          setIsLogin(true);

          const response = await userInfo({ id: tokenId });
          console.log('사용자 정보', response.info);
          setUserInfos({
            userId: response.info.user_id,
            userNickName: response.info.user_nickname,
            userProfile: response.info.user_profile,
          });
          console.log('사용자 정보 폼', userInfos);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.log('카카오 로그인 또는 사용자 정보 가져오기 에러', error);
      }
    };

    handleKakaoLogin();
  }, []);

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
      <div className="header" id="top">
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
              <span>
                <img
                  src={userInfos.userProfile}
                  alt=""
                  style={{
                    position: 'relative',
                    top: '0',
                    transform: 'none',
                    borderRadius: '50%',
                  }}
                />
              </span>
            </div>
            {isToggle === true && (
              <div className="Header-mypage">
                <div>
                  {userInfos.userId} ( {userInfos.userNickName} )
                </div>
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
      <div className="remote-btn">
        <div className="fix-icon">
          <span className="material-symbols-rounded">question_mark</span>
        </div>
        <a href="#top">
          <div className="fix-icon">
            <span className="material-symbols-rounded">vertical_align_top</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default Header;
