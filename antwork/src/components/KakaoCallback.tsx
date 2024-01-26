import { useEffect } from 'react';
import axios from 'axios';

const KakaoCallback = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    // const grantType = 'authorization_code';
    // const REST_API_KEY = 'da5d3b32f284512d0975b638e8a033ea';
    // const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
    // axios
    //   .post(
    //     `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    //     {},
    //     {
    //       headers: {
    //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //       },
    //     }
    //   )
    //   .then((res: any) => {
    //     console.log("access Token",res);
    //     const { access_token } = res.data;
    //     axios
    //       .post(
    //         `https://kapi.kakao.com/v2/user/me`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             'Content-type':
    //               'application/x-www-form-urlencoded;charset=utf-8',
    //           },
    //         }
    //       )
    //       .then((res: any) => {
    //         console.log('사용자 정보', res);
    //       });
    //   })
    //   .catch((Error: any) => {
    //     console.log(Error);
    //   });
    // axios
    //   .get('http://localhost:8000/redirect', { params: { code } })
    //   .then((res) => {
    //     console.log('/redirect 성공');
    //     axios.get('http://localhost:8000/profile').then((res) => {
    //       console.log('사용자 정보', res.data);
    //     });
    //   });

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
      <button>카카오 쿠키에 로그인 여부 저장</button>
    </>
  );
};
export default KakaoCallback;
