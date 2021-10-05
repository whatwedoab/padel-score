import React, { Fragment } from 'react'
import './Scoreboard.css'
import { observer } from 'mobx-react-lite'
import { matchStore } from '../services/Match.store'

export const Scoreboard = observer(() => {
  const { match } = matchStore
  console.log(matchStore.match)
  if (!match) {
    return null
  }

  return (
    <article className="scoreboard">
      {match.allSets.map((set) => (
        <h3
          style={{ gridArea: `header-set-${set.index}` }}
          key={`setHeading${set.index}`}
        >
          {set.index + 1}
        </h3>
      ))}

      <h3 style={{ gridArea: `player1` }}>Player 1</h3>
      <h3 style={{ gridArea: `player2` }}>Player 2</h3>

      {match.allSets.map((set) => (
        <Fragment key={`set-${set.index}`}>
          <span style={{ gridArea: `player1-set-${set.index}` }}>
            {set?.standings[0]}
          </span>
          <span style={{ gridArea: `player2-set-${set.index}` }}>
            {set?.standings[1]}
          </span>
        </Fragment>
      ))}

      <span style={{ gridArea: 'player1-scores' }}>
        {match.currentGame?.standings[0]}
      </span>
      <span style={{ gridArea: 'player2-scores' }}>
        {match.currentGame?.standings[1]}
      </span>
    </article>
  )
})
