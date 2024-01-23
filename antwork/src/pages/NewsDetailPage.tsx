import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import { WordsProp } from "../types/WordsProp"
import "../styles/Highlight.scss"

function NewsDetailPage() {
    const location = useLocation()
    const data = location.state.data;
    const [content, setContent] = useState(data.content);
    // const [wordsDb, setWordsDb] = useState([]);

    const getWords = async () => {
        try{
            const wordsArry = await axios.get(process.env.REACT_APP_BACKSERVER + "/news/getWords")
            const wordsData = wordsArry.data
            const newWordsList = wordsData.map((singleData: WordsProp) => {
                return singleData.word 
            });

            // setWordsList(newWordsList);
            setContent(highlightContent(data.content, newWordsList));

            // setContent(highlightContent(content, wordsList));
        } catch(error) {
            console.error("Error fetching data from server:", error);
        }
    }

    useEffect(() => {
        getWords();
    }, []);


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
        const regex = new RegExp(`(${sortedWordsList.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
        let highlightedWords: Set<string> = new Set();
    
        const clickWords = (e: any) => {
            alert(e.target.innerText);
        };
    
        return content.split(regex).map((word, index) => {
            if (regex.test(word) && !highlightedWords.has(word)) {
                highlightedWords.add(word);
                return <span key={index} className="highlight" onClick={clickWords}>{word}</span>;
            } else {
                return word;
            }
        });
    };
    


    return (
        <>
            <h1>{data.title}</h1>
            <p>{data.date}</p>
            <img src={data.bigimg} alt={data.title} />
            <p>{content}</p>
        </>
    );
}

export default NewsDetailPage;
