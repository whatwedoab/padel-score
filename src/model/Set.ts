import { Game } from './Game'
import { Standings } from './Standings'
import { computed, makeObservable, observable, reaction } from 'mobx'
import { MatchPart } from './MatchPart'

export class Set implements MatchPart {
  @observable
  readonly games: Game[]
  readonly index: number
  constructor(index: number, games: Game[] = [new Game(0)]) {
    makeObservable(this)
    this.games = games
    this.index = index

    this.trackGames()
  }

  @computed({ requiresReaction: true })
  get standings(): Standings {
    return [
      this.games.filter((g) => g.winner === 0).length,
      this.games.filter((g) => g.winner === 1).length,
    ]
  }

  @computed({ requiresReaction: true })
  get winner() {
    const player1Score = this.standings[0]
    const player2Score = this.standings[1]
    if (player1Score >= 6 && player1Score - player2Score > 1) {
      return 0
    }
    if (player2Score >= 6 && player2Score - player1Score > 1) {
      return 1
    }
    return undefined
  }

  @computed({ requiresReaction: true })
  get hasWinner() {
    return this.winner !== undefined
  }

  @computed({ requiresReaction: true })
  get currentGame(): Game | undefined {
    return !this.hasWinner ? this.games[this.games.length - 1] : undefined
  }

  private trackGames() {
    reaction(
      () => this.currentGame?.winner,
      () => {
        if (this.currentGame?.hasWinner && !this.hasWinner) {
          this.games.push(new Game(this.games.length))
        }
      },
    )
  }
}
