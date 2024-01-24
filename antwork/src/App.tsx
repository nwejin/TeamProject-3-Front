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
import Redirection from './components/Redirection';
import NewsDetailPage from './pages/NewsDetailPage';
import StockGuidePage from './pages/stockGuide/StockGuidePage';
import MyPage from "./pages/member/MyPage";

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
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/all" element={<NewsPage />} />
          <Route path="/news/economy" element={<NewsPage />} />
          <Route path="/news/stock" element={<NewsPage />} />
          <Route path="/news/coin" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />

          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/kakao/callback" element={<Redirection />} />
          <Route path="/stockGuide" element={<StockGuidePage />} />
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community/read" element={<CommunityReadPage />} />
        </Routes>
      </BrowserRouter>
      {/* <ExampleComponent></ExampleComponent> */}
      {/* <div className="class">{serverData}</div> */}
      <div>{serverData}</div>
    </div>
  );
}

export default App;
