import React from "react";
import "../Styles/FastestFingers.css";
import { AiOutlineReload } from "react-icons/ai";
import { BiQuestionMark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import {decTime,resetTime,startTimer,stopTimer} from "../Redux/TimerSlice";
import { useState } from "react";
import {preArr} from "../Assets/Data/prefixes";
import {initializeMatchingArr,initializePrefix} from "../Redux/FastestFingersData";
import { gotCorrect, gotWrong, resetWordResult} from "../Redux/WordResult";

const len = preArr.length - 1;
const FastestFingers = () => {

    const dispatch = useDispatch();
    const timeVal = useSelector((state) => state.timer.timeVal);
    const clockState = useSelector((state) => state.timer.running);
    const prefixWord = useSelector((state) => state.ffdata.prefix);
    const matchingArr = useSelector((state) => state.ffdata.matchingArr);
    const pts = useSelector((state) => state.wordResult.pts);
    const correctWords = useSelector((state) => state.wordResult.correctWords);

    const inputRef = useRef(null);

    const [reset,setReset] = useState(true);

    const resetHandler = () => {
      setReset(!reset);
      dispatch(resetTime());
      dispatch(resetWordResult());
      inputRef.current.value = "";
      inputRef.current.disabled = false;
    }

    const getPrefix = () => {
      return preArr[Math.floor(Math.random()*len)];
    }

    useEffect(() => {
      dispatch(initializePrefix({pre: getPrefix()}));
    },[reset,dispatch]);

    useEffect(() => {
      const url = `https://api.datamuse.com/words?sp=${prefixWord}*`;
      fetch(url).then((res) => res.json()).then((data) => {
        dispatch(initializeMatchingArr({matchingArr: data}));
      }); 
    }, [prefixWord,dispatch]);

    const inputChangeHandler = () => {
        if(inputRef.current.value.length > 0 && !clockState){
            dispatch(startTimer());
        }
    }

    const keyPressHandler = (e) => {
      if(e.code === 'Enter'){
        if(inputRef.current.value.length > 0){
          const feed = inputRef.current.value;
          inputRef.current.value = "";
          const res = matchingArr.filter((val) => val.word === feed);
          if(res.length === 0) {
            dispatch(gotWrong({word: feed}));
          } else {
            const ans = correctWords.filter((val) => val === res[0]);
            if(ans.length === 0) {
              dispatch(gotCorrect({word: feed}));
            } else {
              alert('Word already entered before');
            }
          }
        }
      }
    }

    useEffect(() => {
      if (!clockState) {
        dispatch(resetTime());
        dispatch(stopTimer());
        return;
      }
      const counter = timeVal > 0 && setInterval(() => dispatch(decTime()), 1000);
      return () => clearInterval(counter);
    }, [timeVal, clockState,dispatch]);

    useEffect(() => {
      if(timeVal === 0)
        inputRef.current.disabled = true;
    },[timeVal]);

    return (
    <div className="FastestFingers">
      <div className="InfoNav">
        <div className="Reload ptr" onClick={resetHandler}>
          <AiOutlineReload />
        </div>
        <div className="Guide ptr">
          <BiQuestionMark />
        </div>
      </div>
      <div className="TimerNav">
        <div className="ThickText">
          {timeVal}<span className="HighLight">s</span>
        </div>
        <div className="ThickText">
          {pts}<span className="HighLight">Pts</span>
        </div>
      </div>
      <div className="FillInTheBlanks">
        {prefixWord}
        <span className="UnderLine">___________</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        onChange={inputChangeHandler}
        onKeyPress={keyPressHandler}
        className="InputLine"
        placeholder="Complete The Word And Press Enter"
      />
    </div>
  );
};

export default React.memo(FastestFingers);
