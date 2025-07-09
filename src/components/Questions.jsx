import React, { useEffect, useState } from "react";
import "./Questions.css";

const Questions = ({ nb, diff, onRestart }) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const url = `https://the-trivia-api.com/api/questions?limit=${nb}&difficulty=${diff}`;

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleClick = (answer) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    const nextIndex = index + 1;
    if (nextIndex < quiz.length) {
      setIndex(nextIndex);
      setAnswers(
        shuffle([
          ...quiz[nextIndex].incorrectAnswers,
          quiz[nextIndex].correctAnswer,
        ])
      );
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setQuiz(data);
        setAnswers(
          shuffle([...data[0].incorrectAnswers, data[0].correctAnswer])
        );
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <p>Chargement des questions...</p>;
  }

  if (quiz.length === 0) {
    return <p>Aucune question trouvée.</p>;
  }

  // Quand on a fini toutes les questions, afficher score + bouton restart
  if (index >= quiz.length) {
    return (
      <div className="result">
        <h2 className="termine">Quiz terminé !</h2>
        <p className="score">
          Votre score : {score} / {quiz.length}
        </p>
        <button onClick={onRestart}>Recommencer</button>
      </div>
    );
  }

  const currentQuestion = quiz[index];
  const correctAnswer = currentQuestion.correctAnswer;

  return (
    <div className="questions">
      <h1 className="title">
        {index + 1}. {currentQuestion.question}
      </h1>
      <ul>
        {answers.map((q, i) => (
          <li
            key={i}
            onClick={() => handleClick(q)}
            className={
              answered
                ? q === correctAnswer
                  ? "correct"
                  : q === selectedAnswer
                  ? "incorrect"
                  : "disabled"
                : ""
            }
          >
            {q}
          </li>
        ))}
      </ul>

      {answered && index < quiz.length - 1 && (
        <button onClick={nextQuestion}>Suivant</button>
      )}

      {/* Si on est à la dernière question et qu'on a répondu, bouton pour passer à la "page" résultat */}
      {answered && index === quiz.length - 1 && (
        <button onClick={() => setIndex(quiz.length)}>Voir le résultat</button>
      )}
    </div>
  );
};

export default Questions;
