import { Standings } from './Standings'
import { Set } from './Set'
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { MatchPart } from './MatchPart'
import { Player } from './Player'

export class Match implements MatchPart {
  @observable
  readonly sets: Set[]
  readonly numberOfSets: number
  readonly playerNames: [string, string]

  constructor(
    numberOfSets: number,
    playerNames: [string, string] = ['Player 1', 'Player 2'],
    sets = [new Set(0)],
  ) {
    makeObservable(this)
    this.sets = sets
    this.numberOfSets = numberOfSets
    this.playerNames = playerNames
    this.trackSets()
  }

  @computed({ requiresReaction: true })
  get allSets(): Set[] {
    const numberOfPlaceholders = this.numberOfSets - this.sets.length
    const placeholders = Array.from(Array(numberOfPlaceholders)).map(
      (_, i) => new Set(i + this.sets.length),
    )
    return [...this.sets, ...placeholders]
  }

  @computed({ requiresReaction: true })
  get currentSet() {
    return !this.hasWinner ? this.sets[this.sets.length - 1] : undefined
  }

  @computed({ requiresReaction: true })
  get currentGame() {
    return this.currentSet?.currentGame
  }

  @computed({ requiresReaction: true })
  get standings(): Standings {
    return [
      this.sets.filter((set) => set.winner === 0).length,
      this.sets.filter((set) => set.winner === 1).length,
    ]
  }

  @computed({ requiresReaction: true })
  get winner() {
    const cap = Math.round(this.numberOfSets / 2)
    const winner = this.standings.findIndex(
      (playerStanding) => playerStanding === cap,
    ) as Player
    return winner < 0 ? undefined : winner
  }

  @computed({ requiresReaction: true })
  get hasWinner() {
    return this.winner !== undefined
  }

  @action
  score(player: Player) {
    console.log(this.currentSet, this.currentSet?.currentGame)
    this.currentSet?.currentGame?.score(player)
  }

  private trackSets() {
    reaction(
      () => this.currentSet?.winner,
      () => {
        if (this.currentSet?.hasWinner && !this.hasWinner) {
          console.log('adding game!')
          this.sets.push(new Set(this.sets.length))
        }
      },
    )
  }
}
