import { Square } from "./Square.jsx";

export const Winner = ({winner,resetGame}) => {
  if (winner == null) return null;
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner == false ? "Empate" : "Ganó " + winner}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
      </div>
      <footer>
        <button onClick={resetGame}>Empezan otra vez</button>
      </footer>
    </section>
  );
};
