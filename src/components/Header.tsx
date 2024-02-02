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
  const [isHelpToggle, setIstHelpToggle] = useState(false);
  const location = useLocation();

  const [userInfos, setUserInfos] = useState({
    userId: '',
    userNickName: '',
    userProfile: '',
  });

  useEffect(() => {
    console.log('로그인 시 실행');
    setUserInfos({
      userId: '',
      userNickName: '',
      userProfile: '',
    });
    const getUserInfo = async () => {
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
            userProfile:
              response.info.user_profile ||
              process.env.PUBLIC_URL + 'mypage.png',
          });
          console.log('사용자 정보 폼', userInfos);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.log('카카오 로그인 또는 사용자 정보 가져오기 에러', error);
      }
    };
    getUserInfo();
  }, [jwtCookie['jwtCookie']]);

  const mypageToggle = () => {
    setIsToggle((prevIsToggle) => !prevIsToggle);
    if (isToggle) {
      setIsToggle(false);
    } else {
      setIsToggle(true);
    }
  };
  const helpToggle = () => {
    setIstHelpToggle((prevIsToggle) => !prevIsToggle);
    if (isHelpToggle) {
      setIstHelpToggle(false);
    } else {
      setIstHelpToggle(true);
    }
  };

  useEffect(() => {
    setIstHelpToggle(false);
    setIsToggle(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setUserInfos({
      userId: '',
      userNickName: '',
      userProfile: '',
    });
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
  };

  const redirectMain = () => {
    window.location.href = '/';
  };

  // useEffect(() => {
  //   console.log('페이지 로딩시 실행');

  //   const tokenId = jwtCookie['jwtCookie'];
  //   // console.log('tokenId', tokenId);
  //   const getUserInfo = async () => {
  //     try {
  //       const response = await userInfo({ id: tokenId });
  //       console.log(response);
  //       setUserInfos({
  //         userId: response.info.user_id,
  //         userNickName: response.info.user_nickname,
  //         userProfile:
  //           response.info.user_profile || process.env.PUBLIC_URL + 'mypage.png',
  //       });
  //     } catch (error) {
  //       console.log('사용자 정보 가져오기 에러', error);
  //     }
  //   };
  //   getUserInfo();
  // }, []);

  console.log(userInfos.userId);
  console.log(userInfos.userNickName);

  return (
    <>
      <div className="header" id="top">
        <Link to="/">
          <img
            className="main-logo"
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
              <img
                className="mypage-profile"
                src={userInfos.userProfile}
                alt=""
                style={{}}
              />
            </div>
            {isToggle === true && (
              <div className="Header-mypage">
                <div className="Header-nickname">
                  {userInfos.userNickName}&nbsp;님의 투자 여정을 응원합니다!
                </div>
                <Link to="/wordBook">
                  <div>단어장</div>
                </Link>
                <div className="logout-btn" onClick={handleLogout}>
                  로그아웃
                </div>
                <div className="Header-user">
                  <Link to="/mypage">
                    <div className="Header-user-update">회원정보수정</div>
                  </Link>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <div className="Header-user-delete">회원탈퇴</div>
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
      {isHelpToggle === true && <div className="help-box"></div>}
      <div className="remote-btn">
        {/* <div className="fix-icon" onClick={helpToggle}>
          <span className="material-symbols-rounded">question_mark</span>
        </div> */}
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
