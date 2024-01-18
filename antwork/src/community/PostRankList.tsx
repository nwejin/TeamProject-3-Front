import '../styles/Community.scss';

function PostRankList() {
  return (
    <>
      <li>
        <a href="/">
          <div>
            <div className="category">
              <span>경제</span>
            </div>
            <div className="listTitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className="listComment">
            <span className="material-symbols-outlined">maps_ugc</span>
            <span>18</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default PostRankList;
