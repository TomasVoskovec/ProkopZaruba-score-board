import useFetch from './useFetch';
import { useEffect, useContext, useState } from 'react';
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
  complete: number;
}

const Matches = (props: Props) => {
  const { URL, setButtonSet, setMatchID } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(-1);

  const { data: matches, refetch, isLoading } = useFetch(URL, 'matches');

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

  const handleMouseEnter = (matchNum: number) => {
    setIsHovered(matchNum);
    console.log('hey little dude');
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
    console.log('hey little dude');
  };

  return (
    <div>
      {matches && (
        <div className="games">
          {' '}
          {matches.games
            .slice()
            .sort(
              (a: Game, b: Game) =>
                stringDateToNumber(a.date) - stringDateToNumber(b.date)
            )
            .map((game: Game, i: number) => (
              <div
                key={i}
                className={isHovered === i ? 'game game-hovered' : 'game'}
                onMouseLeave={() => handleMouseLeave()}
                onMouseEnter={() => handleMouseEnter(i)}
                onClick={() => handleClick(`${game.id}`)}
              >
                <div className="time">
                  {convertToLocalTime(game.date).toString()}
                </div>
                <div className="matches-teams">
                  <div className="matches-team">
                    {' '}
                    <img
                      className="logo-table"
                      src={`./imgs/${game.hteam}.png`}
                      alt={game.hteam}
                    />
                    {game.hteam}
                  </div>
                  <div className="matches-team">
                    {' '}
                    <img
                      className="logo-table"
                      src={`./imgs/${game.ateam}.png`}
                      alt={game.ateam}
                    />
                    {game.ateam}
                  </div>
                </div>
                {game.complete < 100 && game.complete > 0 && (
                  <p className="matches-live">live</p>
                )}
                <div className="matches-score">
                  <div>{game.hscore}</div>
                  <div>{game.ascore}</div>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLoading && <p className="loading">loading...</p>}
    </div>
  );
};

export default Matches;
