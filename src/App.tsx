import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/Component.scss';
import './styles/Header.scss';
import './styles/Signin.scss';
import './styles/Main.scss';

import Header from './components/Header';
import MainPage from './pages/MainPage';
import SigninPage from './pages/member/SigninPage';
import SignupPage from './pages/member/SignupPage';
import FindIdPage from './pages/member/FindIdPage';

import NewsPage from './pages/news/NewsPage';
import NewsDetailPage from './pages/news/NewsDetailPage';

import CommunityMain from './pages/community/CommunityMain';
import CommunityReadPage from './pages/community/CommunityReadPage';
import axios, { AxiosError } from 'axios';
import StockGuidePage from './pages/stockGuide/StockGuidePage';
import MyPage from './pages/member/MyPage';
import WordBookPage from './pages/member/WordBookPage';
import NotFound from './pages/error/404Page';
import ServerError from './pages/error/500Page';
import Virtual from './components/VirtualInvest/Virtual';
import StockVirtualPage from './pages/stockGuide/StockVirtualPage';
import StockRatePage from './pages/stockGuide/StockRatePage';

function App() {
  const [serverData, setServerData] = useState('');
  const [errorNum, setErrorNum] = useState(0);

  useEffect(() => {
    // React 컴포넌트가 마운트될 때 한 번 실행
    fetchDataFromServer();
    notFoundError();
  }, []);

  const fetchDataFromServer = async () => {
    if (process.env.REACT_APP_BACKSERVER) {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKSERVER!, {
          withCredentials: true, // axios에서는 credentials를 설정할 때 withCredentials를 사용
          headers: {
            'Content-Type': 'application/json',
            // 필요에 따라 다른 헤더를 추가할 수 있음
          },
        });

        console.log(response.data);
        setServerData(response.data.message);
      } catch (error) {
        console.error('Error fetching data with axios:', error);
      }
    } else {
      return;
    }
  };

  const notFoundError = async () => {
    try {
      console.log(window.location.pathname);
      const currentPath = 'http://localhost:3000' + window.location.pathname;
      const response = await axios.get(currentPath, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status === 200) {
        return;
      } else if (response.status === 500) {
        setErrorNum(500);
      } else {
        setErrorNum(404);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 여기에서 axiosError.response를 사용할 수 있습니다.
        console.log(axiosError.response.status);
        const err = axiosError.response.status;
        if (err === 200) {
          return;
        } else if (err === 500) {
          setErrorNum(500);
          // window.location.href = '/500';
        } else {
          setErrorNum(404);
          // window.location.href = '/404';
        }
      }
      console.log(error);
    }
  };
  // if (error) {
  //   if (error.response && error.response.status === 404) {
  //     // 404 에러가 발생한 경우 404 페이지로 리다이렉션
  //     return <Navigate to="/404" />;
  //   } else {
  //     // 다른 모든 에러는 500 서버 에러 페이지로 리다이렉션
  //     return <Navigate to="/500" />;
  //   }
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/news/:group?" element={<NewsPage />} />
          <Route path="/news/detail/:id" element={<NewsDetailPage />} />

          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/kakao/callback" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/wordBook" element={<WordBookPage />} />

          <Route path="/stockGuide" element={<StockGuidePage />} />
          <Route path="/stockRate" element={<StockRatePage />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<CommunityMain />} />
          {/* 커뮤니티 상세보기 */}
          <Route path="/community/:id" element={<CommunityReadPage />} />

          {/* <Route path="/virtual" element={<Virtual />} /> */}
          <Route path="/virtual" element={<StockVirtualPage />} />

          {/* 404 에러 페이지 */}
          {errorNum === 404 && <Route path="*" element={<NotFound />} />}

          {/* 500 서버 에러 페이지 */}
          {errorNum === 500 && <Route path="*" element={<ServerError />} />}
        </Routes>
      </BrowserRouter>
      <div>{serverData}</div>
    </div>
  );
}

export default App;
