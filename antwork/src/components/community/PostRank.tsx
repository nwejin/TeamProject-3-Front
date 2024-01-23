import '../../styles/Community.scss';
import PostRankList from './PostRankList';

function PostRank() {
  return (
    <>
      <input type="text" name="" id="" placeholder="검색어를 입력하세요" />
      <div className="postListBox">
        <div className="postListTitle">
          <span>인기글</span>
        </div>
        <div className="postListContent">
          <ul>
            <PostRankList></PostRankList>
            <PostRankList></PostRankList>
        
          </ul>
        </div>
      </div>
    </>
  );
}

export default PostRank;
