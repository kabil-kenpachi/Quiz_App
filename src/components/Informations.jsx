import React, { useRef, useState } from "react";
import "./Quiz.css";

const Informations = ({ setStart, nb, diff, setNb, setDiff }) => {
  const inp = useRef(null);
  const [error, setError] = useState("");

  const handleClick = () => {
    if (+nb <= 0) {
      inp.current.classList.add("invalid");
      setError("Le nombre de questions doit être > 0 !");
    } else {
      inp.current.classList.remove("invalid");
      setError("");
      setStart(true);
    }
  };

  return (
    <div className="champSaisie">
      <div className="difficulty">
        <label htmlFor="diff">Niveau de difficulté :</label>
        <select
          id="diff"
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="nombre">
        <label htmlFor="nb">Nombre de questions :</label>
        <input
          ref={inp}
          type="number"
          id="nb"
          value={nb}
          onChange={(e) => setNb(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
      </div>

      <button onClick={handleClick}>Start</button>
    </div>
  );
};

export default Informations;
