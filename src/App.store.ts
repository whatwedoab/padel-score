import { BehaviorSubject } from 'rxjs'
import { Match } from './model/Match'

const LOCAL_STORAGE_KEY = 'padelScores'

export const match$ = new BehaviorSubject<Match | undefined>(undefined)

export function hydrate(): void {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  const matchObj = !!stored ? JSON.parse(stored) : { sets: [] }
  console.log(matchObj)
  const match = new Match(matchObj?.sets, matchObj?.winner)
  match$.next(match)
}
