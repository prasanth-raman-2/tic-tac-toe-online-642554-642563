'use client'

import { GameMode, GameStatus, Player } from '@/types/game'

interface GameControlsProps {
  gameMode: GameMode
  status: GameStatus
  currentPlayer: Player
  winner: Player | null
  onReset: () => void
  onModeChange: (mode: GameMode) => void
}

export default function GameControls({
  gameMode,
  status,
  currentPlayer,
  winner,
  onReset,
  onModeChange,
}: GameControlsProps) {
  const getStatusMessage = () => {
    if (status === 'WIN') return `Player ${winner} wins!`
    if (status === 'DRAW') return "It's a draw!"
    return `Current player: ${currentPlayer}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          className={`btn ${gameMode === 'PVP' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onModeChange('PVP')}
        >
          Player vs Player
        </button>
        <button
          className={`btn ${gameMode === 'AI' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onModeChange('AI')}
        >
          Player vs AI
        </button>
      </div>
      <div className="text-center text-xl font-semibold text-secondary">
        {getStatusMessage()}
      </div>
      <div className="flex justify-center">
        <button className="btn btn-accent" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </div>
  )
}
