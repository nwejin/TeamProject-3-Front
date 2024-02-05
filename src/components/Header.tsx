import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  deleteKakao,
  deleteUser,
  kakaoLogin,
  kakaoLogout,
  userInfo,
} from '../services/apiService';
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect 실행');

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
          // console.log('카카오 로그인 요청');
          await kakaoLogin(code);
          navigate('/');
        }

        const tokenId = jwtCookie['jwtCookie'];
        // console.log('tokenId', tokenId);

        if (tokenId) {
          setIsLogin(true);
          const response = await userInfo({ id: tokenId });
          // console.log('사용자 정보', response.info);
          setUserInfos({
            userId: response.info.user_id,
            userNickName: response.info.user_nickname,
            userProfile:
              response.info.user_profile ||
              process.env.PUBLIC_URL + 'mypage.png',
          });
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
    // console.log(kakaoToken['kakaoToken']);
    if (kakaoToken['kakaoToken']) {
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

  const deleteUserInfo = async (event: any) => {
    try {
      event.preventDefault();

      if (window.confirm('탈퇴하시겠습니까?')) {
        if (kakaoToken['kakaoToken']) {
          await deleteKakao(kakaoToken['kakaoToken']);
          removekakaoToken('kakaoToken');
        }
        const response = await deleteUser(userInfos.userId);
        if (response.success) {
          alert('회원정보 삭제 성공');
          removejwtCookie('jwtCookie');
          removeisKakao('isKakao');
          console.log('회원정보 삭제 성공');
          window.location.href = '/';
        } else {
          console.error('회원정보 삭제 실패');
        }
      } else {
        return;
      }
    } catch (error) {
      console.error('회원정보 삭제 실패:', error);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        setIsAdmin(userInfos.userId === 'admin');
      } catch (err) {
        console.log(err);
      }
    };
    checkAdmin();
    console.log(isAdmin);
  }, [userInfos.userId, isAdmin]);

  console.log(isAdmin);

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
          {isAdmin ? (
            <li>
              <Link to="/admin">관리자 페이지</Link>
            </li>
          ) : (
            ''
          )}
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
                  <div className="Header-user-delete" onClick={deleteUserInfo}>
                    회원탈퇴
                  </div>
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
