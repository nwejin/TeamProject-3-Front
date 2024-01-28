import '../../styles/Community.scss';
import CommuniutyHeader from '../../components/community/CommunityHeader';
import CommunityRead from '../../components/community/CommunityRead';

function CommunityReadPage() {
  return (
    <div className="main">
      <CommuniutyHeader />

      <div className="communityReadBox">
        <CommunityRead />
      </div>
    </div>
  );
}

export default CommunityReadPage;
