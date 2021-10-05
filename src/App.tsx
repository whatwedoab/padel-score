import React, { useEffect } from 'react'
import './App.css'
import { hydrate } from './App.store'
import { Scoreboard } from './Scoreboard/Scoreboard'
import { Controls } from './Controls/Controls'

function App() {
  useEffect(() => {
    hydrate()
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
