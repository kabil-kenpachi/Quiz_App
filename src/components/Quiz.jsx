import React, { useState } from "react";
import Informations from "./Informations";
import Questions from "./Questions";

const Quiz = () => {
  const [start, setStart] = useState(false);
  const [diff, setDiff] = useState("");
  const [nb, setNb] = useState(0);

  const handleRestart = () => {
    setStart(false);
    setDiff("");
    setNb(0);
  };

  return !start ? (
    <Informations
      setStart={setStart}
      diff={diff}
      setDiff={setDiff}
      nb={nb}
      setNb={setNb}
    />
  ) : (
    <Questions diff={diff} nb={nb} onRestart={handleRestart} />
  );
};

export default Quiz;
