export type Player = 'X' | 'O'
export type CellValue = Player | null
export type GameMode = 'PVP' | 'AI'
export type GameStatus = 'PLAYING' | 'WIN' | 'DRAW'

export interface GameState {
  board: CellValue[]
  currentPlayer: Player
  winner: Player | null
  gameMode: GameMode
  status: GameStatus
}
