import { Standings } from './Standings'
import { Player } from './Player'
import { action, computed, makeObservable, observable, toJS } from 'mobx'
import { MatchPart } from './MatchPart'

export class Game implements MatchPart {
  @observable
  readonly standings: Standings
  readonly index: number

  constructor(index: number, standings: Standings = [0, 0]) {
    makeObservable(this)
    this.standings = standings
    this.index = index
  }

  @computed({ requiresReaction: true })
  get winner(): 0 | 1 | undefined {
    const player1Standing = this.standings[0]
    const player2Standing = this.standings[1]
    if (player1Standing === 40 || player1Standing - player2Standing === 2) {
      return 0
    }
    if (player2Standing === 40 || player2Standing - player1Standing === 2) {
      return 1
    }
    return undefined
  }

  @computed({ requiresReaction: true })
  get hasWinner() {
    return this.winner !== undefined
  }

  @action
  score(player: Player) {
    const newPlayerStanding = this.getNextValue(player)
    this.standings[player] = newPlayerStanding
    console.log(toJS(this.standings))
  }

  private getNextValue(player: Player) {
    const player1Standing = this.standings[0]
    const player2Standing = this.standings[1]
    const standing = this.standings[player]

    const diff = Math.abs(player1Standing - player2Standing)
    if (player1Standing >= 30 && player2Standing >= 30 && diff < 2) {
      return standing + 1
    }

    switch (standing) {
      case 0:
        return 15
      case 15:
        return 30
      case 30:
        return 40
      default:
        return standing + 1
    }
  }
}
