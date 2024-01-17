const Header =()=>{
    return (
       <>
        <div className = "header">
            <img src={process.env.PUBLIC_URL+"temp_logo.png"}/>
            <ul>
                <li>뉴스룸</li>
                <li>주식 길잡이</li>
                <li>개미의 시선</li>
            </ul>
            <div className="Header-login-btn">로그인</div>
        </div>
        </> 
      )
}
export default Header;