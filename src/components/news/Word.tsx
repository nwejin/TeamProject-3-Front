import '../../styles/WordBook.scss';

const Word = ({ wordData }: any) => {
  return (
    <>
      <div className="word-wrapper">
        <div className="word-title">개미</div>
        <div className="word-description">
          소액을 운용하는 일반 주식투자자를 일컫는 투자용어.
        </div>
        <div className="word-delete-btn">
          <span className="material-symbols-rounded">delete</span>
        </div>
      </div>
    </>
  );
};

export default Word;
