import { CellValue, Player, GameState } from '@/types/game'

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
]

export const checkWinner = (board: CellValue[]): Player | null => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

export const checkDraw = (board: CellValue[]): boolean => {
  return board.every(cell => cell !== null)
}

export const getAIMove = (board: CellValue[]): number => {
  // Simple AI: Find first empty cell
  const emptyIndices = board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1)

  if (emptyIndices.length === 0) return -1

  // Try to win
  for (const index of emptyIndices) {
    const testBoard = [...board]
    testBoard[index] = 'O'
    if (checkWinner(testBoard) === 'O') {
      return index
    }
  }

  // Try to block
  for (const index of emptyIndices) {
    const testBoard = [...board]
    testBoard[index] = 'X'
    if (checkWinner(testBoard) === 'X') {
      return index
    }
  }

  // Take center if available
  if (board[4] === null) return 4

  // Take a random corner
  const corners = [0, 2, 6, 8].filter(i => board[i] === null)
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)]
  }

  // Take a random side
  const sides = [1, 3, 5, 7].filter(i => board[i] === null)
  if (sides.length > 0) {
    return sides[Math.floor(Math.random() * sides.length)]
  }

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
}
