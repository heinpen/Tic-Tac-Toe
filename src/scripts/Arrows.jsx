function Arrows(props) {
  const { onClickArrows, rightArrowDisabled, leftArrowDisabled } = props;
  return (
    <div className="game__arrows">
      <button
        type="button"
        disabled={leftArrowDisabled}
        className="game__arrow"
        onClick={() => onClickArrows(false)}
      >
        {'<'}
      </button>
      <button
        type="button"
        disabled={rightArrowDisabled}
        className="game__arrow"
        onClick={() => onClickArrows(true)}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Arrows;
