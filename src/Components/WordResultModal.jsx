import React from 'react';

const WordResultModal = (props) => {
    return (
        <div className='WordResultModalWrap'>
            <div className='Backface' onClick={() => props.view(false)}></div>
            <div className='WordResultModal'>
                <div className='CorrectWords'>
                    <p className='ModalHead'>CORRECT WORDS</p>
                    {
                        props.correctWords.map((val, index) => {
                            return <li key={index} className='AllWords'>{val}</li>
                        })
                    }
                </div>
                <div className='WrongWords'>
                    <p className='ModalHead'>WRONG WORDS</p>
                    {
                        props.wrongWords.map((val, index) => {
                            return <li key={index} className='AllWords'>{val}</li>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default WordResultModal;