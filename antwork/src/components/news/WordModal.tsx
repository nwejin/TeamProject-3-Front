import { WordsProp } from "../../types/WordsProp";

interface ModalProps {
    modalWord: WordsProp;
    closeModal: () => void;
    modalPosition: {
        top: number;
        left: number;
    };
}

function WordModal({modalWord ,closeModal, modalPosition}: ModalProps) {
    const myWord = () => {

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