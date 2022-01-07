import React from "react";
import "../Styles/SpeedTest.css";
import { AiOutlineReload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { decTime, resetTime, stopTimer, startTimer } from "../Redux/TimerSlice";
import { useState } from "react";
import { generatePara } from "../Assets/Data/generatePara";
import {initPara, gotCorrect, gotWrong, backspace, incWrongCnt, decWrongCnt, markCurr} from "../Redux/SpeedDataSlice";

const SpeedTest = () => {

  const dispatch = useDispatch();
  const timeVal = useSelector((state) => state.timer.timeVal);
  const clockState = useSelector((state) => state.timer.running);
  const para = useSelector((state) => state.speedData.para);
  const ptr = useSelector((state) => state.speedData.ptr);
  const wrongCnt = useSelector((state) => state.speedData.wrongCnt);
  
  const inputRef = useRef(null);
  const [reset, setReset] = useState(true);
  const [value,setValue] = useState("");
  const [disabled,setDisabled] = useState('');

  const resetHandler = () => {
    setReset(!reset);
  };
  
  useEffect(() => {
    inputRef.current.style.color = 'gainsboro';
    wordProcessed.current = false;
    prvLength.current = 0;
    setValue("");
    dispatch(initPara({para: generatePara()}));
    dispatch(resetTime());
    setDisabled('');
  },[reset,dispatch]);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length > 0 && !clockState) {
      dispatch(startTimer());
    }
    prvLength.current = value.length;
    setValue(e.target.value);
  };

  const isFirstRender = useRef(true);
  const wordProcessed = useRef(false);
  const prvLength = useRef(0);
  const bringToView = useRef(null);
  const skipOne = useRef(true);

  useEffect(() => {
    if(skipOne.current){
      skipOne.current = false;
      return;
    }
    if(bringToView.current){
      bringToView.current.scrollIntoView({ behavior: "smooth" });
    }
  },[para]);
  
  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    if(wordProcessed.current){
      wordProcessed.current = false;
      return;
    }
    if(prvLength.current < value.length) {
      const feed = value[value.length-1];
      if(feed === " " && para[ptr].alpha === " "){
        dispatch(gotCorrect());
        if(wrongCnt === 0){
          wordProcessed.current = true;
          setValue("");
        }
      } else {
        if(para[ptr].alpha === feed){
          dispatch(gotCorrect());
        } else {
          dispatch(gotWrong());
          dispatch(incWrongCnt());
        }
      }if(ptr+1 < para.length){
        dispatch(markCurr({prv: ptr, curr: ptr+1}));
      }
    } else if (prvLength.current > value.length) {
      const back = prvLength.current - value.length;
      for(let ii=0;ii<back;ii++){
        const myPtr = ptr-1-ii;
        if(myPtr < 0)
          break;
        if(para[myPtr].cName === 'wrong'){
          dispatch(decWrongCnt());
        }
        dispatch(markCurr({prv:myPtr+1, curr:myPtr}));
        dispatch(backspace());
      }
    }
    // eslint-disable-next-line
  },[value, dispatch]);

  useEffect(() => {
    if (!clockState) {
      dispatch(resetTime());
      dispatch(stopTimer());
      return;
    }
    const counter = timeVal > 0 && setInterval(() => dispatch(decTime()), 1000);
    return () => clearInterval(counter);
  }, [timeVal, clockState, dispatch]);

  const firstRender = useRef(true);

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
      return;
    }
    if (timeVal === 0) {
        setDisabled('disabled');
        inputRef.current.style.color = '#999';
        // dispatch(resetTime());
    }
  }, [timeVal]);

  return (
    <div className="SpeedTest">
      <div className="InfoNav">
        <div className="ThickText">
          {timeVal}<span className="HighLight">s</span>
        </div>
        <div className="Reload ptr" onClick={resetHandler}>
          <AiOutlineReload />
        </div>
      </div>
      <div className="WordBox">
        {
            para.map((val,index) => {
                return (val.isCurr ? <span ref={bringToView} key={index} className={val.cName}>{val.alpha}</span> : <span key={index} className={val.cName}>{val.alpha}</span>)
            })
        }
      </div>
      <input
        type="text"
        ref={inputRef}
        onChange={inputChangeHandler}
        value={value}
        className="InputLine"
        placeholder="Timer Starts As You Start Typing"
        disabled={disabled}
      />
    </div>
  );
};

export default SpeedTest;
