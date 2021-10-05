import React, { useEffect } from 'react'
import { matchStore } from '../services/Match.store'
import { observer } from 'mobx-react-lite'
import { controlsStore } from '../services/Controls.store'

export const Controls = observer(() => {
  const { match } = matchStore

  useEffect(() => {
    document.addEventListener('keydown', onPlayer1Score)
    document.addEventListener('keydown', onPlayer2Score)
    return () => {
      document.removeEventListener('keydown', onPlayer1Score)
      document.removeEventListener('keydown', onPlayer2Score)
    }
  }, [])

  return (
    <section>
      <button onClick={() => match?.score(0)}>{match?.playerNames[0]} score</button>
      <button onClick={() => match?.score(1)}>{match?.playerNames[1]} score</button>
    </section>
  )
})

function onPlayer1Score(e: KeyboardEvent) {
  if (e.key.toLowerCase() === controlsStore.player1ScoreKey) {
    matchStore.match?.score(0)
  }
}
function onPlayer2Score(e: KeyboardEvent) {
  if (e.key.toLowerCase() === controlsStore.player2ScoreKey) {
    matchStore.match?.score(1)
  }
}
