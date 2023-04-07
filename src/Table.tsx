import { Dispatch, SetStateAction, useContext } from 'react';
import useFetch from './useFetch';
import { AppContext } from './App';

interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
  id: number;
}

const Table = () => {
  const { URL, setURL } = useContext(AppContext);

  const { data: teams } = useFetch(
    'https://api.squiggle.com.au/?q=standings',
    'table'
  );

  const showMatches = (id: number) => {
    setURL(`https://api.squiggle.com.au/?q=games;year=2023;team=${id}`);
  };

  const handlClick = () => {
    console.log(URL);
  };
  return (
    <div className="standings">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams?.standings.map((team: Team, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <button onClick={() => showMatches(team.id)}>
                <td>
                  <img
                    className="logo"
                    src={`./imgs/${team.name}.png`}
                    alt={team.name}
                  />
                </td>
                <td>{team.name}</td>
              </button>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlClick}>tady jsem</button>
    </div>
  );
};

export default Table;
