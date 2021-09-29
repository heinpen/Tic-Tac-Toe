function Result(props) {
  const { x, o } = props;
  return (
    <span className="game__result">
      Result: {x} - {o}
    </span>
  );
}

export default Result;
