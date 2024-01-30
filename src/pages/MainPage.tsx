import React, { useEffect, useState } from 'react';
import { kakaoLogin, mainBoards, mainNews } from '../services/apiService';
import Slider from '../components/Slider';
import TrandingMiniWidget from '../components/stockGuide/TrandingMiniWidget';
import TrandingCryptoWidget from '../components/stockGuide/TrandingCryptoWidget';

const MainPage = () => {
  const [newsData, setNewsData] = React.useState([
    {
      thumbnail: '',
      title: '',
      content: '',
    },
  ]);
  const [boardData, setBoardData] = React.useState([
    {
      image: '',
      title: '',
      content: '',
    },
  ]);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    if (code) {
      kakaoLogin(code);
    }
    getNews();
    getBoard();
  }, []);

  useEffect(() => {
    console.log(newsData);
    console.log(boardData);
  }, [newsData, boardData]);

  const getNews = async () => {
    const response = await mainNews();
    const data = response.news;
    if (response.success) {
      const updateNews = data.map((news: any) => ({
        thumbnail: news.smallimg || process.env.PUBLIC_URL + 'graph.png',
        title: news.title,
        content: news.content,
      }));
      console.log(updateNews);
      const newsArray = updateNews;
      console.log(newsArray);

      setNewsData(newsArray);
      console.log(newsData);
    } else {
      const newsArray = [
        {
          thumbnail: 'default-image',
          title: '등록된 뉴스가 없습니다.',
          content: '',
        },
      ];
      setNewsData(newsArray);
    }
  };

  const getBoard = async () => {
    const response = await mainBoards();
    const data = response.board;
    if (response.success) {
      const updateBoard = data.map((boards: any) => ({
        image: boards.image || process.env.PUBLIC_URL + 'graph.png',
        title: boards.title,
        content: boards.content,
      }));
      // console.log(updateNews);
      const boardArray = updateBoard;
      setBoardData(boardArray);
      console.log(boardData);
    } else {
      const boardArray = [
        {
          image: 'default-image',
          title: '등록된 게시글이 없습니다.',
          content: '',
        },
      ];
      setBoardData(boardArray);
    }
  };

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
          {newsData.length >= 2 && (
            <div className="section2">
              {newsData.slice(0, 2).map((news) => (
                <div className="main-news" key={news.thumbnail}>
                  <img className="main-news-thumbnail" src={news.thumbnail} />
                  <div className="main-news-text">
                    <div className="main-news-title">{news.title}</div>
                    <div className="main-news-content">{news.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="inner-wrapper">
          <div className="section3">
            <TrandingMiniWidget />
          </div>
          <div className="section4">
            <TrandingCryptoWidget />
          </div>
        </div>
        <div className="thumb-title">개미의 시선</div>
        <div className="inner-wrapper">
          <div className="main-community">
            <div className="section5">
              <Slider boardData={boardData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
