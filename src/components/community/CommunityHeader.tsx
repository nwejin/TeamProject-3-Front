import { useState } from 'react';
import AddPost from '../../pages/community/AddPost';

function CommuniutyHeader() {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  
  return (
    <div className="communityHeader">
      <a href="/community">
        <h2> 커뮤니티</h2>
      </a>

      <button onClick={showModal}>글 작성</button>
      {openModal && <AddPost open={openModal} close={closeModal} />}
    </div>
  );
}

export default CommuniutyHeader;
