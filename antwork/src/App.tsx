import React from 'react';
import './styles/Component.scss';
import './styles/Header.scss';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/news" element={< MainPage />} />
          {/* <Route path="/stockGuide" element={<MainPage />} /> */}
          {/* <Route path="/community" element={<MainPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <div className='class'>hi</div> */}
    </div>
  );
}

export default App;
