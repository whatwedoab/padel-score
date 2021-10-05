import { Standings } from './Standings'
import { Player } from './Player'

export interface MatchPart {
  standings: Standings
  winner: Player | undefined
  hasWinner: boolean
}
