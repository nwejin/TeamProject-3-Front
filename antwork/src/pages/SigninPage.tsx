import { Link, useNavigate } from "react-router-dom";
import LoginBtnComponent from './../components/LoginBtn';

const SigninPage=()=>{
    const navigate = useNavigate();
    return<>
    <div className="form-box">
        <div className="page-title">소셜 로그인</div>
        <div className="kakao-login-btn"><img src={process.env.PUBLIC_URL + "kakao_login_btn.png"} alt="kakao login" /></div>
        <div className="hr-div"></div>
        <div className="page-title">로그인</div>
        <form>
            <input className="input-box"/><br/>
            <input className="input-box" /><br/>
            <input type="checkbox"/> 아이디 기억하기
            <Link to="/findId">아이디 | 비밀번호 찾기</Link><br/>
            <LoginBtnComponent>로그인</LoginBtnComponent>
            <div>아직 계정이 없으신가요? <span className="link-btn" onClick={()=>{
                navigate('/signup');
            }}>회원가입하기</span></div>
        </form>
        </div>
    </>
}
export default SigninPage;