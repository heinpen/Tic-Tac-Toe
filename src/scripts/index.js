'use strict';

function Square(props) {
  return (
    <button className="game__square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={(e) => this.props.handleSquareClick(i)} />;
  }

  render() {
    return (
      <>
        <div className="game__board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="game__board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="game__board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
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
      index: 0,
      winner: null,
    };
  }

  handleSquareClick(i) {
    const history = this.state.history,
      current = history[this.state.index].squares,
      squares = current.slice(),
      xIsNext = this.state.xIsNext;
    console.log(!this.state.winner);
    if (!squares[i] && !this.state.winner) {
      squares[i] = xIsNext ? 'O' : 'X';
      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        xIsNext: !xIsNext,
        index: this.state.index + 1,
      });
    }
  }

  handleArrowClick(dir) {
    let index = this.state.index + (dir ? 1 : -1);

    // set boundries according to history for index
    if (index > this.state.history.length - 1) {
      index = this.state.history.length - 1;
    } else if (index < 0) {
      index = 0;
    }

    this.setState({
      index: index,
    });
  }

  render() {
    const history = this.state.history,
      current = history[this.state.index].squares,
      xIsNext = this.state.xIsNext;
    let status, arrows;
    if (!this.state.winner) this.state.winner = calculateWinner(current);
    if (this.state.winner) {
      status = 'The winner is: ' + this.state.winner;
      arrows = true;
    } else {
      status = 'Next is: ' + (xIsNext ? 'O' : 'X');
    }

    return (
      <div className="game">
        <div className="game__status">{status}</div>
        <div className="game__board">
          <Board handleSquareClick={(i) => this.handleSquareClick(i)} squares={current} />
        </div>
        {arrows && <Arrows onClick={(dir) => this.handleArrowClick(dir)} />}
      </div>
    );
  }
}

function Arrows(props) {
  return (
    <div className="game__arrows">
      <button className="game__arrow" onClick={() => props.onClick(true)}>
        {'<'}
      </button>
      <button className="game__arrow" onClick={() => props.onClick(false)}>
        {'>'}
      </button>
    </div>
  );
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
