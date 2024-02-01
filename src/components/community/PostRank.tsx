import { useState } from 'react';
import '../../styles/Community.scss';
import PostRankList from './PostRankList';
import { searchPost } from '../../services/apiService';

function PostRank() {
  const [searchWord, setSearchWord] = useState('');
  const searchCommunity = async (event: any) => {
    event.preventDefault();
    const searchResult = await searchPost(searchWord);
    console.log('검색 결과 >', searchResult);
    // console.log(searchWord);
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
          <button type="submit">
            <img src="bluesearch2.png" alt="검색" width={40} height={40} />
          </button>
        </form>
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
