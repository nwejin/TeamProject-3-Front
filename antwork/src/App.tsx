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

import CommunityMain from './pages/community/CommunityMain';
import CommunityReadPage from './pages/community/CommunityReadPage';
import axios from 'axios';
import NewsPage from './pages/NewsPage';
import KakaoCallback from './components/KakaoCallback';
import NewsDetailPage from './pages/NewsDetailPage';
import StockGuidePage from './pages/stockGuide/StockGuidePage';
import MyPage from './pages/member/MyPage';
import Virtual from './pages/Virtual';

// import ExampleComponent from "./components/ExampleComponent";

function App() {
  const [serverData, setServerData] = useState('');
  useEffect(() => {
    // React 컴포넌트가 마운트될 때 한 번 실행
    fetchDataFromServer();
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
          <Route path="/kakao/callback" element={<KakaoCallback />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route path="/stockGuide" element={<StockGuidePage />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<CommunityMain />} />
          {/* 커뮤니티 상세보기 */}
          <Route path="/community/:id" element={<CommunityReadPage />} />

          <Route path="/virtual" element={<Virtual />} />
        </Routes>
      </BrowserRouter>
      {/* <ExampleComponent></ExampleComponent> */}
      {/* <div className="class">{serverData}</div> */}
      <div>{serverData}</div>
    </div>
  );
}

export default App;
