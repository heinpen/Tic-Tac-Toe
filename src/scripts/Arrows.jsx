function Arrows(props) {
  const { onClickArrows } = props;
  return (
    <div className="game__arrows">
      <button type="button" className="game__arrow" onClick={() => onClickArrows(false)}>
        {'<'}
      </button>
      <button type="button" className="game__arrow" onClick={() => onClickArrows(true)}>
        {'>'}
      </button>
    </div>
  );
}

export default Arrows;
