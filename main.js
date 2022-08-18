class board {
  constructor() {
    this.state = this.initBoard();
  }
  initBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
      let colum = [];
      for (let j = 0; j < 8; j++) {
        colum.push(0);
      }
      board.push(colum);
    }
    return board;
  }
  isValidPos(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 7 || x == undefined || y == undefined) {
      return false;
    }
    return true;
  }
  moveKnight(x = 3, y = 3) {
    if (this.isValidPos(x, y) != false) {
      let currentPos = this.knightCurrentPos();
      if (this.isValidPos(currentPos.x, currentPos.y) != false) {
        this.state[currentPos.x][currentPos.y] = 0;
      }
      this.state[x][y] = 1;
      return;
    }
  }
  knightCurrentPos() {
    let pos = { x: -1, y: -1 };
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (this.state[x][y] === 1) {
          pos.x = x;
          pos.y = y;
          break;
        }
      }
    }
    if (this.isValidPos(pos.x, pos.y) != false) {
      return pos;
    }
    return false;
  }
  moveTest(x, y) {
    let pos = { x: -1, y: -1 };
    if (
      ((Math.abs(x) == 2 && Math.abs(y) == 1) ||
        (Math.abs(x) == 1 && Math.abs(y) == 2)) &&
      this.knightCurrentPos() != false
    ) {
      pos.x = this.knightCurrentPos().x + x;
      pos.y = this.knightCurrentPos().y + y;
    }
    if (this.isValidPos(pos.x, pos.y)) {
      return pos;
    }
    return false;
  }
  nextPosibleMoves() {
    let moveIndex = [
      { x: 2, y: 1 },
      { x: -2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
    ];
    let nextMoves = [];
    for (let i = 0; i < 8; i++) {
      let move = this.moveTest(moveIndex[i].x, moveIndex[i].y);
      if (move) {
        nextMoves.push(move);
      }
    }
    return nextMoves;
  }

  recursivePathFinder(target, depth = 0, bestResult = Infinity) {
    let moves = this.nextPosibleMoves();
    let result = { moves: [], number: 0 };
    //console.log(moves, bestResult, target, result);
    if (
      target.x == this.knightCurrentPos().x &&
      target.y == this.knightCurrentPos().y
    ) {
      result.moves.push(target);
      result.number = depth;
      return result;
    }
    if (depth >= bestResult || depth > 16) {
      return false;
    }

    for (let i = 0; i < moves.length; i++) {
      let currentPos = this.knightCurrentPos();
      this.moveKnight(moves[i].x, moves[i].y);
      let curretMove = this.recursivePathFinder(target, depth + 1, bestResult);
      this.moveKnight(currentPos.x, currentPos.y);
      if (curretMove != false) {
        if (curretMove.number < bestResult && curretMove.number != 0) {
          bestResult = curretMove.number;
          result = curretMove;
          result.moves.unshift({ x: currentPos.x, y: currentPos.y });
        }
      }
    }
    return result;
  }

  findMinPath(x, y) {
    if (this.isValidPos(x, y)) {
      let target = { x: x, y: y };
      let result = this.recursivePathFinder(target);
      return result;
    }
  }
}

let test = new board();
test.moveKnight(3, 3);
console.log(test.findMinPath(4, 3));
