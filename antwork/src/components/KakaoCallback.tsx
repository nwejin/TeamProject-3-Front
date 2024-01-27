import { useEffect } from 'react';
import axios from 'axios';

const KakaoCallback = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    // 사용자 정보 요청
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
  }, []);

  const logOut = async () => {
    axios
      .get('http://localhost:8000/kakao/logout', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const disConnect = async () => {
    axios
      .get('http://localhost:8000/kakao/exit', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log('카카오 회원탈퇴');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button onClick={logOut}>로그아웃 하기</button>
      <button onClick={disConnect}>카카오 연결해제(회원탈퇴)</button>
    </>
  );
};
export default KakaoCallback;
