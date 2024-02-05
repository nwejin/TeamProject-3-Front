import '../../styles/Error.scss';

const AdminError = () => {
  return (
    <>
      <div className="outer-wrapper">
        <div className="error-wrapper">
          <img
            className="error-img"
            src={process.env.PUBLIC_URL + '/403.png'}
            alt=""
          />
          <div className="error-msg">페이지를 찾을 수 없습니다.</div>
          <div className="error-detail">
            원하시는 결과를 찾을 수 없습니다. 올바른 URL을 입력하였는지
            확인하세요. 자세한 내용은 사이트 소유자에게 문의하시기 바랍니다.
          </div>
          <div className="back-to-main">메인으로 돌아가기</div>
        </div>
      </div>
    </>
  );
};
export default AdminError;
