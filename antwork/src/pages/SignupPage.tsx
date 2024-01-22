// SignupPage 컴포넌트

import { useNavigate } from "react-router";
import { idChecker, register } from "../services/apiService";
import React, { useEffect, useRef, useState } from "react";
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

    const [pwCheck, setPwCheck] = useState('');
    const [idCheck, setIdCheck] = useState('');

    const pwRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const idReCheck= async(event:any)=>{
        try {
            event.preventDefault(); 
    
            const response = await idChecker(formData);
            console.log(response);
            const idCheckBox = document.querySelector('.idCheckBox');
    
            // 서버에서의 응답에 따라 처리
            if (response.success) {
                idCheckBox?.classList.add('blue');
                idCheckBox?.classList.remove('red');
                return setIdCheck(`ⓘ ${response.message}`);
            } else if(response.success===false){
                idCheckBox?.classList.add('red');
                idCheckBox?.classList.remove('blue');
                return setIdCheck(`ⓘ ${response.message}`);
            }else{
                idCheckBox?.classList.remove('red');
                idCheckBox?.classList.remove('blue');
                return setIdCheck('');
            }
        } catch (error: any) {
            // 에러 처리
            console.error("회원가입 실패:", error.message);
        }
    }

    const passwordReCheck=(e:any)=>{
        const pwCheckBox = document.querySelector('.pwCheckBox');
        if(formData.user_password === formData.user_pwCheck && formData.user_password !== ""){
            pwCheckBox?.classList.add('blue');
            pwCheckBox?.classList.remove('red');
            return setPwCheck('ⓘ 사용가능한 비밀번호입니다.');
        }else if(formData.user_password !== formData.user_pwCheck){
            pwCheckBox?.classList.add('red');
            pwCheckBox?.classList.remove('blue');
            return setPwCheck('ⓘ 비밀번호가 일치하지 않습니다.');
        }else{
            pwCheckBox?.classList.remove('red');
            pwCheckBox?.classList.remove('blue');
            return setPwCheck('');
        }
    }
    

    // 회원가입 버튼 클릭 시 실행되는 함수
    const handleRegister = async (event: any) => {
        try {
            event.preventDefault(); // 이벤트의 기본 동작을 취소합니다.
    
            // register 함수에 유저 데이터를 전달
            if(idCheck.includes('중복')){
                alert('중복되는 아이디입니다.')
                idRef.current?.focus();
            }else if(pwCheck.includes('일치')){
                alert('비밀번호가 일치하지 않습니다.')
                pwRef.current?.focus();
            }else{
                const response = await register(formData);
                if (response.success) {
                    console.log("회원가입 성공:", response);
                    alert('회원가입 성공!');
                    navigate('/signin');
                    // 성공 메시지 출력 또는 리다이렉트 등 필요한 처리
                } else {
                    console.error("회원가입 실패:", response);
                    // 실패 메시지 출력 또는 필요한 처리
                }
            }
    
            // 서버에서의 응답에 따라 처리
        } catch (error: any) {
            // 에러 처리
            console.error("회원가입 실패:", error.message);
        }
    };

    return (
        <>
            <div className="form-box">
                <div className="page-title">회원가입</div>
                <form name="register-form" method="post">
                    <input
                        name="user_id"
                        id="user_id"
                        placeholder="아이디 (최소 4자리 이상)"
                        className="input-box"
                        onChange={handleInputChange}
                        onKeyUp={idReCheck}
                        ref={idRef}
                    />
                    <div className="idCheckBox">{idCheck}</div>
                    <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        placeholder="비밀번호 (최소 8자리 이상)"
                        className="input-box"
                        onChange={handleInputChange}
                        />
                    <br />
                    <input
                        type="password"
                        id="user_pwCheck"
                        name="user_pwCheck"
                        placeholder="비밀번호 확인"
                        className="input-box"
                        onChange={handleInputChange}
                        onBlur={passwordReCheck}
                        ref={pwRef}
                    />
                    <div className="pwCheckBox">{pwCheck}</div>
       
                    <input
                        name="user_email"
                        id="user_email"
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
            </div>
        </>
    );
};

export default SignupPage;
