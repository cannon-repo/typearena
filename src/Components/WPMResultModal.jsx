import React from 'react';

const WPMResultModal = (props) => {
    return (
      <div className="WPMResultModalWrap">
        <div className="Backface" onClick={() => props.view(false)}></div>
        <div className="WPMResultModal">
          <div className="WPMWrap">
            {props.wpm}<span className='smallTxt'>WPM</span>
          </div>
          <div className="AccWrap">
            <span className='ThinTxt'>Accuracy:</span> {props.acc}
            <span className='smallTxt'>%</span>
          </div>
        </div>
      </div>
    );
}

export default WPMResultModal;