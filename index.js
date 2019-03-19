class Sim {
  constructor(){
    this.movesLeft = [[1,2],[2,3], [3,4], [4,5], [5,6], [1,6], [1,3], [1,4], [1,5], [2,4], [2,5], [2,6], [3,5], [3,6], [4,6]];
    this.playerAMoves = [];
    this.playerBMoves = [];
    this.turn = 'playerA';
    this.winner = null;
  }
  printMovesStatus(){
    console.log("Moves left", this.movesLeft);
    console.log("PlayerA", this.playerAMoves);
    console.log("PlayerB", this.playerBMoves);
  }
  move(move){
    const edge = this.movesLeft.splice(move,1,null)[0];
    if(edge){
      const gameOver = this.checkGameOver(edge);
      this[this.turn+'Moves'].push(edge);

      const nextTurnOrWinner = this.turn === 'playerA' ? "playerB" : "playerA";
      if(!gameOver){
        this.turn = nextTurnOrWinner;
      }else{
        this.winner = nextTurnOrWinner;
        this.turn = 'gameOver';
      }
    }else {
      console.log("Move already used!");
    }
  }
  checkGameOver(edge){
    const edgesWithFirstVertex = this[this.turn+'Moves'].filter(d => d[0] === edge[0]);
    return edgesWithFirstVertex.some(d => {
      return !!this[this.turn+'Moves'].find(x => d[1] === x[0] && edge[1] === x[1]);
    });
  }
}

module.exports.Sim = Sim;
