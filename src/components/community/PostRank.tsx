import { useState } from 'react';
import '../../styles/Community.scss';
import PostRankList from './PostRankList';
import { searchPost } from '../../services/apiService';
import { Link } from 'react-router-dom';

function PostRank() {
  const [searchWord, setSearchWord] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchModal, setSearchModal] = useState<Boolean>(false);

  const searchCommunity = async (event: any) => {
    event.preventDefault();
    const searchResult = await searchPost(searchWord);
    console.log('검색 결과 >', searchResult);
    setSearchData(searchResult);
    setSearchModal(true);
    // console.log(searchWord);
  };

  const closeModal = () => {
    setSearchModal(false);
  };

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
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          ></input>
          {/* <button type="submit">
            <img src="bluesearch2.png" alt="검색" width={40} height={40} />
          </button> */}
        </form>
        {searchModal && (
          <div className="searchModal">
            {/* 검색 결과로 없으면 없다하기 */}
            {searchData.length > 0 ? (
              // 반복
              searchData.map((post: any) => (
                <ul>
                  <li key={post._id}>
                    <Link to={`/community/${post._id}`} state={{ post }}>
                      {/* <div>{post.title}</div>
                      <p className="listTitle">{post.content}</p> */}
                      <div style={{ width: '80%' }}>
                        <div className="listTitle">{post.title}</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
            <button onClick={closeModal}>닫기</button>
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
