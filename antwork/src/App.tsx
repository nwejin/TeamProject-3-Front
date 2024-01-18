import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/Component.scss';
import './styles/Header.scss';
import './styles/Signin.scss';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import FindIdPage from './pages/FindIdPage';
import CommunityMain from './community/CommunityMain';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/signin" element={<SigninPage/>} />
          <Route path="/signup" element={< SignupPage />} />
          <Route path="/" element={< MainPage />} />
          <Route path="/findId" element={< FindIdPage />} />
          {/* <Route path="/stockGuide" element={<MainPage />} /> */}
          <Route path="/community" element={<CommunityMain />} />
        </Routes>
      </BrowserRouter>

      {/* <div className='class'>hi</div> */}

    </div>
  );
}

export default App;
