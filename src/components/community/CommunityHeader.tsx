import { useState } from 'react';
import AddPost from '../../pages/community/AddPost';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// 커뮤니티 페이지 헤더(글 작성 포함)
function CommuniutyHeader() {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const cookie = useCookies(['jwtCookie']);
  // console.log(cookie[0].jwtCookie);
  const navigate = useNavigate();
  const notLogin = () => {
    navigate('/signin');
  };

  const showModal = () => {
    if (cookie[0].jwtCookie) {
      setOpenModal(true);
    } else {
      alert('로그인 후 게시글 작성 가능합니다.');
      notLogin();
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  //페이지 이동

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
