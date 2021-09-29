import React from 'react';
import PostGameButtons from './PostGameButtons.jsx';
import Result from './Result.jsx';
import Board from './Board.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: false,
      move: 0,
    };
    this.x = 0;
    this.o = 0;
  }

  handleSquareClick(i) {
    const { history, xIsNext, move } = this.state;
    const current = history[move].squares;
    const squares = current.slice();

    // Check if square is not already clicked.
    if (!squares[i] && !this.winner && !this.isTie) {
      squares[i] = xIsNext ? 'O' : 'X';
      this.setState({
        history: history.concat([
          {
            squares,
          },
        ]),
        xIsNext: !xIsNext,
        move: move + 1,
      });
    }

    // If all squares are filled - declare draw.
    if (!squares.includes(null)) {
      this.isTie = true;
    }
  }

  handleArrowsClick(dir) {
    const { move, history } = this.state;
    let index = move + (dir ? 1 : -1);

    // Set boundaries according to history for index.
    if (index > history.length - 1) {
      index = history.length - 1;
    } else if (index < 0) {
      index = 0;
    }

    this.setState({
      move: index,
    });
  }

  handleRestartClick() {
    this.winner = false;
    this.isTie = false;
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: false,
      move: 0,
    });
  }

  handleNewGameClick() {
    this.handleRestartClick();
    this.x = 0;
    this.o = 0;
  }

  checkStatus() {
    const { history, xIsNext, move } = this.state;
    const info = {
      current: history[move].squares,
    };
    if (!this.winner) {
      this.winner = calculateWinner(info.current);
      if (this.winner) {
        info.status = `The winner is: ${this.winner}`;
        info.activeButtons = true;
        this.winner === 'O' ? (this.o += 1) : (this.x += 1);
      } else if (this.isTie) {
        info.status = 'The game ended in a tie';
        info.activeButtons = true;
      } else {
        info.status = `${xIsNext ? 'O' : 'X'}  Turn`;
      }
    } else {
      info.status = `The winner is: ${this.winner}`;
      info.activeButtons = true;
    }

    return info;
  }

  render() {
    const { status, activeButtons, current } = this.checkStatus();

    return (
      <div className="game">
        <Result x={this.x} o={this.o} />
        <div className="game__status">{status}</div>
        <div className="game__board">
          <Board handleSquareClick={(i) => this.handleSquareClick(i)} squares={current} />
        </div>
        {activeButtons && (
          <PostGameButtons
            onClickArrows={(dir) => this.handleArrowsClick(dir)}
            onClickRestartBtn={() => this.handleRestartClick()}
            onClickNewGameBtn={() => this.handleNewGameClick()}
          />
        )}
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
