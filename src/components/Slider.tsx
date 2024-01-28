import React from 'react';
// import SlickSlider from 'react-slick'; // 변경된 부분
// import '../styles/Slider.scss'; // 상대 경로 사용
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const Slider = ({ boardData }: any) => {
  return (
    <>
      {boardData.map((board: any, idx: number) => (
        <div className="main-board" key={idx}>
          <img className="main-board-image" src={board.image} />
          <div className="main-board-title">{board.title}</div>
          <div className="main-board-content">{board.content}</div>
        </div>
      ))}
    </>
  );
};

export default Slider;
