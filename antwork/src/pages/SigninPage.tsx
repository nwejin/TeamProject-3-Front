import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { login } from "../services/apiService";
// import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

const SigninPage = () => {
  const navigate = useNavigate();
//   const cookies = new Cookies();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = React.useState({
    user_id: "",
    user_password: "",
    isChecked: false,
  });

  // 컴포넌트가 처음 마운트될 때 실행
//   useEffect(() => {
//     // 쿠키에서 아이디 값을 가져와서 상태에 설정
//     console.log("Attempting to get saveId from cookies");
//     const savedId = cookies.get("saveId");
//     console.log("Saved ID from cookies:", savedId);
  
//     if (savedId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         user_id: savedId,
//         isChecked: true,
//       }));
//     }
//   }, []);

const [cookies, setCookie, removeCookie] = useCookies(['saveId']);
// console.log(cookies)
useEffect(() => {
    const savedId = cookies.saveId;
    console.log("Saved ID:", savedId);
}, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();

      // register 함수에 유저 데이터를 전달
      const response = await login(formData);

      if (response.success) {
        console.log("로그인 성공:", response);
        alert("로그인 성공!");
        console.log(response.cookieId);
        // navigate('/');
        // 성공 메시지 출력 또는 리다이렉트 등 필요한 처리
      } else {
        console.error("로그인 실패:", response);
        alert(response.message);
        console.log(response.cookieId);
        navigate("/signin");
        // 실패 메시지 출력 또는 필요한 처리
      }
    } catch (error: any) {
      // 에러 처리
      console.error("로그인 실패:", error.message);
      alert("로그인 실패!");
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="form-box">
        <div className="page-title">소셜 로그인</div>
        <div className="kakao-login-btn">
          <img src={process.env.PUBLIC_URL + "kakao_login_btn.png"} alt="kakao login" />
        </div>
        <div className="hr-div"></div>
        <div className="page-title">로그인</div>
        <form name="login-form" method="post">
          <input
            name="user_id"
            placeholder="아이디"
            className="input-box"
            onChange={handleInputChange}
            value={formData.user_id}
          />
          <br />
          <input
            name="user_password"
            type="password"
            placeholder="비밀번호"
            className="input-box"
            onChange={handleInputChange}
          />
          <br />
          <div className="account-options">
            <div className="remember-id">
              <input
                type="checkbox"
                name="isChecked"
                checked={formData.isChecked}
                onChange={handleInputChange}
              />
              아이디 기억하기
            </div>
            <div className="find-info">
              <Link to="/findId">아이디 | 비밀번호 찾기</Link>
            </div>
          </div>
          <button className="signinBtn" onClick={handleRegister}>
            로그인
          </button>
          <div className="account-options">
            아직 계정이 없으신가요?&nbsp;&nbsp;{" "}
            <span
              className="link-btn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입하기
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SigninPage;
