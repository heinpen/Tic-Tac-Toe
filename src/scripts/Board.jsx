import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  renderSquare(i) {
    const { squares, handleSquareClick, squareDisabled } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => handleSquareClick(i)}
        squareDisabled={squareDisabled}
      />
    );
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

export default Board;
