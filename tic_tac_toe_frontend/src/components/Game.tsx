'use client'

import { useState, useEffect } from 'react'
import { GameState, GameMode, Player } from '@/types/game'
import { checkWinner, checkDraw, getAIMove } from '@/utils/gameUtils'
import GameBoard from './GameBoard'
import GameControls from './GameControls'

export default function Game() {
  const initialState: GameState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    gameMode: 'PVP',
    status: 'PLAYING',
  }

  const [gameState, setGameState] = useState<GameState>(initialState)

  const handleCellClick = (index: number) => {
    if (
      gameState.board[index] !== null ||
      gameState.status === 'WIN' ||
      gameState.status === 'DRAW'
    ) {
      return
    }

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const winner = checkWinner(newBoard)
    const isDraw = !winner && checkDraw(newBoard)

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner,
      status: winner ? 'WIN' : isDraw ? 'DRAW' : 'PLAYING',
    }))
  }

  useEffect(() => {
    if (
      gameState.gameMode === 'AI' &&
      gameState.currentPlayer === 'O' &&
      gameState.status === 'PLAYING'
    ) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState.board)
        if (aiMove !== -1) {
          handleCellClick(aiMove)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [gameState])

  const handleReset = () => {
    setGameState(initialState)
  }

  const handleModeChange = (mode: GameMode) => {
    setGameState({
      ...initialState,
      gameMode: mode,
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Tic Tac Toe</h1>
      <div className="space-y-8">
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={
            gameState.status !== 'PLAYING' ||
            (gameState.gameMode === 'AI' && gameState.currentPlayer === 'O')
          }
        />
        <GameControls
          gameMode={gameState.gameMode}
          status={gameState.status}
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          onReset={handleReset}
          onModeChange={handleModeChange}
        />
      </div>
    </div>
  )
}
