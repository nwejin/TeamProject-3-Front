import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import { WordsProp } from "../types/WordsProp"
import "../styles/NewsDetail.scss"

function NewsDetailPage() {
    const location = useLocation()
    const data = location.state.data;
    const [content, setContent] = useState(data.content);
    const [wordsList, setWordsList] = useState([]);
    const [wordsDb, setWordsDb] = useState([]);

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
    }

    useEffect(() => {
        getWords();
    }, []);

    useEffect(()=> {
        
    })

    useEffect(() => {
        // wordsList가 업데이트되면 content를 하이라이트 처리
        if (wordsList.length > 0 && data.content) {
          setContent(highlightContent(data.content, wordsList));
        }
      }, [data.content, wordsList]);


    // **** 중복 단어 모두 하이라이트
    // const highlightContent = (content: string, wordsList: string[]) => {
    //     const regex = new RegExp(`(${wordsList.join('|')})`, 'gi');
    //     // console.log(regex);
    //     return content.split(regex).map((word, index) =>
    //         regex.test(word) ? <span key={index} className="highlight">{word}</span> : word
    //     );
    // };
    

    // 중복 단어 한 번만 하이라이트
    // const highlightContent = (content: string, wordsList: string[]) => {
    //     const regex = new RegExp(`(${wordsList.join('|')})`, 'gi');
    //     let highlightedWords: Set<string> = new Set();
    

    //     const clickWords = (e : any) => {
    //         // console.log(e.target.innerText)
    //         alert(e.target.innerText)            
    //         }

    //     return content.split(regex).map((word, index) => {
    //         if (regex.test(word) && !highlightedWords.has(word)) {
    //             highlightedWords.add(word);
    //             return <span key={index} className="highlight" onClick={clickWords}>{word}</span>;
    //         } else {
    //             return word;
    //         }
    //     });
    // };
    
        // const highlightContent = (content: string, wordsList: string[]) => {
    //     // 길이를 기준으로 내림차순으로 단어 정렬
    //     const sortedWordsList = wordsList.sort((a, b) => b.length - a.length);
    //     const regex = new RegExp(`(${sortedWordsList.join('|')})`, 'gi');
    //     let highlightedWords: Set<string> = new Set();
    
    //     const clickWords = (e: any) => {
    //         alert(e.target.innerText);
    //     };
    
    //     return content.split(regex).map((word, index) => {
    //         if (regex.test(word) && !highlightedWords.has(word)) {
    //             highlightedWords.add(word);
    //             return <span key={index} className="highlight" onClick={clickWords}>{word}</span>;
    //         } else {
    //             return word;
    //         }
    //     });
    // };
    

    const highlightContent = (content: string, wordsList: string[]) => {
        const sortedWordsList = wordsList.sort((a, b) => b.length - a.length);
        const regex = new RegExp(`(${sortedWordsList.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    
        let highlightedWords: Set<string> = new Set();
        
        // 하이라이트 된 단어 클릭
        const handleWordClick = (word: string) => {
            // 클릭한 단어와 관련된 데이터를 가져오고 필요에 따라 처리
            const wordData = wordsDb.find((singleData: WordsProp) => singleData.word === word);
            console.log('word >',word);
            // console.log('wordsDb', wordsDb)
            if (wordData) {
              console.log('클릭한 단어에 대한 데이터:', wordData);
              // 데이터 처리 로직을 추가
            } else {
              console.error('클릭한 단어에 대한 데이터를 찾을 수 없습니다.');
            }
          };
    
        return content.split(regex).map((word, index) => {
            if (regex.test(word) && !highlightedWords.has(word)) {
                highlightedWords.add(word);
                return <span key={index} className="highlight" onClick={() => handleWordClick(word)}>{word}</span>;
            } else {
                return word;
            }
        });
    };
    


    return (
        <>
            <main>
                <h1>{data.title}</h1>
                <p>{data.date}</p>
                <img src={data.bigimg} alt={data.title} />
                <p style={{ whiteSpace: 'pre-line'}} className='detailContent'>{content}</p>
                <p>출처 : {data.url}</p>
            </main>
        </>
    
    );
}

export default NewsDetailPage;
