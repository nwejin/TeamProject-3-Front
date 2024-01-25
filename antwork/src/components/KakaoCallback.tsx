import { useEffect } from 'react';
import axios from 'axios';
import { log } from 'console';

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
    axios
      .get('http://localhost:8000/redirect', { params: { code } })
      .then((res) => {
        console.log('/redirect 실행');
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const getProfile = async () => {
    axios
      .get('http://localhost:8000/profile')
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const logOut = async () => {
    axios
      .get('http://localhost:8000/logout')
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <button onClick={getProfile}>프로필 가져오기</button>
      <button onClick={logOut}>로그아웃 하기</button>
    </>
  );
};
export default KakaoCallback;
