import React from 'react';
import { Link } from 'react-router-dom';

const Slider = ({ boardData, boardlist }: any) => {
  console.log('boardData', boardData);
  console.log('boardlist', boardlist);
  return (
    <>
      {boardlist === undefined && (
        <div className="main-board" key={boardData[0].image}>
          <img className="main-board-image" src={boardData[0].image} />
          <div className="main-board-title">{boardData[0].title}</div>
          <div className="main-board-content">{boardData[0].content}</div>
          <div className="main-board-info">
            <div className="main-board-info-flex">
              <div className="main-board-writer">
                <div className="main-board-nickname">{boardData[0].writer}</div>
                <div className="main-board-date">{boardData[0].date}</div>
              </div>
              <div className="main-board-comment">
                <span className="material-symbols-rounded">comment</span>
                <div className="main-icon">{boardData[0].like}</div>
              </div>
              <div className="main-board-like">
                <span className="material-symbols-rounded">favorite</span>
                <div className="main-icon">{boardData[0].like}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {boardlist === undefined ||
        boardData.map((board: any, idx: number) => (
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
