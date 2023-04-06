import { Dispatch, SetStateAction } from 'react';
import useFetch from './useFetch';
interface Props {
  id: string;
  URL: string;
  setURL: Dispatch<SetStateAction<string>>;
}

interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
  id: number;
}

const Table = (props: Props) => {
  const { data: teams } = useFetch(
    'https://api.squiggle.com.au/?q=standings',
    props.id
  );

  const showMatches = (id: number) => {
    props.setURL(`https://api.squiggle.com.au/?q=games;year=2023;team=${id}`);
  };

  const handlClick = () => {
    console.log(props.URL);
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
          cl
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
