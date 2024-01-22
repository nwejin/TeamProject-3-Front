function CommunityRead() {
  return (
    <div className="postRead">
      {/* 콘텐츠 박스*/}
      <div className="postContents">
        {/* 유저 정보*/}
        <div className="userProfile">
          <div className="profile">
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
          <div>
            <span className="category">경제</span>
          </div>
        </div>

        {/* 게시글 */}
        <div className="contentBox">
          <div className="textContent">
            <p className="title">안녕하세요 제목입니다.</p>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
              aut fugiat iusto, voluptatem a sequi est Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Reprehenderit cumque officia,
              corporis hic debitis, voluptatibus rerum pariatur recusandae
              dolorem sit, animi minus vitae itaque aspernatur blanditiis
              consectetur. Aliquid, enim nesciunt. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Architecto, dignissimos nulla ex
              quia possimus saepe maiores alias velit, soluta assumenda, quidem
              commodi cum accusantium repellendus quis dolorem unde consequuntur
              voluptatibus!
            </p>
          </div>
        </div>

        <div className="readImgBox">
          <img src="https://wimg.mk.co.kr/news/cms/202303/06/news-p.v1.20230303.7da9e984074048beb88b016ae6e26b68_P1.jpg" />
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
          <div className="report">
            <span>
              <button>
                <span className="material-symbols-outlined">
                  notification_important
                </span>
                <span>신고하기</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityRead;
