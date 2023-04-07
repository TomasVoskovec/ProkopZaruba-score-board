import useFetch from './useFetch';
import { useEffect, useContext } from 'react';
import { AppContext } from './App';

interface Props {
  currentRound: number;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  now: Date;
}

interface Game {
  date: string;
  hteam: string;
  ateam: string;
  id: number;
  hscore: number;
  ascore: number;
}

const Matches = (props: Props) => {
  const { URL, setURL, setButtonSet, setMatchID } = useContext(AppContext);

  const { data: matches, refetch } = useFetch(URL, 'matches');

  useEffect(() => {
    refetch();
  }, [refetch, URL]);

  const decreaseRound = () => {
    if (props.currentRound > 1) {
      props.setCurrentRound(props.currentRound - 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.currentRound - 1
        }`
      );
    }
  };

  const increaseRound = () => {
    if (props.currentRound < 24) {
      props.setCurrentRound(props.currentRound + 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.currentRound + 1
        }`
      );
    }
  };

  const convertToLocalTime = (AUTime: string) => {
    const matchDate = new Date(AUTime);
    const timeZoneDiff = 14 - props.now.getTimezoneOffset() / 60;

    // calculate the local time in milliseconds by subtracting the offset from the API time
    const localTime = matchDate.getTime() + 60 * timeZoneDiff * 60 * 1000;

    // create a new Date object for the local time
    const localDate = new Date(localTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return localDate;
  };

  const handleClick = (matchID: string) => {
    setButtonSet('matchInfo');
    setMatchID(matchID);
  };

  return (
    <div className="games">
      <button onClick={decreaseRound}>previous round</button>
      <button onClick={increaseRound}>next round</button>
      {matches?.games.map((game: Game, i: number) => (
        <div key={i}>
          {convertToLocalTime(game.date).toString()} ---{' '}
          <button onClick={() => handleClick(`${game.id}`)}>
            {game.hteam} vs {game.ateam}
          </button>{' '}
          ----- {game.hscore} - {game.ascore}
        </div>
      ))}
    </div>
  );
};

export default Matches;
