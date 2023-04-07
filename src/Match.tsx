import useFetch from './useFetch';

const Match = () => {
  const { data: match } = useFetch(
    'https://api.squiggle.com.au/?q=games;year=2023;game=34261',
    'match'
  );
  return (
    <div>
      <div>{match?.games[0].date}</div>
      <div>{match?.games[0].venue} stadium</div>
      <div>
        {match?.games[0].hteam} vs {match?.games[0].ateam}
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
