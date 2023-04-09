import useFetch from './useFetch';
import { useContext } from 'react';
import { AppContext } from './App';

const Match = () => {
  const { matchID } = useContext(AppContext);

  const { data: match } = useFetch(
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
      <div>{match?.games[0].date}</div>
      <div>{match?.games[0].venue} stadium</div>
      <div>
        <button onClick={() => showMatches(match?.games[0].hteamid)}>
          {match?.games[0].hteam}
        </button>{' '}
        vs{' '}
        <button onClick={() => showMatches(match?.games[0].ateamid)}>
          {match?.games[0].ateam}
        </button>
      </div>
      <div>
        score {match?.games[0].hscore} : {match?.games[0].ascore}
      </div>
      <div>
        goals {match?.games[0].hgoals} : {match?.games[0].agoals}
      </div>
      <div>
        behinds {match?.games[0].hbehinds} : {match?.games[0].abehinds}
      </div>
    </div>
  );
};

export default Match;
