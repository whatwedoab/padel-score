import React from 'react'
import { Set } from '../model/Set'
import { useBehaviorSubject } from '../services/useBehaviorSubject'

interface Props {
  set: Set
}

export function Games(props: Props) {
  const { games$, player1, player2 } = props.set
  const games = useBehaviorSubject(games$)

  return (
    <div className="games-container">
      <div className="games-player-score">{player1}</div>
      <div className="games-player-score">{player2}</div>
    </div>
  )
}
