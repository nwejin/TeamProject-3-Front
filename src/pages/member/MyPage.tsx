import { useCookies } from 'react-cookie';
import './../../styles/Mypage.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  myNicknameChecker,
  myPwChecker,
  userInfo,
} from '../../services/apiService';
const MyPage = () => {
  const [jwtCookie, setjwtCookie, removejwtCookie] = useCookies(['jwtCookie']);
  const navigate = useNavigate();
  const [myId, setMyId] = useState('');
  const [formData, setFormData] = React.useState({
    user_id: '',
    user_password: '',
    user_changepw: '',
    user_nickname: '',
    user_email: '',
  });

  useEffect(() => {
    const tokenId = jwtCookie['jwtCookie']; // 대괄호를 사용하여 속성에 액세스합니다.
    console.log(tokenId);
    if (!tokenId) {
      alert('로그인 후 사용가능한 기능입니다.');
      navigate('/signin');
    }
    getUserInfo();
  }, [jwtCookie]); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행

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
      }));
    } catch (error) {
      console.log('사용자 정보 가져오기 에러', error);
    }
  };

  // 현재 비밀번호 일치 확인
  const [pwCheck, setPwCheck] = useState('');
  const pwRef = useRef<HTMLInputElement>(null);
  const passwordCheck = async (event: any) => {
    try {
      event.preventDefault();
      const response = await myPwChecker(formData, myId);
      // console.log(response);
      const pwCheckBox = document.querySelector('.nicknameCheckBox');
      if (response.success === true) {
        pwCheckBox?.classList.add('blue');
        pwCheckBox?.classList.remove('red');
        return setPwCheck(`ⓘ ${response.message}`);
      } else if (response.success === false) {
        pwCheckBox?.classList.add('red');
        pwCheckBox?.classList.remove('blue');
        return setPwCheck(`ⓘ ${response.message}`);
      } else {
        pwCheckBox?.classList.remove('red');
        pwCheckBox?.classList.remove('blue');
        return setPwCheck(``);
      }
    } catch (error: any) {
      // 에러 처리
      console.error('닉네임 유효성 검사 실패:', error.message);
    }
  };

  // 닉네임 중복 확인
  const [nicknameCheck, setNicknameCheck] = useState('');
  const nickRef = useRef<HTMLInputElement>(null);
  const nicknameReCheck = async (event: any) => {
    try {
      event.preventDefault();
      const response = await myNicknameChecker(formData, myId);
      // console.log(response);
      const nicknameCheckBox = document.querySelector('.nicknameCheckBox');

      if (response.success) {
        nicknameCheckBox?.classList.add('blue');
        nicknameCheckBox?.classList.remove('red');
        return setNicknameCheck(`ⓘ ${response.message}`);
      } else if (response.success === false) {
        nicknameCheckBox?.classList.add('red');
        nicknameCheckBox?.classList.remove('blue');
        return setNicknameCheck(`ⓘ ${response.message}`);
      } else {
        nicknameCheckBox?.classList.remove('red');
        nicknameCheckBox?.classList.remove('blue');
        return setNicknameCheck('');
      }
    } catch (error: any) {
      // 에러 처리
      console.error('닉네임 유효성 검사 실패:', error.message);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const modifyUserInfo = () => {};
  const deleteUserInfo = () => {};

  return (
    <>
      <div className="page-title">회원 정보</div>
      <form name="register-form" method="post">
        <input
          name="user_id"
          id="user_id"
          placeholder="아이디"
          value={formData.user_id}
          className="input-box"
          disabled
        />
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
        />
        <div className="pwCheckBox">{pwCheck}</div>
        <br />
        <input
          type="password"
          id="user_changepw"
          name="user_changepw"
          placeholder="변경 비밀번호"
          className="input-box"
          onChange={handleInputChange}
        />
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
        <div className="nicknameCheckBox">{nicknameCheck}</div>

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
      </form>
    </>
  );
};
export default MyPage;
