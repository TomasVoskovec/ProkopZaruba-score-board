import useFetch from './useFetch';
import { useState, useEffect } from 'react';
interface Props {
  id: string;
}

interface Game {
  date: string;
  hteam: string;
  ateam: string;
  hscore: number;
  ascore: number;
}

const Matches = (props: Props) => {
  const now: Date = new Date();
  const start: Date = new Date(now.getFullYear(), 0, 0);
  const diff: number = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  const [currentRound, setCurrentRound] = useState<number>(
    Math.floor((day - 66) / 7)
  );
  const [url, setUrl] = useState<string>(
    `https://api.squiggle.com.au/?q=games;year=2023;round=${currentRound}`
  );
  const { data: matches, refetch } = useFetch(url, props.id);

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  const decreaseRound = () => {
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
      setUrl(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          currentRound - 1
        }`
      );
    }
  };

  const increaseRound = () => {
    if (currentRound < 24) {
      setCurrentRound(currentRound + 1);
      setUrl(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          currentRound + 1
        }`
      );
    }
  };

  const convertToLocalTime = (AUTime: string) => {
    const matchDate = new Date(AUTime);
    const timeZoneDiff = 14 - now.getTimezoneOffset() / 60;

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
