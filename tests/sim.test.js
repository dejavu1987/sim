const {Sim} = require('../src/sim');
const sim = new Sim();

describe('While initializing', () => {
  test('It should be PlayerA\'s turn', () => {
    expect(sim.turn).toBe('playerA');
  });

  test('It should have all the moves left', () => {
    expect(sim.movesLeft).toEqual([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 6], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 6]]);
  });
});

describe('After first move', () => {

  test('It should have one less move left', () => {
    sim.move(0);
    expect(sim.movesLeft).toEqual([null, [2, 3], [3, 4], [4, 5], [5, 6], [1, 6], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 6]]);
  });

  test('Player A should have the first move', () => {
    expect(sim.playerAMoves).toEqual([[1, 2]]);
  });

  test('Next turn should be Player B\'s', () => {
    expect(sim.turn).toBe('playerB');
  });
});

describe('After second move', () => {

  test('It should have two less move left', () => {
    sim.move(2);
    expect(sim.movesLeft).toEqual([null, [2, 3], null, [4, 5], [5, 6], [1, 6], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 6]]);
  });

  test('Player B should have the second move', () => {
    expect(sim.playerBMoves).toEqual([[3, 4]]);
  });

  test('Next turn should be Player A\'s', () => {
    expect(sim.turn).toBe('playerA');
  });
});

describe('After invalid move', () => {
  test('It should have same moves left', () => {
    sim.move(2);
    expect(sim.movesLeft).toEqual([null, [2, 3], null, [4, 5], [5, 6], [1, 6], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 6]]);
  });

  test('Player B should have the same moves', () => {
    expect(sim.playerBMoves).toEqual([[3, 4]]);
  });

  test('Next turn should still be Player A\'s', () => {
    expect(sim.turn).toBe('playerA');
  });
});

describe('After loosing move', () => {
  test('It should have same moves left', () => {
    sim.move(1);
    sim.move(5);
    sim.move(6);
    expect(sim.movesLeft).toEqual([null, null, null, [4, 5], [5, 6], null, null, [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 6]]);
  });
  test('Player A should have the first move', () => {
    expect(sim.playerAMoves).toEqual([[1, 2], [2, 3], [1, 3]]);
  });
  test('Player B should have the same moves', () => {
    expect(sim.playerBMoves).toEqual([[3, 4], [1, 6]]);
  });

  test('No more turns game should be over.', () => {
    expect(sim.turn).toBe('gameOver');
  });
  test('Winner should be PlayerB.', () => {
    expect(sim.winner).toBe('playerB');
  });

  test('It should have same moves left', () => {
    sim.restart();
    sim.move(5);
    sim.move(0);
    sim.move(8);
    sim.move(11);
    sim.move(4);
    expect(sim.movesLeft).toEqual([null, [2, 3], [3, 4], [4, 5], null, null, [1, 3], [1, 4], null, [2, 4], [2, 5], null, [3, 5], [3, 6], [4, 6]]);
  });
  test('Player A should have the first move', () => {
    expect(sim.playerAMoves).toEqual([[1, 6], [1, 5], [5, 6]]);
  });

  test('No more turns game should be over.', () => {
    expect(sim.turn).toBe('gameOver');
  });
  test('Winner should be PlayerB.', () => {
    expect(sim.winner).toBe('playerB');
  });

});
