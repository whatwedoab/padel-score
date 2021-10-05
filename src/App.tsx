import React, { useEffect } from 'react'
import './App.css'
import { Scoreboard } from './Scoreboard/Scoreboard'
import { Controls } from './Controls/Controls'
import { matchStore } from './services/Match.store'

function App() {
  useEffect(() => {
    matchStore.hydrate()
  }, [])

  return (
    <div className="App">
      <main>
        <Scoreboard />
        <Controls />
      </main>
    </div>
  )
}

export default App
