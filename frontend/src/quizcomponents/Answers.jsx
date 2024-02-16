/** @format */

import React from "react";
import { useRef } from "react";
const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // Shuffle the answer in the multiple choice
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = selectedAnswer === answer;
        if (answerState === "answered" && isSelected) {
          cssClass = "selected"; //To mark the selected answer
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
