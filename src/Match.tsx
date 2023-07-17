import useFetch from './useFetch';
import { useContext } from 'react';
import { AppContext } from './App';

const Match = () => {
  const { matchID } = useContext(AppContext);

  const { data: match, isLoading } = useFetch(
    `https://api.squiggle.com.au/?q=games;year=2023;game=${matchID}`,
    'match'
  );

  const { setURL, setButtonSet } = useContext(AppContext);

  const showMatches = (id: number) => {
    setURL(`https://api.squiggle.com.au/?q=games;year=2023;team=${id}`);
    setButtonSet('teamMatches');
  };

  return (
    <div>
      {match &&
        (match.games[0].complete !== 0 ? (
          <div className="match">
            <div>
              {' '}
              <p className="match-team">{match.games[0].hteam}</p>
              <img
                className="logo-match"
                onClick={() => showMatches(match.games[0].hteamid)}
                src={`./imgs/${match.games[0].hteam}.png`}
                alt={match.games[0].hteam}
              />
              <p>{match.games[0].hgoals}</p>
              <p>{match.games[0].hbehinds}</p>
            </div>
            <div>
              {match.games[0].complete === 100 ? (
                <p className="match-date">
                  {match.games[0].date.split(' ')[0]}
                </p>
              ) : (
                <p className=" live">live</p>
              )}
              <p className="match-score">
                {match.games[0].hscore} : {match.games[0].ascore}
              </p>
              <p className="match-stadium">Stadium: {match.games[0].venue}</p>
              <p>goals</p>
              <p>behinds</p>
            </div>
            <div>
              {' '}
              <p className="match-team">{match.games[0].ateam}</p>
              <img
                className="logo-match"
                onClick={() => showMatches(match.games[0].ateamid)}
                src={`./imgs/${match.games[0].ateam}.png`}
                alt={match.games[0].ateam}
              />
              <p>{match.games[0].agoals}</p>
              <p>{match.games[0].abehinds}</p>
            </div>
          </div>
        ) : (
          <div className="match">
            <div>
              {' '}
              <p className="match-team">{match.games[0].hteam}</p>
              <img
                className="logo-match"
                onClick={() => showMatches(match.games[0].hteamid)}
                src={`./imgs/${match.games[0].hteam}.png`}
                alt={match.games[0].hteam}
              />
            </div>
            <div>
              <p className="match-date">{match.games[0].date.split(' ')[0]}</p>
              <p className="match-time">{match.games[0].date.split(' ')[1]}</p>
              <p className="match-stadium">Stadium: {match.games[0].venue}</p>
            </div>
            <div>
              {' '}
              <p className="match-team">{match.games[0].ateam}</p>
              <img
                className="logo-match"
                onClick={() => showMatches(match.games[0].ateamid)}
                src={`./imgs/${match.games[0].ateam}.png`}
                alt={match.games[0].ateam}
              />
            </div>
          </div>
        ))}
      {isLoading && <p className="loading">loading...</p>}
    </div>
  );
};

export default Match;
