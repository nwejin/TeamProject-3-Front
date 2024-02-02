import { useCookies } from 'react-cookie';
import './../../styles/Mypage.scss';
import React, { useEffect, useRef, useState } from 'react';
import { redirect, useNavigate } from 'react-router';
import {
  deleteKakao,
  deleteUser,
  modifyUser,
  myNicknameChecker,
  myPwChecker,
  userInfo,
} from '../../services/apiService';
const MyPage = () => {
  const [jwtCookie, setjwtCookie, removejwtCookie] = useCookies(['jwtCookie']);
  const [kakaoToken, setkakaoToken, removekakaoToken] = useCookies([
    'kakaoToken',
  ]);
  const [isKakao, setisKakao, removeisKakao] = useCookies(['isKakao']);
  const navigate = useNavigate();
  const [myId, setMyId] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = React.useState({
    user_id: '',
    user_password: '',
    user_changepw: '',
    user_nickname: '',
    user_email: '',
    user_profile: '',
  });

  useEffect(() => {
    const tokenId = jwtCookie['jwtCookie']; // 대괄호를 사용하여 속성에 액세스합니다.
    console.log(tokenId);
    if (!tokenId) {
      alert('로그인 후 사용가능한 기능입니다.');
      navigate('/signin');
    }
    getUserInfo();
    if (isKakao['isKakao']) {
      setIsDisabled(true);
    }
  }, []); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행

  const getUserInfo = async () => {
    try {
      const tokenId = jwtCookie['jwtCookie'];
      const response = await userInfo({ id: tokenId });
      // console.log(response.info);
      // console.log(response.info.user_id);
      setMyId(response.info.user_id);

      setFormData((prevData) => ({
        ...prevData,
        user_id: response.info.user_id,
        user_email: response.info.user_email,
        user_nickname: response.info.user_nickname,
        user_password: response.info.user_password,
        user_profile: response.info.user_profile,
      }));
    } catch (error) {
      navigate('/');
      console.log('사용자 정보 가져오기 에러', error);
    }
  };

  // 현재 비밀번호 일치 확인
  const [pwCheckString, setPwCheckString] = useState('');
  const [pwCheckState, setPwCheckState] = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);
  const passwordCheck = async (event: any) => {
    try {
      event.preventDefault();
      const response = await myPwChecker(formData, myId);
      // console.log(response);
      const pwCheckBox = document.querySelector('.pwCheckBox');
      if (response.success === true) {
        pwCheckBox?.classList.add('blue');
        pwCheckBox?.classList.remove('red');
        setPwCheckState(true);
        return setPwCheckString(`ⓘ ${response.message}`);
      } else if (response.success === false) {
        pwCheckBox?.classList.add('red');
        pwCheckBox?.classList.remove('blue');
        setPwCheckState(false);
        return setPwCheckString(`ⓘ ${response.message}`);
      } else {
        pwCheckBox?.classList.remove('red');
        pwCheckBox?.classList.remove('blue');
        setPwCheckState(false);
        return setPwCheckString('');
      }
    } catch (error: any) {
      // 에러 처리
      console.error('닉네임 유효성 검사 실패:', error.message);
    }
  };

  // 닉네임 중복 확인
  const [nicknameCheckString, setNicknameCheckString] = useState('');
  const [nicknameCheckState, setNicknameCheckState] = useState(true);
  const nickRef = useRef<HTMLInputElement>(null);
  const nicknameReCheck = async (event: any) => {
    try {
      event.preventDefault();
      const response = await myNicknameChecker(formData, myId);
      // console.log(response);
      const nicknameCheckBox = document.querySelector('.nicknameCheckBox');

      if (response.success) {
        setNicknameCheckState(true);
        nicknameCheckBox?.classList.add('blue');
        nicknameCheckBox?.classList.remove('red');
        return setNicknameCheckString(`ⓘ ${response.message}`);
      } else if (response.success === false) {
        setNicknameCheckState(false);
        nicknameCheckBox?.classList.add('red');
        nicknameCheckBox?.classList.remove('blue');
        return setNicknameCheckString(`ⓘ ${response.message}`);
      } else {
        setNicknameCheckState(false);
        nicknameCheckBox?.classList.remove('red');
        nicknameCheckBox?.classList.remove('blue');
        return setNicknameCheckString('');
      }
    } catch (error: any) {
      // 에러 처리
      console.error('닉네임 유효성 검사 실패:', error.message);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    console.log(name);
    console.log(value);

    // 회원 프로필 관련
    if (name === 'user_profile' && files && files.length > 0) {
      const file = files[0];
      // 파일 읽어오기
      const reader = new FileReader();
      reader.onloadend = () => {
        // 미리보기 이미지를 업데이트
        const previewImage = document.getElementById(
          'showIMG'
        ) as HTMLImageElement;
        if (previewImage) {
          previewImage.src = reader.result as string;
        }
      };

      // 파일을 Data URL로 읽어옴
      reader.readAsDataURL(file);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'user_profile' ? files[0] : value,
    }));
  };

  // 이미지 변경

  // 읽기 동작이 성공적으로 완료되었을 때 실행되는 이벤트 핸들러

  const modifyUserInfo = async (event: any) => {
    try {
      event.preventDefault();

      if (isKakao['isKakao']) {
        if (!nicknameCheckState) {
          alert('닉네임 중복을 확인해주세요');
        } else {
          const response = await modifyUser(formData, myId);
          if (response.success) {
            console.log('회원정보 수정 성공:', response);
            alert('회원정보 수정 성공!');
            window.location.href = '/mypage';
          } else {
            console.error('회원정보 수정 실패:', response);
          }
        }
      } else {
        if (!pwCheckState) {
          alert('비밀번호를 확인해주세요');
        } else if (!nicknameCheckState) {
          alert('닉네임 중복을 확인해주세요');
        } else {
          const response = await modifyUser(formData, myId);
          if (response.success) {
            console.log('회원정보 수정 성공:', response);
            alert('회원정보 수정 성공!');
            // navigate('/mypage');
            window.location.href = '/mypage';
          } else {
            console.error('회원정보 수정 실패:', response);
          }
        }
      }
    } catch (error) {
      console.error('회원정보 수정 실패:', error);
    }
  };
  const deleteUserInfo = async (event: any) => {
    try {
      event.preventDefault();

      if (isKakao['isKakao']) {
        if (window.confirm('탈퇴하시겠습니까?')) {
          const response = await deleteKakao(kakaoToken['kakaoToken']);
          const response2 = await deleteUser(myId);
          if (response2.success && response.success) {
            alert('회원정보 삭제 성공!');
            removejwtCookie('jwtCookie');
            removeisKakao('isKakao');
            removekakaoToken('kakaoToken');
            console.log('회원정보 삭제 성공:', response, response2);
            window.location.href = '/';
          } else {
            console.error('회원정보 삭제 실패:', response, response2);
          }
        } else {
          return;
        }
      } else {
        if (!pwCheckState) {
          alert('비밀번호를 확인해주세요');
        } else {
          if (window.confirm('탈퇴하시겠습니까?')) {
            console.log(myId);
            const response = await deleteUser(myId);
            if (response.success) {
              console.log('회원정보 삭제 성공:', response);
              alert('회원정보 삭제 성공!');
              removejwtCookie('jwtCookie');
              removeisKakao('isKakao');
              window.location.href = '/';
            } else {
              console.error('회원정보 삭제 실패:', response);
            }
          } else {
            return;
          }
        }
      }
    } catch (error) {
      console.error('회원정보 삭제 실패:', error);
    }
  };

  return (
    <>
      <div
        className="form-box"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="page-title">회원 정보</div>

        <form name="register-form" method="post">
          <div
            className="userImgBox"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <img
              src={formData.user_profile}
              alt=""
              id="showIMG"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                display: 'flex',
                width: '70%',
                alignItems: 'center',
              }}
            >
              <input
                type="file"
                name="user_profile"
                id="user_profile"
                style={{
                  border: 0,
                  borderRadius: 0,
                  width: 0,
                  height: 0,
                  padding: 0,
                }}
                disabled={isDisabled}
                onChange={handleInputChange}
              />
              <label htmlFor="user_profile">
                <span> 이미지 변경하기</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '14px' }}
                >
                  edit
                </span>
              </label>
            </div>
          </div>

          <div>
            아이디
            <input
              name="user_id"
              id="user_id"
              placeholder="아이디"
              value={formData.user_id}
              className="input-box"
              disabled
            />
            현재 비밀번호
            <input
              type="password"
              id="user_password"
              name="user_password"
              placeholder="현재 비밀번호"
              ref={pwRef}
              // value={formData.user_password}
              className="input-box"
              onChange={handleInputChange}
              onKeyUp={passwordCheck}
              disabled={isDisabled}
            />
            <div className="pwCheckBox">{pwCheckString}</div>
            변경 비밀번호
            <input
              type="password"
              id="user_changepw"
              name="user_changepw"
              placeholder="변경 비밀번호"
              className="input-box"
              onChange={handleInputChange}
              disabled={isDisabled}
            />
            닉네임
            <input
              id="user_nickname"
              name="user_nickname"
              placeholder="닉네임"
              className="input-box"
              value={formData.user_nickname}
              onChange={handleInputChange}
              onKeyUp={nicknameReCheck}
              ref={nickRef}
            />
            <div className="nicknameCheckBox">{nicknameCheckString}</div>
            이메일
            <input
              name="user_email"
              id="user_email"
              placeholder="이메일"
              className="input-box"
              value={formData.user_email}
              onChange={handleInputChange}
            />
            <br />
            <button className="signinBtn" onClick={modifyUserInfo}>
              회원정보 수정
            </button>
            <br />
            <br />
            <button className="signinBtn" onClick={deleteUserInfo}>
              회원탈퇴
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default MyPage;
