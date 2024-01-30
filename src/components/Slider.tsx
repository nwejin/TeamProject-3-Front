import React from 'react';

const Slider = ({ boardData }: any) => {
  return (
    <>
      {boardData.map((board: any, idx: number) => (
        <div className="main-board" key={idx}>
          <img className="main-board-image" src={board.image} />
          <div className="main-board-title">{board.title}</div>
          <div className="main-board-content">{board.content}</div>
          <div className="main-board-info">
            <div className="main-board-comment">
              <span className="material-symbols-rounded">comment</span>
              <div className="main-icon">{board.like}</div>
            </div>
            <div className="main-board-like">
              <span className="material-symbols-rounded">favorite</span>
              <div className="main-icon">{board.like}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Slider;
