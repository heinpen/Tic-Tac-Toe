import Arrows from './Arrows.jsx';

function PostGameButtons(props) {
  const { onClickArrows, onClickRestartBtn, onClickNewGameBtn } = props;
  return (
    <>
      <Arrows onClickArrows={onClickArrows} />
      <button type="button" className="game__post-game-button" onClick={() => onClickRestartBtn()}>
        Restart game
      </button>
      <button type="button" className="game__post-game-button" onClick={() => onClickNewGameBtn()}>
        New game
      </button>
    </>
  );
}

export default PostGameButtons;
