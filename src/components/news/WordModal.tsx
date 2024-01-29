import axios from "axios";
import { WordsProp } from "../../types/WordsProp";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

interface ModalProps {
    modalWord: WordsProp;
    closeModal: () => void;
    modalPosition: {
        top: number;
        left: number;
    };
}

function WordModal({modalWord ,closeModal, modalPosition}: ModalProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['jwtCookie']);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkMyWord = async () => {
            const tokenId = cookies['jwtCookie'];  // 대괄호를 사용하여 속성에 액세스합니다.
            // console.log(tokenId);
            if(tokenId){
                const checkWord = await axios.get(process.env.REACT_APP_BACKSERVER + "/news/checkMyWord",
                {
                    params: { modalWord },
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${tokenId}`,
                    },
                    withCredentials: true,
                });
                console.log(checkWord.data);
                setIsActive(checkWord.data.isSavedWord);
            }
        }
        // if(tokenId) {checkMyWord();}
        checkMyWord();
    }, [cookies, modalWord])

    const myWord = async () => {
        const tokenId = cookies['jwtCookie'];  // 대괄호를 사용하여 속성에 액세스합니다.
        if(!tokenId){
            alert('로그인 후 사용가능한 기능입니다.');
        } else {
            setIsActive(!isActive);
            const saveMyWord = await axios.post(process.env.REACT_APP_BACKSERVER + "/news/saveMyword",{modalWord},
             {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
              )
        }
    }

    return ( <>
    <div className='wordModal'
    style={{
        top: modalPosition.top + 20 +'px',
        left: modalPosition.left + 'px',
            }}
    >
        <div className='close-btn'>
            <span onClick={closeModal} className="material-symbols-outlined">close</span>
        </div>
        <span>{modalWord.word}</span>
        <span onClick={myWord} className={`material-symbols-outlined heart ${isActive ? 'active' : ''}`}>heart_plus</span>
        <p>{modalWord.explanation}</p>
        <br />
        <p className='defaultTxt'>사전 결과 자동 추출로 오류가 있을 수 있습니다.</p>
    </div>
    </> );
}

export default WordModal;