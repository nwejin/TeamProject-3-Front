import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WordsProp } from '../../types/WordsProp';
import '../../styles/NewsDetail.scss';
import WordModal from '../../components/news/WordModal';
import { useCookies } from 'react-cookie';

function NewsDetailPage() {
    const location = useLocation()
    const data = location.state.data;
    const [content, setContent] = useState(data.content);

    const [wordsList, setWordsList] = useState<string[]>([]);
    const [wordsDb, setWordsDb] = useState([]);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [modalWord, setModalWord] = useState<WordsProp | null>(null)

    const [cookies, setCookie, removeCookie] = useCookies(['jwtCookie']);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [isDraggable, setIsDraggable] = useState<boolean>(false);
    const [myHighlight, setMyHighlight] = useState<string[]|null>([]);



    const getWords = async () => {
        try{
            // Db에서 단어 데이터 요청
            const wordsArry = await axios.get(process.env.REACT_APP_BACKSERVER + "/news/getWords")
            const wordsData = wordsArry.data
            const newWordsList = wordsData.map((singleData: WordsProp) => {
                return singleData.word 
            });
            // Db에서 받은 단어 데이터 중 word만 저장
            setWordsList(newWordsList);

            // Db에서 받은 단어 데이터 전체 저장
            setWordsDb(wordsData);
            // setContent(highlightContent(data.content, newWordsList));
            // setContent(highlightContent(content, wordsList));
        } catch(error) {
            console.error("Error fetching data from server:", error);
        }
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    // wordsList가 업데이트되면 content를 하이라이트 처리
    if (wordsList.length > 0 && data.content) {
      setContent(highlightContent(data.content, wordsList));
    }
  }, [data.content, wordsList]);

  // Db에 있는 단어 하이라이트
  const highlightContent = (content: string, wordsList: string[]) => {
    const sortedWordsList = wordsList.sort((a, b) => b.length - a.length);
    const regex = new RegExp(
      `(${sortedWordsList
        .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|')})`,
      'g'
    );

    let highlightedWords: Set<string> = new Set();

    // 하이라이트 된 단어 클릭
    const handleWordClick = async (
      word: string,
      positon: { top: number; left: number }
    ) => {
      // 클릭한 단어의 위치 저장
      setModalPosition(positon);

      // 클릭한 단어와 관련된 데이터를 가져오고 필요에 따라 처리
      const wordData = wordsDb.find(
        (singleData: WordsProp) => singleData.word === word
      );
      // console.log('word >',word);
      // console.log('wordsDb', wordsDb)

      if (wordData) {
        // console.log('클릭한 단어에 대한 데이터:', wordData);

        // 모달에서 보여줄 단어 저장
        setModalWord(wordData);
        // 모달 열기
        setOpenModal(true);
      } else {
        console.error('클릭한 단어에 대한 데이터를 찾을 수 없습니다.');
      }
    };

    return content.split(regex).map((word, index) => {
      if (regex.test(word) && !highlightedWords.has(word)) {
        highlightedWords.add(word);
        return (
          <span
            key={index}
            className="highlight"
            onClick={(e) =>
              handleWordClick(word, {
                top: e.currentTarget.offsetTop,
                left: e.currentTarget.offsetLeft,
              })
            }
          >
            {word}
          </span>
        );
      } else {
        return word;
      }
    });
  };

  // useEffect(()=>{
  //     console.log(modalWords)
  // }, [modalWords])

  // 모달 닫기 버튼 함수
  const closeModal = () => {
    setOpenModal(false);
    setModalWord(null);
  };

  useEffect(() => {
    const checkMyNews = async () => {
      const tokenId = cookies['jwtCookie']; // 대괄호를 사용하여 속성에 액세스합니다.
      // console.log(tokenId);
      if (tokenId) {
        const checkNews = await axios.get(
          process.env.REACT_APP_BACKSERVER + '/news/checkMyNews',
          {
            params: { data },
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${tokenId}`,
            },
            withCredentials: true,
          }
        );
        console.log(checkNews.data);
        setIsSaved(checkNews.data.isSavedNews);
      }
    };
    checkMyNews();
  }, [cookies, data]);


    // 기사 저장 
    const myNews = async () => {
        const tokenId = cookies['jwtCookie'];  // 대괄호를 사용하여 속성에 액세스합니다.
        if(!tokenId){
            alert('로그인 후 사용가능한 기능입니다.');
        } else {
            setIsSaved(!isSaved);
            const saveMyNews = await axios.post(process.env.REACT_APP_BACKSERVER + "/news/saveMynews",{data},
             {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
              )
        }

    }


    // 드래그 가능 여부
    const draggable = () => {
        // const tokenId = cookies['jwtCookie'];
        // if(!tokenId) {
        //     alert('로그인 후 사용가능한 기능입니다.');
        // } else {
        //     setIsDraggable(!isDraggable);
        // }
        setIsDraggable(!isDraggable)
    }

    // 드래그 : 직접 형광펜 기능
    const dragText = (event:any) => {
        if(isDraggable) {
            // event.preventDefault();
            const selection = window.getSelection();
            const selectedTxt = selection?.toString() || '';
            console.log('selection >', selection);
            console.log('selectedText >', selectedTxt);

            if (selection && selectedTxt) {
                const range = selection.getRangeAt(0);
    
                // 추출된 내용
                const extractedContents = range.extractContents();
    
                // 새로운 span 요소 생성
                const span = document.createElement('span');
                span.style.backgroundColor = 'yellow'; // 원하는 백그라운드 컬러로 변경
                span.appendChild(extractedContents);
    
                // 추출된 내용 대신에 span 태그를 삽입
                range.insertNode(span);

                const saveMyHighlight = axios.post(process.env.REACT_APP_BACKSERVER + "/news/myHighlight",{
                    //텍스트랑 뉴스아이디 보내야
                    selectedTxt,
                    news_id: data._id
            },
                {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                  })
            }

        } else {
            // 드래그 불가능 상태일 때는 드래그 이벤트 무시
            event.preventDefault();
          }
    }


    return (
        <>
            <main className='outer-wrapper'>
                <ul className='tool'>
                    <li className={`pen ${isDraggable ? 'active' : ''}`} onClick={draggable}>형광펜</li>
                    <li className={`saveNews ${isSaved ? 'active' : ''}`} onClick={myNews}>저장</li>
                </ul>
                
                <h1>{data.title}</h1>
                <p className='detailDate'>{data.date}</p>

                <img className='detailImg' src={data.bigimg} alt={data.title} />
                <h3>{data.subtitle}</h3>
              
                <p className='detailContent' 
                onMouseUp={dragText}
                >{content}</p>
                <p>출처 : {data.url}</p>
                
                

            {/* 모달 */}
                {openModal && modalWord && <WordModal modalWord={modalWord} closeModal={closeModal} modalPosition={modalPosition}/>}
            </main>

        </>
    
    );

}

export default NewsDetailPage;
