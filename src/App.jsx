import { useState } from "react";
import LeaderBoard from "./components/LeaderBoard";
import GameBoard from "@/components/GameBoard";
import "./App.css";

function App() {
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const addScoreToLeaderBoard = (playerName, score) => {
    setLeaderBoardData((prevState) => {
      const newData = [...prevState, { score, name: playerName }];
      newData.sort((a, b) => b.score - a.score);
      return newData;
    });
  };
  return (
    <>
      <GameBoard updateLeaderBoard={addScoreToLeaderBoard} />
      <LeaderBoard leaderBoardData={leaderBoardData} />
    </>
  );
}

export default App;
