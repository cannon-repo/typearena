import React from "react";
import "../Styles/GuessTheWord.css";
import { AiOutlineReload } from "react-icons/ai";
import { BiQuestionMark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { decTime, resetTime, startTimer, stopTimer } from "../Redux/TimerSlice";
import { gotCorrect, gotWrong, resetWordResult } from "../Redux/WordResult";
import { initializeMatchObj, clearMatchObj } from "../Redux/WordGuessData";
import { generateWordWithBlanks } from "../Assets/Data/generateBlanks";

const GuessTheWord = () => {

  const dispatch = useDispatch();
  const timeVal = useSelector((state) => state.timer.timeVal);
  const clockState = useSelector((state) => state.timer.running);
  const pts = useSelector((state) => state.wordResult.pts);
  const completeWord = useSelector((state) => state.guessData.completeWord);
  const incompleteWord = useSelector((state) => state.guessData.incompleteWord);

  const inputRef = useRef(null);
  const [reset, setReset] = useState(true);

  const resetHandler = () => {
    setReset(!reset);
    dispatch(resetTime());
    dispatch(resetWordResult());
    dispatch(clearMatchObj());
    inputRef.current.value = "";
    inputRef.current.disabled = false;
  };

  useEffect(() => {
    const dataObj = generateWordWithBlanks();
    dispatch(initializeMatchObj({completeWord: dataObj.completeWord, incompleteWord: dataObj.incompleteWord}));
  }, [reset,dispatch]);

  const inputChangeHandler = () => {
    if (inputRef.current.value.length > 0 && !clockState) {
      dispatch(startTimer());
    }
  };

  const keyPressHandler = (e) => {
    if (e.code === "Enter") {
      if (inputRef.current.value.length > 0) {
        const feed = inputRef.current.value;
        inputRef.current.value = "";
        if(feed === completeWord) {
          dispatch(gotCorrect({word: feed}));
        } else {
          dispatch(gotWrong({word: feed}));
        }
        setReset(!reset);
      }
    }
  };

  useEffect(() => {
    if (!clockState) {
      dispatch(resetTime());
      dispatch(stopTimer());
      return;
    }
    const counter = timeVal > 0 && setInterval(() => dispatch(decTime()), 1000);
    return () => clearInterval(counter);
  }, [timeVal, clockState, dispatch]);

  useEffect(() => {
    if (timeVal === 0) inputRef.current.disabled = true;
  }, [timeVal]);

  return (
    <div className="GuessTheWord">
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
          {timeVal}
          <span className="HighLight">s</span>
        </div>
        <div className="ThickText">
          {pts}
          <span className="HighLight">Pts</span>
        </div>
      </div>
      <div className="FillInTheBlanks">{incompleteWord}</div>
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

export default React.memo(GuessTheWord);