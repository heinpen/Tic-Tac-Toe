function Square(props) {
  const { onClick, value, squareDisabled } = props;
  return (
    <button type="button" className={`game__square ${squareDisabled}`} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
