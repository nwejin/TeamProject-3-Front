// SignupPage 컴포넌트

import { useNavigate } from "react-router";
import { register } from "../services/apiService";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = React.useState({
    user_id: "",
    user_password: "",
    user_pwCheck: "",
    user_email: "",
  });

  // input 값이 변경될 때마다 호출되는 함수
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleRegister = async () => {
    try {
        // register 함수에 유저 데이터를 전달
        const response = await register(formData);
        
        // 서버에서의 응답에 따라 처리
        if (response.success) {
            console.log("회원가입 성공:", response);
            // 성공 메시지 출력 또는 리다이렉트 등 필요한 처리
        } else {
            console.error("회원가입 실패:", response);
            // 실패 메시지 출력 또는 필요한 처리
        }
    } catch (error:any) {
        // 에러 처리
        console.error("회원가입 실패:", error.message);
    }
};
const [dataFromBackend, setDataFromBackend] = useState<string>('');

// useEffect(() => {
//   // 백엔드로부터 데이터를 받아오는 함수
//   const fetchDataFromBackend = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/register'); // 백엔드 API 엔드포인트
//       setDataFromBackend(response.data);
//     //   console.log(dataFromBackend);
//     } catch (error:any) {
//       console.error('Error fetching data from backend:', error);
//     }
//   };

//   fetchDataFromBackend();
// }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      <div className="form-box">
        <div className="page-title">회원가입</div>
        <form name="register-form">
          <input
            name="user_id"
            placeholder="아이디 (최소 4자리 이상)"
            className="input-box"
            onChange={handleInputChange}
          />
          <br />
          <input
            name="user_password"
            placeholder="비밀번호 (최소 8자리 이상)"
            className="input-box"
            onChange={handleInputChange}
          />
          <br />
          <input
            name="user_pwCheck"
            placeholder="비밀번호 확인"
            className="input-box"
            onChange={handleInputChange}
          />
          <br />
          <input
            name="user_email"
            placeholder="이메일 (@ 포함한 주소 입력)"
            className="input-box"
            onChange={handleInputChange}
          />
          <br />
          <button className="signinBtn" onClick={handleRegister}>
            회원가입
          </button>
          <div className="account-options">
            이미 계정이 있으신가요?&nbsp;&nbsp;{" "}
            <span
              className="link-btn"
              onClick={() => {
                navigate("/signin");
              }}
            >
              로그인하기
            </span>
          </div>
        </form>
        <p>Data from Backend: {dataFromBackend}</p>

      </div>
    </>
  );
};

export default SignupPage;
