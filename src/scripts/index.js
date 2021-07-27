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
      move: 0,
      winner: null,
    };
    this.x = 0;
    this.o = 0;
  }

  handleSquareClick(i) {
    const history = this.state.history,
      current = history[this.state.move].squares,
      squares = current.slice(),
      xIsNext = this.state.xIsNext;

    if (!squares[i] && !this.winner && !this.state.isTie) {
      squares[i] = xIsNext ? 'O' : 'X';
      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        xIsNext: !xIsNext,
        move: this.state.move + 1,
      });
    }
    if (!squares.includes(null)) {
      this.state.isTie = true;
    }
  }

  handleArrowsClick(dir) {
    let index = this.state.move + (dir ? 1 : -1);

    // set boundries according to history for index
    if (index > this.state.history.length - 1) {
      index = this.state.history.length - 1;
    } else if (index < 0) {
      index = 0;
    }

    this.setState({
      move: index,
    });
  }

  handleNewGameClick() {
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !xIsNext,
      move: this.state.move + 1,
    });
  }

  render() {
    const history = this.state.history,
      current = history[this.state.move].squares,
      xIsNext = this.state.xIsNext;

    let status, arrows;
    if (!this.winner) {
      this.winner = calculateWinner(current);
      if (this.winner) {
        status = 'The winner is: ' + this.winner;
        arrows = true;
        this.winner == 'O' ? (this.o += 1) : (this.x += 1);
      } else if (this.state.isTie) {
        status = 'The game ended in a tie';
        arrows = true;
      } else {
        status = (xIsNext ? 'O' : 'X') + ' - Turn';
      }
    } else {
      status = 'The winner is: ' + this.winner;
      arrows = true;
    }

    return (
      <div className="game">
        <Result x={this.x} o={this.o} />
        <div className="game__status">{status}</div>
        <div className="game__board">
          <Board handleSquareClick={(i) => this.handleSquareClick(i)} squares={current} />
        </div>
        {arrows && (
          <PostGameBtns
            onClickArrows={(dir) => this.handleArrowsClick(dir)}
            onClickNewGame={(dir) => this.handleNewGameClick(dir)}
          />
        )}
      </div>
    );
  }
}

function PostGameBtns(props) {
  return (
    <>
      <div className="game__arrows">
        <button className="game__arrow" onClick={() => props.onClickArrows(false)}>
          {'<'}
        </button>
        <button className="game__arrow" onClick={() => props.onClickArrows(true)}>
          {'>'}
        </button>
      </div>
      <button className="game__new-game-button" onClick={() => props.onClickArrows(true)}>
        New game
      </button>
    </>
  );
}

function Result(props) {
  return (
    <span className="game__result">
      Result: {props.x} - {props.o}
    </span>
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
