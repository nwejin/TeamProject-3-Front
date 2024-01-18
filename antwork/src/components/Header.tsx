import { Link } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const move = () => {
      let lastScrollTop = 0;
      const delta = 15;
      const header = document.querySelector('.header');

      window.addEventListener('scroll', () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
          header?.classList.add('nav-up');
        } else {
          header?.classList.remove('nav-up');
        }
        lastScrollTop = st;
      });
    };

    // 컴포넌트가 마운트될 때 한 번만 실행
    move();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      window.removeEventListener('scroll', move);
    };
  }, []); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행

  return (
    <>
      <div className="header">
        <Link to="/"><img src={process.env.PUBLIC_URL + "temp_logo.png"} alt="Logo" /></Link>
        <ul>
          <li><Link to="/news">뉴스룸</Link></li>
          <li><Link to="/stockGuide">주식 길잡이</Link></li>
          <li><Link to="/community">개미의 시선</Link></li>
        </ul>
        <Link to ="/signin"><div className="Header-login-btn">로그인</div></Link>
      </div>
    </>
  );
};

export default Header;
