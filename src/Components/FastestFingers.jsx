import React from "react";
import "../Styles/FastestFingers.css";
import { AiOutlineReload } from "react-icons/ai";
import { BiQuestionMark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { decTime, resetTime, startTimer, stopTimer } from "../Redux/TimerSlice";
import { useState } from "react";
import { preArr } from "../Assets/Data/prefixes";
import {
  initializeMatchingArr,
  initializePrefix,
  setHighScoreFF,
} from "../Redux/FastestFingersData";
import { gotCorrect, gotWrong, resetWordResult } from "../Redux/WordResult";
import { FastestFingersRules } from "../Assets/Data/FastestFingersRules";
import { toggleRuleView } from "../Redux/RulesViewSlice";
import RulesModal from "./RulesModal";
import WordResultModal from "./WordResultModal";
import { useWindowSize } from "../Hooks/ResizeHook";

const len = preArr.length - 1;
const FastestFingers = () => {
  const dispatch = useDispatch();
  const timeVal = useSelector((state) => state.timer.timeVal);
  const clockState = useSelector((state) => state.timer.running);
  const prefixWord = useSelector((state) => state.ffdata.prefix);
  const matchingArr = useSelector((state) => state.ffdata.matchingArr);
  const pts = useSelector((state) => state.wordResult.pts);
  const correctWords = useSelector((state) => state.wordResult.correctWords);
  const wrongWords = useSelector((state) => state.wordResult.wrongWords);
  const rulesView = useSelector((state) => state.rulesView.rulesView);
  const highScoreFF = useSelector((state) => state.ffdata.highScoreFF);
  
  const inputRef = useRef(null);
  
  const [reset, setReset] = useState(true);
  const [disabled, setDisabled] = useState("");
  const [result, showResult] = useState(false);
  const [,height] = useWindowSize();
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (rulesView) {
        dispatch(toggleRuleView());
      }
      isFirstRender.current = false;
      return;
    }
  }, [dispatch, rulesView]);

  const ruleViewHandler = () => {
    dispatch(toggleRuleView());
  };
  
  const resetHandler = () => {
    setReset(!reset);
  };

  const getPrefix = () => {
    return preArr[Math.floor(Math.random() * len)];
  };

  useEffect(() => {
    dispatch(initializePrefix({ pre: getPrefix() }));
    dispatch(resetTime());
    dispatch(resetWordResult());
    inputRef.current.value = "";
    inputRef.current.style.color = "gainsboro";
    setDisabled("");
    showResult(false);
  }, [reset, dispatch]);

  useEffect(() => {
    if(prefixWord.length === 0){
      return;
    }
    const url = `https://api.datamuse.com/words?sp=${prefixWord}*`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(initializeMatchingArr({ matchingArr: data }));
      })
      .catch(() => alert("slow net"));
  }, [prefixWord, dispatch]);

  useEffect(() => {
    if(prefixWord.length === 0){
      return;
    }
    if(matchingArr.length === 0){
      setReset(!reset);
    } else {
      let ok = true;
      const mn = Math.min(matchingArr[0].word.length,prefixWord.length);
      for(let i=0;i<mn;i++){
        if(matchingArr[0].word[i] !== prefixWord[i]){
          ok = false;
          break;
        }
      }
      if(!ok){
        setReset(!reset);
      }
    }
    // eslint-disable-next-line
  },[matchingArr]);

  const inputChangeHandler = () => {
    if (inputRef.current.value.length > 0 && !clockState) {
      dispatch(startTimer());
    }
  };

  const keyPressHandler = (e) => {
    if (e.charCode === 13) {
    // if (e.code === "Enter" || e.charCode === 13) {
      if (inputRef.current.value.length > 0) {
        const feed = inputRef.current.value;
        inputRef.current.value = "";
        const res = matchingArr.filter((val) => val.word === feed);
        if (res.length === 0) {
          dispatch(gotWrong({ word: feed }));
        } else {
          const ans = correctWords.filter((val) => val === res[0].word);
          if (ans.length === 0) {
            dispatch(gotCorrect({ word: feed }));
          } else {
            alert("Word already entered before");
          }
        }
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

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (timeVal === 0) {
      setDisabled("disabled");
      inputRef.current.style.color = "#999";
      dispatch(setHighScoreFF({ score: pts }));
      showResult(true);
    }
  }, [timeVal, dispatch, pts]);

  return (
    <div className="FastestFingers">
      {rulesView && <RulesModal rules={FastestFingersRules} />}
      {
        result && <WordResultModal correctWords={correctWords} wrongWords={wrongWords} view={showResult}/>
      }
      <div className="InfoNav">
        <div className="Reload ptr" onClick={resetHandler}>
          <AiOutlineReload />
        </div>
        <div className="Guide ptr" onClick={ruleViewHandler}>
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
      <div className="PseudoWrap">
        <div className="Wrap">
          <div className="FillInTheBlanks" style={{marginTop: (height/10), marginBottom: (height/10)}}>
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
            disabled={disabled}
          />
        </div>
        <footer className="Footer">Highest Score: {highScoreFF}</footer>
      </div>
    </div>
  );
};

export default React.memo(FastestFingers);