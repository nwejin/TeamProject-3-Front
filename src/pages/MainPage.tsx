import React, { useEffect, useRef, useState } from 'react';
import { kakaoLogin, mainBoards, mainNews } from '../services/apiService';
import Slider from '../components/Slider';
import TrandingMiniWidget from '../components/stockGuide/TrandingMiniWidget';
import TrandingCryptoWidget from '../components/stockGuide/TrandingCryptoWidget';
import { Link } from 'react-router-dom';
import { NewsProp } from '../types/NewsProp';
import { CommunityProp } from '../types/CommunityProp';

const MainPage = () => {
  const [newsData, setNewsData] = React.useState([
    {
      thumbnail: '',
      title: '',
      content: '',
      id: '',
    },
  ]);
  const [boardData, setBoardData] = React.useState([
    {
      image: '',
      title: '',
      content: '',
      writer: '',
      date: '',
      like: 0,
      id: '',
    },
  ]);

  const [newslist, setNewslist] = useState<NewsProp[]>([]);
  const [boardlist, setBoardlist] = useState<CommunityProp[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNews();
    getBoard();
  }, []);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    // console.log(newsData);
    // console.log(boardData);
  }, [newsData, boardData]);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    const maxHeight = 100; // 필요에 따라 조절

    if (textContainer && textContainer.scrollHeight > maxHeight) {
      while (textContainer.scrollHeight > maxHeight) {
        textContainer.textContent =
          textContainer.textContent?.replace(/\W*\s(\S)*$/, '...') || '';
      }
    }
  }, []);

  const getNews = async () => {
    const response = await mainNews();
    const data = response.news;
    setNewslist(data);
    if (response.success) {
      const updateNews = data.map((news: any) => ({
        thumbnail:
          news.smallimg || process.env.PUBLIC_URL + 'board-default.png',
        title: news.title,
        content: news.content,
        id: data._id,
      }));
      // console.log(updateNews);
      // const newsArray = updateNews;
      // console.log(newsArray);

      setNewsData(updateNews);
      // console.log(newsData);
    } else {
      const newsArray = [
        {
          thumbnail: 'default-image',
          title: '등록된 뉴스가 없습니다.',
          content: '',
          id: '',
        },
      ];
      setNewsData(newsArray);
    }
  };

  const getBoard = async () => {
    const response = await mainBoards();
    const data = response.board;
    setBoardlist(data);
    // console.log('hihihiddddddd', data);
    // console.log(dsata[0].userId.user_nickname);
    if (response.success) {
      const updateBoard = data.map((boards: any) => {
        // console.log('boards:', boards);
        return {
          image: boards.image || process.env.PUBLIC_URL + 'board-default.png',
          title: boards.title,
          content: boards.content,
          writer: boards.userId.user_nickname,
          date: (boards.date as string).split('T')[0],
          like: boards.like,
          id: boards._id,
        };
      });
      // console.log(updateNews);
      // const boardArray = updateBoard;
      setBoardData(updateBoard);
      // console.log(boardData);
    } else {
      const boardArray = [
        {
          image: process.env.PUBLIC_URL + 'board-default.png',
          title: '등록된 게시글이 없습니다.',
          content: '',
          writer: '',
          date: '',
          like: 0,
          id: '',
        },
      ];
      setBoardData(boardArray);
    }
  };

  const move = (str: string) => {
    if (str === 'left') {
      if (translate === 0) {
        return;
      }
      setTranslate((prev) => prev + 67);
    } else if (str === 'right') {
      if (translate === -201) {
        return;
      }
      setTranslate((prev) => prev - 67);
    }
    console.log(translate);
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
            <img src={process.env.PUBLIC_URL + 'finance.jpg'} />
            <br />
            <Link to="/signin">
              <button key="signin-button">개미운동 시작하기</button>
            </Link>
          </div>
          {newsData.length >= 2 && (
            <div className="section2">
              {newsData.slice(0, 2).map((news, idx) => (
                <Link
                  to={`/news/detail/${newslist[idx]._id}`}
                  state={{ data: newslist[idx] }}
                  key={idx}
                >
                  <div className="main-news" key={idx}>
                    <img className="main-news-thumbnail" src={news.thumbnail} />
                    <div className="main-news-text">
                      <div className="main-news-title">{news.title}</div>
                      <div className="main-news-point point-latest">최신</div>
                      <div className="main-news-point point-news">뉴스</div>
                      <div className="main-news-content" ref={textContainerRef}>
                        {news.content}
                      </div>
                    </div>
                  </div>
                </Link>
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
      </div>
      <div className="point-section">
        <div className="outer-wrapper">
          <div className="thumb-title">개미의 시선</div>
          <div className="inner-wrapper">
            <div className="main-community">
              <div
                className="section5"
                style={{ transform: `translate(${translate}vw)` }}
              >
                <Slider boardlist={boardlist} boardData={boardData} />
              </div>
            </div>
          </div>
          <div className="slider-btn-group">
            <div className="slider-btn-left" onClick={() => move('left')}>
              <span className="material-symbols-rounded">chevron_left</span>
            </div>

            <div className="slider-btn-right" onClick={() => move('right')}>
              <span className="material-symbols-rounded">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
