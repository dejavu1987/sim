/**
 * SIM
 * Paper & Pencil game on web
 * author: anil@anilmaharjan.com.np
 *
 */
class Sim {
  constructor(){
    this.movesLeft = [[1,2],[2,3], [3,4], [4,5], [5,6], [1,6], [1,3], [1,4], [1,5], [2,4], [2,5], [2,6], [3,5], [3,6], [4,6]];
    this.playerAMoves = [];
    this.playerBMoves = [];
    this.turn = 'playerA';
    this.winner = null;
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
    const complimentVertexWithFirstVertex = this[this.turn+'Moves'].filter(d => {
      console.log({d});
      console.log({edge});
      return d[0] === edge[0] || d[1] === edge[0];
    }).map(d => d[0] !== edge[0] ? d[0] : d[1]);
    console.log({complimentVertexWithFirstVertex});
    const complimentVertexWithSecondVertex = this[this.turn+'Moves'].filter(d => {
      console.log({d});
      console.log({edge});
      return d[0] === edge[1] || d[1] === edge[1];
    }).map(d => d[0] !== edge[1] ? d[0] : d[1]);
    console.log({complimentVertexWithSecondVertex});
    const secondSet = new Set(complimentVertexWithSecondVertex);
    return complimentVertexWithFirstVertex.some(d => secondSet.has(d));
  }

  restart(){
    this.movesLeft = [[1,2],[2,3], [3,4], [4,5], [5,6], [1,6], [1,3], [1,4], [1,5], [2,4], [2,5], [2,6], [3,5], [3,6], [4,6]];
    this.playerAMoves = [];
    this.playerBMoves = [];
    this.turn = 'playerA';
    this.winner = null;
  }
}

module.exports.Sim = Sim;
