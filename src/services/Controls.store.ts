class ControlsStore {
  player1ScoreKey = 'z'
  player2ScoreKey = 'x'

  setPlayer1ScoreKey(key: string){
    this.player1ScoreKey = key
  }
  setPlayer2ScoreKey(key: string){
    this.player2ScoreKey = key
  }
}

export const controlsStore = new ControlsStore()
