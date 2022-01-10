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
import {
  initializeMatchObj,
  clearMatchObj,
  setWGHighScore,
} from "../Redux/WordGuessData";
import { generateWordWithBlanks } from "../Assets/Data/generateBlanks";
import { toggleRuleView } from "../Redux/RulesViewSlice";
import RulesModal from "./RulesModal";
import { WordGuessRules } from "../Assets/Data/WordGuessRules";
import WordResultModal from "./WordResultModal";
import { useWindowSize } from "../Hooks/ResizeHook";

const GuessTheWord = () => {
  const dispatch = useDispatch();
  const timeVal = useSelector((state) => state.timer.timeVal);
  const clockState = useSelector((state) => state.timer.running);
  const pts = useSelector((state) => state.wordResult.pts);
  const completeWord = useSelector((state) => state.guessData.completeWord);
  const incompleteWord = useSelector((state) => state.guessData.incompleteWord);
  const rulesView = useSelector((state) => state.rulesView.rulesView);
  const highScoreWG = useSelector((state) => state.guessData.highScoreWG);
  const correctWords = useSelector((state) => state.wordResult.correctWords);
  const wrongWords = useSelector((state) => state.wordResult.wrongWords);

  const inputRef = useRef(null);
  const [reset, setReset] = useState(true);
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
  const [disabled, setDisabled] = useState("");

  useEffect(() => {
    dispatch(resetTime());
    dispatch(resetWordResult());
    dispatch(clearMatchObj());
    setDisabled("");
    inputRef.current.value = "";
    inputRef.current.style.color = "gainsboro";
    setToggle(!toggle);
    showResult(false);
    // eslint-disable-next-line
  }, [reset, dispatch]);

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const dataObj = generateWordWithBlanks();
    dispatch(
      initializeMatchObj({
        completeWord: dataObj.completeWord,
        incompleteWord: dataObj.incompleteWord,
      })
    );
  }, [toggle, dispatch]);

  const inputChangeHandler = () => {
    if (inputRef.current.value.length > 0 && !clockState) {
      dispatch(startTimer());
    }
  };

  const keyPressHandler = (e) => {
    if (e.charCode === 13) {
      if (inputRef.current.value.length > 0) {
        const feed = inputRef.current.value;
        inputRef.current.value = "";
        if (feed === completeWord) {
          dispatch(gotCorrect({ word: completeWord }));
        } else {
          dispatch(gotWrong({ word: completeWord }));
        }
        setToggle(!toggle);
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
      dispatch(setWGHighScore({ score: pts }));
      showResult(true);
    }
  }, [timeVal, dispatch, pts]);

  return (
    <div className="GuessTheWord">
      {rulesView && <RulesModal rules={WordGuessRules} />}
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
          <div className="FillInTheBlanks" style={{marginTop: (height/10), marginBottom: (height/10)}}>{incompleteWord}</div>
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
        <footer className="Footer">Highest Score: {highScoreWG}</footer>
      </div>
    </div>
  );
};

export default React.memo(GuessTheWord);
