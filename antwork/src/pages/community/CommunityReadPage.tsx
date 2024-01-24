import '../../styles/Community.scss';
import CommuniutyHeader from '../../components/community/CommunityHeader';
import CommunityRead from '../../components/community/CommunityRead';
import Comment from '../../components/community/Comment';
import CommentWrite from '../../components/community/CommentWrite';

function CommunityReadPage() {
  return (
    <div className="main">
      <CommuniutyHeader />

      <div className="communityReadBox">
        <CommunityRead />
      </div>

      <div className="countComment">
        <span>댓글</span> <span>2</span>
      </div>

      <div className="commentBox">
        <Comment></Comment>
        <Comment></Comment>
        <CommentWrite />
      </div>
    </div>
  );
}

export default CommunityReadPage;
