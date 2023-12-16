import { useState } from "react";
import './SudokuBoard.css';
import Solution from "./solver";

export default function SodukoBoard(){
    const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
    const [error, setError] = useState("");

    const generateBoard = () => {
        const newBoard = Solution.solveSudoku(board);
        console.log(newBoard)
        if (newBoard) {
            setBoard(newBoard.map(row => row.map(cell => (cell === '' ? '' : String(cell)))));
        } else {
            setError("No solution found");
        }
    };

    const clear = () => {
        setBoard(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
    };

    const handleCellChange = (e, rowIndex, colIndex) => {
        const { value } = e.target;
        if (/^[1-9]?$/.test(value)) {
            const updatedBoard = board.map((row, i) =>
                row.map((cell, j) =>
                    i === rowIndex && j === colIndex ? (value === '' ? '' : String(value)) : cell
                )
            );
            setBoard(updatedBoard);
        }
    };

    return (
        <div>
            <h1>Sudoku Solver</h1>
            <div className="sudoku-board">
                {board.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <input
                                className="cell"
                                key={`${rowIndex}-${colIndex}`}
                                type="text"
                                maxLength="1"
                                value={cell}
                                onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <h3 className="error">{error}</h3>
            <button onClick={generateBoard}>solve</button>
            <button onClick={clear}>clear Board</button>
        </div>
    );
}
