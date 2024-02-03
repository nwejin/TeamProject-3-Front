import { useState, useEffect } from 'react';
import '../../styles/Community.scss';
import PostRankList from './PostRankList';
import { searchPost } from '../../services/apiService';
import { Link } from 'react-router-dom';

function PostRank() {
  const [searchWord, setSearchWord] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchModal, setSearchModal] = useState(false);

  const searchCommunity = async (event: any) => {
    event.preventDefault();

    if (!searchWord) {
      setSearchModal(false); // 검색어가 비어있으면 모달 닫기
      return;
    }

    const searchResult = await searchPost(searchWord);

    if (searchResult.length === 0) {
      setSearchData([]); // 결과가 없으면 데이터 초기화
      setSearchModal(true);
    } else {
      setSearchData(searchResult);
      setSearchModal(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (searchModal && !event.target.closest('.searchModal')) {
        setSearchModal(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [searchModal]);

  return (
    <>
      <div className="searchBox">
        <form onSubmit={searchCommunity}>
          <input
            type="text"
            name="postSearch"
            id="postSearch"
            placeholder="검색어를 입력하세요"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </form>
        {searchModal && (
          <div className="searchModal">
            {searchData.length > 0 ? (
              searchData.map((post: any) => (
                <div className="post" key={post._id}>
                  <div className="postContents">
                    <Link to={`/community/${post._id}`} state={{ post }}>
                      {/* 유저 정보*/}
                      <div className="userProfile">
                        <span>
                          <img
                            src={post.userId.user_profile}
                            alt="기본 이미지"
                          />
                        </span>
                        <p style={{ marginRight: '5px' }}>
                          {post.userId.user_nickname}
                        </p>
                        <span style={{ fontSize: '10px' }}>•</span>
                      </div>
                    </Link>

                    {/* 게시글 */}

                    <div className="contentBox">
                      <div className="textContent">
                        <Link to={`/community/${post._id}`} state={{ post }}>
                          <p
                            className="title"
                            onClick={() => console.log('포스트임', post)}
                          >
                            {post.title}
                          </p>
                          <p className="text">{post.content}</p>
                        </Link>
                      </div>

                      <div className="imgBox">
                        <Link to={`/community/${post._id}`} state={{ post }}>
                          <img src={post.image} alt="" />
                        </Link>
                      </div>
                    </div>

                    {/* 아이콘 리스트 */}
                    <div className="statusBox">
                      <div>
                        <span>
                          {/* 이 버튼이 눌리면 DB Like에 1씩 증가 */}
                          <button>
                            <span className="material-symbols-outlined heart">
                              heart_plus
                            </span>
                            <span>좋아요</span>
                          </button>
                          <span>{post.like}</span>
                        </span>

                        <span>
                          <button>
                            <span className="material-symbols-outlined">
                              maps_ugc
                            </span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="notFoundPost">
                <p>검색 결과가 없습니다.</p>
                <p style={{ fontSize: '18px', color: '#808080' }}>
                  다른 검색어를 입력해주세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="postListBox">
        <div className="postListTitle">
          <span>인기글</span>
        </div>
        <div className="postListContent">
          <ul>
            <PostRankList></PostRankList>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PostRank;
