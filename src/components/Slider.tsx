import React from 'react';
import { Link } from 'react-router-dom';

const Slider = ({ boardData, boardlist }: any) => {
  return (
    <>
      {boardData.map((board: any, idx: number) => (
        <Link
          to={`/community/${boardData[idx]._id}`}
          state={{ post: boardlist[idx] }}
          key={board.id}
        >
          <div className="main-board" key={idx}>
            <img className="main-board-image" src={board.image} />
            <div className="main-board-title">{board.title}</div>
            <div className="main-board-content">{board.content}</div>
            <div className="main-board-info">
              <div className="main-board-info-flex">
                <div className="main-board-writer">
                  <div className="main-board-nickname">{board.writer}</div>
                  <div className="main-board-date">{board.date}</div>
                </div>
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
          </div>
        </Link>
      ))}
    </>
  );
};

export default Slider;
