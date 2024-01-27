import axios from 'axios';
import { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    if (code) {
      axios
        .get('http://localhost:8000/kakao/login', {
          params: { code },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log('/redirect 실행');
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="section1">
            <div>
              주식을 시작하고 싶지만
              <br />
              엄두도 내지 못하는
              <br />
              당신을 위해
            </div>
            <img src={process.env.PUBLIC_URL + 'graph.png'} />
            <br />
            <button>개미운동 시작하기</button>
          </div>
          <div className="section2">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="inner-wrapper">
          <div className="section3"></div>
          <div className="section4"></div>
        </div>
        <div className="thumb-title">개미의 시선</div>
        <div className="inner-wrapper">
          <div className="section5"></div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
