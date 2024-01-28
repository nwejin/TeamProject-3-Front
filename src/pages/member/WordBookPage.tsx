import React from 'react';
import Word from '../../components/news/Word';
import '../../styles/WordBook.scss';
import { wordBook } from '../../services/apiService';
import { useCookies } from 'react-cookie';

const WordBookPage = () => {
  const [wordData, setWordData] = React.useState([
    {
      title: '',
      content: '',
    },
  ]);

  const getWords = async () => {
    const response = await wordBook({ word: wordData[0].title });
    const data = response.words;
    if (response.success) {
      const updateWords = data.map((word: any) => ({
        title: word.title,
        content: word.content,
      }));
      console.log(updateWords);
      const wordArray = updateWords;
      console.log(wordArray);

      setWordData(wordArray);
      console.log(wordData);
    } else {
      const wordArray = [
        {
          title: '등록된 단어가 없습니다.',
          content: '',
        },
      ];
      setWordData(wordArray);
    }
  };

  return (
    <>
      <div className="outer-wrapper">
        <div className="page-title">
          단어장
          <div className="word-btn-group">
            <div className="word-btn btn-selected">최신순</div>
            <div className="word-btn">가나다순</div>
          </div>
        </div>
        <div className="wordBook-hr"></div>
        <div className="wordBook">
          {/* {wordData.map((words) => ( */}
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          <Word wordData={wordData} />
          {/* ))} */}
        </div>
      </div>
    </>
  );
};

export default WordBookPage;
