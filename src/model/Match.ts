import { BehaviorSubject, from, Subject } from 'rxjs'
import { Score } from './Score'
import { Player } from './Player'
import { Set } from './Set'

export class Match {
  readonly sets$: BehaviorSubject<Set[]>
  readonly winner$: Subject<Player>

  constructor(
    readonly numberOfSets: number,
    readonly players: [string, string] = ['Player 1', 'Player 2'],
    sets?: Set[],
  ) {
    this.sets$ = new BehaviorSubject<Set[]>(sets || [new Set(0)])
    this.winner$ = new Subject()

    this.sets$.subscribe((sets) =>
      sets.forEach((set) =>
        set.winner$.subscribe((winner) => {
          if (set.hasWinner) {
            console.log(`:: Player ${winner} wins set ${set.index}`)
            if (this.hasWinner) {
              console.log(`:::: Player ${winner} wins the match!`)
              this.winner$.next(this.winner as Player)
              this.sets$.complete()
              this.winner$.complete()
            } else {
              this.sets$.next([...this.sets, new Set(this.sets.length)])
            }
          }
        }),
      ),
    )
  }

  get sets() {
    return this.sets$.getValue()
  }

  get currentSet() {
    return this.sets.find((s) => s.winner === undefined)
  }

  get score(): Score {
    return [
      this.sets.filter((set) => set.winner === 0).length,
      this.sets.filter((set) => set.winner === 1).length,
    ]
  }
  get winner() {
    const cap = Math.round(this.numberOfSets / 2)
    const winner = this.score.findIndex((score) => score === cap)
    return winner < 0 ? undefined : winner
  }

  get hasWinner() {
    return this.winner !== undefined
  }
}

const m = new Match(3)
setInterval(() => {
  if (m.winner === undefined) {
    m.currentSet?.currentGame?.addScore(Math.round(Math.random()) as 0 | 1)
  }
}, 250)

m.sets$.subscribe((sets) =>
  sets.forEach((s) =>
    s.games$.subscribe((games) =>
      from(games).subscribe((g) => {
        g.score$.subscribe((sc) =>
          console.log(s.index, g.index, sc, s.score, m.score),
        )
      }),
    ),
  ),
)
