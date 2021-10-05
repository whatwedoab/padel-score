import React, { Fragment } from 'react'
import { useBehaviorSubject } from '../services/useBehaviorSubject'
import './Scoreboard.css'
import { match$ } from '../App.store'

export function Scoreboard() {
  const match = useBehaviorSubject(match$)
  const sets = useBehaviorSubject(match?.sets$)

  if (!match || !sets) {
    return null
  }

  return (
    <article className="scoreboard">
      {sets.map((set) => (
        <h3
          style={{ gridArea: `header-set-${set.index}` }}
          key={`setHeading${set.index}`}
        >
          {set.index}
        </h3>
      ))}

      <h3 style={{ gridArea: `player1` }}>Player 1</h3>
      <h3 style={{ gridArea: `player2` }}>Player 2</h3>

      {sets.map((set) => (
        <Fragment key={`set-${set.index}`}>
          <span style={{ gridArea: `player1-set-${set.index}` }}>
            {match?.players[0]}
          </span>
          <span style={{ gridArea: `player2-set-${set.index}` }}>
            {match?.players[1]}
          </span>
        </Fragment>
      ))}

      {/*<span style={{ gridArea: 'player1-scores' }}>{currentGame.player1}</span>*/}
      {/*<span style={{ gridArea: 'player2-scores' }}>{currentGame.player2}</span>*/}
    </article>
  )
}
