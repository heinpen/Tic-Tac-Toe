'use strict';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.handleClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

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
    };
  }

  handleClick(i) {
    const history = this.state.history,
      current = history[history.length - 1],
      squares = current.squares.slice(),
      xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? 'O' : 'X';

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !xIsNext,
    });
  }

  render() {
    const history = this.state.history,
      current = history[history.length - 1],
      winner = calculateWinner(current),
      xIsNext = this.state.xIsNext;
    let status;
    if (winner) {
      status = 'The winner is: ' + winner;
    } else {
      status = 'Next is: ' + (xIsNext ? 'O' : 'X');
    }
    return (
      <div className="game">
        <div className="status">{status}</div>
        <div className="game-board">
          <Board handleClick={(i) => this.handleClick(i)} squares={current.squares} />
        </div>
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

ReactDOM.render(<Game />, document.getElementById('container'));
