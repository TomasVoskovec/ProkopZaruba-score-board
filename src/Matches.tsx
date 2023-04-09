import useFetch from './useFetch';
import { useEffect, useContext } from 'react';
import { AppContext } from './App';

interface Props {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
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
  const { URL, setButtonSet, setMatchID } = useContext(AppContext);

  const { data: matches, refetch } = useFetch(URL, 'matches');

  useEffect(() => {
    refetch();
  }, [refetch, URL]);

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

  const stringDateToNumber = (stringDate: string) => {
    const date = new Date(stringDate);
    const dateInMilliseconds = date.getTime();
    return dateInMilliseconds;
  };

  const handleClick = (matchID: string) => {
    setButtonSet('matchInfo');
    setMatchID(matchID);
  };

  return (
    <div className="games">
      {matches?.games
        .slice()
        .sort(
          (a: Game, b: Game) =>
            stringDateToNumber(a.date) - stringDateToNumber(b.date)
        )
        .map((game: Game, i: number) => (
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
