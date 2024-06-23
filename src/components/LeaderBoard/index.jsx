import { useState } from "react";
import { LeaderBoardContainer, ScoreTable } from "./LeaderBoard.styles";

const LeaderBoard = ({ leaderBoardData }) => {
  const [highScores, setHighScores] = useState([
    { name: "Sourav1", score: 123 },
    { name: "Sourav2", score: 1234 },
  ]);

  return (
    <LeaderBoardContainer>
      <h2>High Scores</h2>
      {leaderBoardData.length === 0 && <div>No Data Available</div>}
      {leaderBoardData.length !== 0 && (
        <ScoreTable>
          <tbody>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Score</td>
            </tr>

            {leaderBoardData.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </ScoreTable>
      )}
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
