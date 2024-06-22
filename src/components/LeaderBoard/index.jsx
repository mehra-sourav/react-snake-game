import { useState } from "react";
import { LeaderBoardContainer, ScoreTable } from "./LeaderBoard.styles";

const LeaderBoard = () => {
  const [highScores, setHighScores] = useState([
    { name: "Sourav1", score: 123 },
    { name: "Sourav2", score: 1234 },
  ]);

  return (
    <LeaderBoardContainer>
      <h2>High Scores</h2>
      <ScoreTable>
        <tr>
          <td>Rank</td>
          <td>Name</td>
          <td>Score</td>
        </tr>
        {highScores.map((score, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{score.name}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </ScoreTable>
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
