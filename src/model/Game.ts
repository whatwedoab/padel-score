import { Score } from './Score'
import { Player } from './Player'
import { BehaviorSubject, filter, map, Subject, take } from 'rxjs'

export class Game {
  readonly score$: BehaviorSubject<Score>
  readonly winner$: Subject<Player>

  constructor(
    readonly setIndex: number,
    readonly index: number,
    score: Score = [0, 0],
  ) {
    this.score$ = new BehaviorSubject<Score>(score)
    this.winner$ = new Subject()
    this.score$
      .pipe(
        map(() => this.winner),
        filter((value) => value !== undefined),
        map((winner) => winner as Player),
        take(1),
      )
      .subscribe((winner) => {
        this.winner$.next(winner)
        this.score$.complete()
        this.winner$.complete()
      })
  }

  get score() {
    return this.score$.getValue()
  }

  get winner(): 0 | 1 | undefined {
    const player1Score = this.score[0]
    const player2Score = this.score[1]
    if (player1Score === 40 || player1Score - player2Score === 2) {
      return 0
    }
    if (player2Score === 40 || player2Score - player1Score === 2) {
      return 1
    }
    return undefined
  }

  addScore(player: Player) {
    const newPlayerScore = this.getNextScore(player)
    const newScore: Score = [
      player === 0 ? newPlayerScore : this.score[0],
      player === 1 ? newPlayerScore : this.score[1],
    ]
    this.score$.next(newScore)
  }

  private getNextScore(player: Player) {
    const player1Score = this.score[0]
    const player2Score = this.score[1]
    const score = this.score[player]
    const diff = Math.abs(player1Score - player2Score)
    if (player1Score >= 30 && player2Score >= 30 && diff < 2) {
      return score + 1
    }
    switch (score) {
      case 0:
        return 15
      case 15:
        return 30
      case 30:
        return 40
      default:
        return score + 1
    }
  }
}
