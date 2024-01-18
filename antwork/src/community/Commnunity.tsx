import '../styles/Community.scss';

function Community() {
  return (
    <div className="post">
      {/* 콘텐츠 박스*/}
      <div className="postContents">
        {/* 유저 정보*/}
        <div className="userProfile">
          <span>
            <a href="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                alt=""
              />
              <p> 작성자</p>
            </a>
          </span>
          <span>•</span>
          <span>10분전</span>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <a href="/">
              <p className="title">
                안녕하세요 Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Laudantium quisquam ut dolor inventore sequi voluptatem.
                Maxime corrupti necessitatibus quo rem commodi officia ipsa,
                magni nesciunt repellendus sit, illo illum tempore!
              </p>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
                aut fugiat iusto, voluptatem a sequi est rerum. Praesentium
                architecto alias dolorum, adipisci voluptas officiis, quae Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
                similique voluptatibus hic ullam veniam minus ex non nulla
              </p>
            </a>
          </div>

          <div className="imgBox">
            <a href="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                alt=""
              />
            </a>
          </div>
        </div>

        {/* 아이콘 리스트 */}
        <div className="statusBox">
          <div>
            <span>
              <button>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <span>0</span>
            </span>

            <span>
              <button>
                <span className="material-symbols-outlined">maps_ugc</span>
              </button>
              <span>0</span>
            </span>
          </div>
          <span className="category">경제</span>
        </div>
      </div>
    </div>
  );
}

export default Community;
