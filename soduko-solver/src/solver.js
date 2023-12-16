export default class Solution {
    static solveSudoku(board) {
      
        function isValid(num, row, col) {
            for (let i = 0; i < 9; i++) {
                if (
                    board[i][col] === num ||
                    board[row][i] === num ||
                    board[3 * (Math.floor(row / 3)) + Math.floor(i / 3)][3 * (Math.floor(col / 3)) + (i % 3)] === num
                ) {
                    return false;
                }
            }
            return true;
        }

        function solve(r, c) {
            if (r === 9) {
                return true; 
            }
            if (c === 9) {
                return solve(r + 1, 0); 
            }
            if (board[r][c] !== '') {
             
                    return solve(r,c+1)
              
               
                
                
            }
            for (let i = 1; i <= 9; i++) {
                const num = String(i);
                if (isValid(num, r, c)) {
                    board[r][c] = num;
                    if (solve(r, c + 1)) {
                        return true;
                    }
                    board[r][c] = ''; 
                }
            }
            return false; 
        }

        if (solve(0, 0)) {
            return board;
        } else {
            return false;
        }
    }
}
