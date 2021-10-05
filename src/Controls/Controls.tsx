import React from 'react'
import { match$ } from '../App.store'
import { useBehaviorSubject } from '../services/useBehaviorSubject'

export function Controls() {
  const match = useBehaviorSubject(match$)
  return (
    <section>
      <button onClick={() => match?.score(1)}>Score</button>
    </section>
  )
}
