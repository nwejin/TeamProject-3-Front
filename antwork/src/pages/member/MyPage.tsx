import { useCookies } from "react-cookie";
import "./../../styles/Mypage.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { userInfo } from "../../services/apiService";
const MyPage=()=>{
    const [cookies, setCookie, removeCookie] = useCookies(['jwtCookie']);
    const navigate = useNavigate();
    const [formData,setFormData]=React.useState({
      user_id:'',
      user_password:'',
      user_nickname:'',
      user_email:''
    })
  
    useEffect(() => {
      const tokenId = cookies['jwtCookie'];  // 대괄호를 사용하여 속성에 액세스합니다.
      console.log(tokenId);
      if(!tokenId){
        alert('로그인 후 사용가능한 기능입니다.');
        navigate('/signin');
      }
      

    }, [cookies]); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행

    const getUser= async()=>{
      const tokenId = cookies['jwtCookie'];
      const response = await userInfo({id:tokenId});
      console.log(response);
    }
    return<>
    <div className="outer-wrapper mypage-wrapper">
        <div className="mypage-navbar">
          <div></div>
          <div></div>
        </div>
        <div className="mypage-contents">
            <div>회원정보 수정</div>
            <div>아이디 <input name="user_id" value={formData.user_id} disabled/></div>
            <div>비밀번호 <input name="user_password" value={formData.user_password} /></div>
            {/* <div>비밀번호 확인<input name="user_password"/></div> */}
            <div>닉네임 <input name="user_nickname" value={formData.user_nickname} /></div>
            <div>이메일 <input name="user_email" value={formData.user_email} /></div>
        </div>
        <button onClick={getUser}>버튼</button>
    </div>

    </>
  );
};
export default MyPage;
