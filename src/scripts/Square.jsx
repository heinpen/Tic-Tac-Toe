function Square(props) {
  const { onClick } = props;
  const { value } = props;
  return (
    <button type="button" className="game__square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
