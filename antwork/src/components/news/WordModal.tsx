import axios from "axios";
import { WordsProp } from "../../types/WordsProp";
import { useCookies } from "react-cookie";

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

    const myWord = async () => {
        const tokenId = cookies['jwtCookie'];  // 대괄호를 사용하여 속성에 액세스합니다.
        console.log(tokenId);
        if(!tokenId){
            alert('로그인 후 사용가능한 기능입니다.');
        } else {
            const saveMyWord = await axios.post(process.env.REACT_APP_BACKSERVER + "/saveMyword", tokenId,
            //  {
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     withCredentials: true,
            //   }
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
            {/* <button onClick={closeModal}> */}
                    <span onClick={closeModal} className="material-symbols-outlined">close</span>
            {/* </button> */}
        </div>
            <span>
                {modalWord.word}
            </span>
            {/* <span> */}
                {/* <button className='myWord'> */}
                    <span onClick={myWord} className="material-symbols-outlined">heart_plus</span>
                {/* </button> */}
            {/* </span> */}
                <p>{modalWord.explanation}</p>
                <p className='defaultTxt'>사전 결과 자동 추출로 오류가 있을 수 있습니다.</p>
    </div>
    </> );
}

export default WordModal;