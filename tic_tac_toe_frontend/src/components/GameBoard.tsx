'use client'

import { CellValue } from '@/types/game'

interface GameBoardProps {
  board: CellValue[]
  onCellClick: (index: number) => void
  disabled: boolean
}

export default function GameBoard({ board, onCellClick, disabled }: GameBoardProps) {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <button
          key={index}
          className="game-cell"
          onClick={() => onCellClick(index)}
          disabled={cell !== null || disabled}
        >
          {cell && <span className={cell === 'X' ? 'text-primary' : 'text-accent'}>{cell}</span>}
        </button>
      ))}
    </div>
  )
}
