import { useContext } from 'react';
import { AppContext } from './App';

interface Props {
  round: number;
  currentRound: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  now: Date;
}

const MatchNav = (props: Props) => {
  const { buttonsSet, setURL, setButtonSet } = useContext(AppContext);

  const decreaseRound = () => {
    if (props.round > 1) {
      props.setRound(props.round - 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.round - 1
        }`
      );
    }
  };

  const increaseRound = () => {
    if (props.round < 24) {
      props.setRound(props.round + 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.round + 1
        }`
      );
    }
  };

  const backToCurrentRount = () => {
    props.setRound(props.currentRound);
    setURL(
      `https://api.squiggle.com.au/?q=games;year=2023;round=${props.currentRound}`
    );
    setButtonSet('rounds');
  };
  return (
    <>
      {buttonsSet === 'rounds' && (
        <div>
          <button onClick={decreaseRound}>previous round</button>
          <button onClick={increaseRound}>next round</button>
        </div>
      )}
      {(buttonsSet === 'teamMatches' || buttonsSet === 'matchInfo') && (
        <div>
          <button onClick={backToCurrentRount}>back to current round</button>
        </div>
      )}
    </>
  );
};

export default MatchNav;
