import { Match } from '../model/Match'
import { action, makeObservable, observable } from 'mobx'
import { Game } from '../model/Game'
import { Set } from '../model/Set'

export type PlainObject<T> = T

class MatchStore {
  private readonly LOCAL_STORAGE_KEY = 'padelScores'

  @observable
  match?: Match

  constructor() {
    makeObservable(this)
  }

  @action
  hydrate(): void {
    const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY)
    const matchObject = !!stored && JSON.parse(stored)
    this.match = !!matchObject ? this.transform(matchObject) : new Match(3)
  }

  private transform(matchObject: PlainObject<Match>): Match {
    return new Match(
      matchObject.numberOfSets,
      matchObject.playerNames,
      this.transformSets(matchObject.sets),
    )
  }

  private transformSets(setsObjects: PlainObject<Set>[]): Set[] {
    return setsObjects.map(
      (obj) => new Set(obj.index, this.transformGames(obj.games)),
    )
  }

  private transformGames(gameObjects: PlainObject<Game>[]): Game[] {
    return gameObjects.map((obj) => new Game(obj.index, obj.standings))
  }
}

export const matchStore = new MatchStore()
