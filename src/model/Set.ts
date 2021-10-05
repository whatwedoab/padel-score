import { BehaviorSubject, filter, map, Subject, take } from 'rxjs'
import { Game } from './Game'
import { Score } from './Score'
import { Player } from './Player'

export class Set {
  readonly games$: BehaviorSubject<Game[]>
  readonly score$: BehaviorSubject<Score>
  readonly winner$: Subject<Player>

  constructor(readonly index: number, games: Game[] = [new Game(index, 0)]) {
    this.score$ = new BehaviorSubject<Score>([
      games.filter((g) => g.winner === 0).length,
      games.filter((g) => g.winner === 1).length,
    ])

    this.games$ = new BehaviorSubject<Game[]>(games)

    this.games$.subscribe((games) => {
      games.forEach((game) => {
        game.winner$.subscribe((w) => {
          console.log(
            `Player ${w} won game ${game.index}!`,
            this.winner,
            this.hasWinner
              ? `And Player ${this.winner} won this set!`
              : 'No winner in this set yet...',
          )
          const score = this.score$.getValue()
          this.score$.next([
            w === 0 ? score[0] + 1 : score[0],
            w === 1 ? score[0] + 1 : score[0],
          ])
          if (!this.hasWinner) {
            this.games$.next([
              ...games,
              new Game(this.index, this.games.length),
            ])
          }
        })
      })
    })

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
        this.games$.complete()
        this.winner$.complete()
      })
  }

  get games() {
    return this.games$.getValue()
  }

  get score(): Score {
    return [
      this.games.filter((game) => game.winner === 0).length,
      this.games.filter((game) => game.winner === 1).length,
    ]
  }

  get winner() {
    const player1Score = this.score[0]
    const player2Score = this.score[1]
    if (player1Score >= 6 && player1Score - player2Score > 1) {
      return 0
    }
    if (player2Score >= 6 && player2Score - player1Score > 1) {
      return 1
    }
    return undefined
  }

  get hasWinner() {
    return this.winner !== undefined
  }

  get currentGame(): Game | undefined {
    return this.winner === undefined
      ? this.games[this.games.length - 1]
      : undefined
  }
}
