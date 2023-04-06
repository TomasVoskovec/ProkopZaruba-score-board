import useFetch from './useFetch';
import { useEffect, Dispatch, SetStateAction } from 'react';
interface Props {
  id: string;
  URL: string;
  setURL: Dispatch<SetStateAction<string>>;
  currentRound: number;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  now: Date;
}

interface Game {
  date: string;
  hteam: string;
  ateam: string;
  hscore: number;
  ascore: number;
}

const Matches = (props: Props) => {
  const { data: matches, refetch } = useFetch(props.URL, props.id);

  useEffect(() => {
    refetch();
  }, [refetch, props.URL]);

  const decreaseRound = () => {
    if (props.currentRound > 1) {
      props.setCurrentRound(props.currentRound - 1);
      props.setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.currentRound - 1
        }`
      );
    }
  };

  const increaseRound = () => {
    if (props.currentRound < 24) {
      props.setCurrentRound(props.currentRound + 1);
      props.setURL(
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

  return (
    <div className="games">
      <button onClick={decreaseRound}>previous round</button>
      <button onClick={increaseRound}>next round</button>
      {matches?.games.map((game: Game, i: number) => (
        <div key={i}>
          {convertToLocalTime(game.date).toString()} --- {game.hteam} vs{' '}
          {game.ateam} ----- {game.hscore} - {game.ascore}
        </div>
      ))}
    </div>
  );
};

export default Matches;
